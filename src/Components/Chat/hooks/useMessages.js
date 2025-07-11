import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../../../context/authContext/authContext';
import snappyApiService from '../../../service/snappyApiService/snappyApiService';
import notificationService from '../../../service/notificationService';
import { connectSocket, disconnectSocket, getSocket } from '../../../service/snappyApiService/socketService'

export const useMessages = (interlocutorSnappyId) => {
  const { snappyUser, isSnappyAuthenticated, user: yowyobUser } = useAuth(); // Pour currentSnappyUserId
  const scrollViewRef = useRef();

  const [messages, setMessages] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [messageText, setMessageText] = useState(''); // Renommé de 'message' pour clarté

  
  const mapApiMessageToUiMessage = useCallback((msgFromApi, currentYowyobUserIdForCheck) => {
    if (!msgFromApi) return null;

    const isUserMessage = msgFromApi.sender?.externalId === currentYowyobUserIdForCheck;
    
    let imageUri = null;
    let audioData = null; // { path: string, duration: string }

    if (msgFromApi.medias && msgFromApi.medias.length > 0) {
      const imageMedia = msgFromApi.medias.find(m => m.mimetype && m.mimetype.startsWith('image/'));
      if (imageMedia) {
        // TODO: Gérer si imageMedia.data est du base64 vs URL
        imageUri = imageMedia.data; 
      }
      const audioMedia = msgFromApi.medias.find(m => m.mimetype && m.mimetype.startsWith('audio/'));
      if (audioMedia) {
        audioData = { path: audioMedia.data, duration: "0:00" /* Placeholder */ };
      }
    }

    return {
      id: msgFromApi.id,
      text: msgFromApi.body,
      time: new Date(msgFromApi.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      isUser: isUserMessage,
      senderExternalId: msgFromApi.sender?.externalId,
      image: imageUri ? { uri: imageUri } : null,
      audio: audioData,
      ack: msgFromApi.ack,
      // Garder le message original de l'API pour référence si besoin
      // _rawApiMessage: msgFromApi 
    };
  }, []);
  
  // Charger l'historique des messages
  const loadMessageHistory = useCallback(async () => {
    if (!isSnappyAuthenticated || !snappyUser?.id || !interlocutorSnappyId || !yowyobUser?.id) {
      console.warn("useMessages: Cannot load history - auth/IDs missing (Snappy User, Interlocutor, or Yowyob User).");
      setMessages([]);
      return;
    }
    setIsLoadingHistory(true);
    try {
      // On passe l'ID Snappy de l'utilisateur actuel ET son ID Yowyob
      const historyFromApi = await snappyApiService.getChatDetails(snappyUser.id, interlocutorSnappyId, yowyobUser.id);
      
      // La fonction getChatDetails dans snappyApiService fait déjà le mapping et le tri.
      // Si elle retourne un tableau de messages UI directement :
      setMessages(historyFromApi || []);
      scrollToBottom(false);
    } catch (error) {
      setMessages([]);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [isSnappyAuthenticated, snappyUser, interlocutorSnappyId, yowyobUser, mapApiMessageToUiMessage]); // mapApiMessageToUiMessage ajouté aux deps

  useEffect(() => {
    if (!yowyobUser?.id || !snappyUser?.projectId) return;

    const socket = connectSocket(snappyUser.projectId, yowyobUser.id);

    // Écouter les nouveaux messages entrants
    socket.on('message-send', (newMessageFromSocket) => {
      console.log('New message received via WebSocket:', newMessageFromSocket);
      // Ajouter le message à la liste uniquement s'il concerne la conversation actuelle
      if (newMessageFromSocket.sender === interlocutorSnappyId || newMessageFromSocket.sender === snappyUser.id) {
        addMessageToList(newMessageFromSocket, yowyobUser.id);
      }
    });
    
    // ... (Écouter 'message-ack-received', 'message-ack-read', etc. pour mettre à jour le statut des messages)

    // Nettoyage au démontage du composant
    return () => {
      console.log('ChatScreen unmounting. Cleaning up socket listeners.');
      socket.off('message-send');
      // Important: ne pas déconnecter le socket ici si on veut qu'il reste actif
      // pour des notifications globales. La déconnexion se ferait au logout.
      // disconnectSocket(); 
    };
  }, [yowyobUser, snappyUser, interlocutorSnappyId, addMessageToList]);
  
  useEffect(() => {
    loadMessageHistory();
  }, [loadMessageHistory]);

  const scrollToBottom = (animated = true) => {
    setTimeout(() => { scrollViewRef.current?.scrollToEnd({ animated }); }, 100);
  };

  // Modifié pour prendre le message de l'API et l'ID Yowyob pour la vérification isUser
  const addMessageToList = useCallback((newMessageFromApi, currentYowyobUserIdForCheck, isOptimistic = false) => {
    const uiMessage = mapApiMessageToUiMessage(newMessageFromApi, currentYowyobUserIdForCheck);
    if (!uiMessage) return;

    const finalMessage = {
        ...uiMessage,
        status: isOptimistic ? 'sending' : (newMessageFromApi.ack || 'sent'),
        tempId: isOptimistic ? newMessageFromApi.tempId : undefined, // Garder tempId si optimiste
    };
    
    setMessages(prevMessages => {
      if (!isOptimistic && newMessageFromApi.tempId && prevMessages.some(m => m.tempId === newMessageFromApi.tempId)) {
        return prevMessages.map(m => (m.tempId === newMessageFromApi.tempId ? finalMessage : m));
      }
      // Éviter les doublons si le message arrive via WebSocket et qu'on l'a déjà ajouté optimisticement
      if (prevMessages.find(m => m.id === finalMessage.id)) {
          return prevMessages.map(m => m.id === finalMessage.id ? finalMessage : m); // Mettre à jour si ack change
      }
      return [...prevMessages, finalMessage];
    });
    scrollToBottom();
  }, [mapApiMessageToUiMessage, scrollToBottom]);


  const sendTextMessage = async () => {
    if (messageText.trim() === '' || !snappyUser?.id || !interlocutorSnappyId || !yowyobUser?.id) {
      return;
    }

    const tempMsgId = Date.now();
    const optimisticMessageForApiShape = { // Simule la forme API pour mapApiMessageToUiMessage
      id: tempMsgId.toString(), // ID temporaire
      tempId: tempMsgId, // Pour retrouver et remplacer plus tard
      body: messageText,
      createdAt: new Date().toISOString(),
      sender: { externalId: yowyobUser.id }, // L'utilisateur actuel est l'expéditeur
      ack: 'sending',
      medias: [],
    };
    
    addMessageToList(optimisticMessageForApiShape, yowyobUser.id, true); // Ajout optimiste

    const currentText = messageText;
    setMessageText('');

    try {
      const sentMessageFromApi = await snappyApiService.sendMessage({
        senderId: snappyUser.id, // ID Snappy de l'utilisateur actuel
        receiverId: interlocutorSnappyId, // ID Snappy de l'interlocuteur
        body: currentText,
      });
      // Mettre à jour le message optimiste avec la vraie réponse de l'API
      addMessageToList({ ...sentMessageFromApi, tempId: tempMsgId }, yowyobUser.id, false);
    } catch (error) {
      setMessages(prev => prev.map(m => 
        m.tempId === tempMsgId ? { ...mapApiMessageToUiMessage(optimisticMessageForApiShape, yowyobUser.id), status: 'failed' } : m
      ));
      setMessageText(currentText);
      // notificationService.showError("Failed to send. Tap to retry?"); // Déjà géré par snappyApiService
    }
  };

  // TODO: addImageMessage et addAudioMessage suivront un schéma similaire:
  // 1. Affichage optimiste (ex: image locale avec indicateur de chargement)
  // 2. Upload du média vers un service de stockage pour obtenir une URL/ID.
  // 3. Appel à snappyApiService.sendMessage avec l'URL/ID dans `attachements`.
  // 4. Mise à jour du message optimiste avec la réponse du serveur.

  const addImageMessage = (imageSource) => {
    // Placeholder - À implémenter avec l'upload
    console.log("addImageMessage - Image source:", imageSource, "Upload et envoi API à implémenter.");
    notificationService.showInfo("Sending images coming soon!");
    // Optimistic UI, then upload, then send API message with attachment URL/ID
  };

  const addAudioMessage = (audioUrl, duration) => {
    // Placeholder - À implémenter avec l'upload
    console.log("addAudioMessage - Audio URL:", audioUrl, "Duration:", duration, "Upload et envoi API à implémenter.");
    notificationService.showInfo("Sending audio messages coming soon!");
  };


  // Écoute des messages WebSocket (à implémenter dans une phase ultérieure)
  // useEffect(() => {
  //   // Configurer la connexion WebSocket ici
  //   // Écouter 'message-send' et appeler addMessageToList(receivedMessage)
  //   // N'oublie pas de te déconnecter au démontage du composant.
  //   return () => { /* cleanup WebSocket */ };
  // }, [snappyUser, interlocutorSnappyId, addMessageToList]);

  return {
    messageText,
    setMessageText,
    messages,
    isLoadingHistory,
    sendTextMessage,
    addImageMessage, // À implémenter complètement
    addAudioMessage,   // À implémenter complètement
    scrollViewRef,
    loadMessageHistory, // Exposer pour un rafraîchissement manuel si besoin
  };
};