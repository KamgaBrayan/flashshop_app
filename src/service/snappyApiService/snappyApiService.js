import snappyAxiosInstance from '../../utils/snappyAxiosConfig';
import secureStorage from '../authService/secureStorage';
import notificationService from '../notificationService';

// Remplace par ton vrai projectId ou configure-le dynamiquement
const DEFAULT_PROJECT_ID = "81997082-7e88-464a-9af1-b790fdd454f8"; // Exemple tiré de ta doc

/**
 * Crée un utilisateur dans Snappy Service.
 * Doit être appelé après l'inscription Yowyob.
 * @param {Object} userData - Données de l'utilisateur.
 * @param {string} userData.yowyobUserId - L'ID de l'utilisateur provenant de Yowyob (sera externalId).
 * @param {string} userData.displayName - Nom d'affichage (ex: "Prénom Nom").
 * @param {string} userData.login - Identifiant de connexion pour Snappy (ex: username Yowyob ou email).
 * @param {string} userData.secret - Mot de passe (le même que pour Yowyob).
 * @param {string} [userData.email] - Email de l'utilisateur.
 * @param {string} [userData.phoneNumber] - Numéro de téléphone.
 * @param {string} [userData.avatarUrl] - URL de l'avatar.
 * @param {string} [projectId=DEFAULT_PROJECT_ID] - L'ID du projet.
 * @returns {Promise<Object>} Les données de l'utilisateur créé dans Snappy.
 */
const createUserInSnappy = async ({
  yowyobUserId,
  displayName,
  login,
  secret,
  email,
  phoneNumber,
  avatarUrl,
  projectId = DEFAULT_PROJECT_ID,
}) => {
  // POST /users/create
  // Nécessite un Token JWT valide dans les headers (Authorization: Bearer <token>)
  // LA QUESTION EST : QUEL TOKEN ? Token d'admin ? Ou peut-on appeler ça juste après /auth/user de Snappy ?
  // Pour l'instant, on suppose que l'intercepteur Axios injectera le token Snappy s'il existe.
  // Si c'est un token admin, il faudrait une méthode pour le récupérer et l'injecter spécifiquement ici.
  try {
    console.log(`Creating Snappy user for Yowyob ID: ${yowyobUserId}`);
    const payload = {
      projectId,
      externalId: yowyobUserId,
      displayName,
      login,
      secret,
      email: email || undefined, // N'envoie pas si vide
      phoneNumber: phoneNumber || undefined,
      avatar: avatarUrl || undefined,
      // customJson: {}, // Si tu as besoin de stocker des données supplémentaires
    };
    const response = await snappyAxiosInstance.post('/users/create', payload);
    // La réponse est un objet User de Snappy, qui contient son propre 'id' interne.
    console.log('Snappy user created:', response.data);
    return response.data; // Devrait être l'objet utilisateur Snappy créé
  } catch (error) {
    console.error('Error creating Snappy user:', error.response?.data || error.message);
    notificationService.showError('An error occured when creating Snappy user')
    // Gérer spécifiquement les erreurs (ex: utilisateur existe déjà avec cet externalId ou login)
    if (error.response?.data?.message?.includes('already exists')) { // Supposition de message d'erreur
        // Peut-être que l'utilisateur existe déjà, essayer de le récupérer/mettre à jour ?
        // Ou juste considérer que c'est ok si on veut juste s'assurer qu'il existe.
        console.warn('Snappy user might already exist.');
        notificationService.showInfo('Snappy user might already exist.')
    }
    throw error;
  }
};

/**
 * Authentifie un utilisateur auprès de Snappy Service et stocke le token JWT et l'ID Snappy.
 * Doit être appelé après la connexion Yowyob.
 * @param {string} login - Le login de l'utilisateur pour Snappy (ex: username Yowyob).
 * @param {string} secret - Le mot de passe de l'utilisateur (le même que pour Yowyob).
 * @param {string} [projectId=DEFAULT_PROJECT_ID] - L'ID du projet.
 * @returns {Promise<Object>} Les données utilisateur de Snappy (incluant l'ID Snappy).
 */

const authenticateAndStoreSnappyData = async (login, secret, projectId = DEFAULT_PROJECT_ID) => {
  // POST /auth/user
  try {
    console.log(`Authenticating Snappy user: ${login}`);
    const response = await snappyAxiosInstance.post('/auth/user', {
      projectId,
      login,
      secret,
    });
    
    if (response.data && response.data.token && response.data.data && response.data.data.id) {
      const snappyToken = response.data.token;
      const snappyUserData = response.data.data;
      
      await secureStorage.saveSnappyToken(snappyToken);
      await secureStorage.saveSnappyUserId(snappyUserData.id); // Stocker l'ID interne de Snappy
      
      console.log('Snappy authentication successful. Token and Snappy User ID stored.');
      notificationService.showSuccess('Snappy authentication successful')
      return snappyUserData; // Retourne les données de l'utilisateur Snappy
    } else {
      notificationService.showError('Snappy authentication failed: Invalid response structure.')
    }
  } catch (error) {
    console.error('Error authenticating Snappy user and storing data:', error.response?.data || error.message);
    notificationService.showError('Error authenticating Snappy user and storing data')
    // Effacer les tokens potentiels en cas d'échec pour éviter un état incohérent
    await secureStorage.removeSnappyToken();
    await secureStorage.removeSnappyUserId();
    throw error;
  }
};


// ... (les fonctions getConversations, sendMessage, getChatDetails viendront plus tard)

/**
 * Récupère la liste des contacts/utilisateurs avec qui on peut chatter.
 * L'API Snappy (GET /chat/{userId}/chats) retourne une liste d'objets User.
 * Nous devons la transformer pour qu'elle ressemble à la structure `dummyConversations`.
 * @param {string} currentSnappyUserId - L'ID Snappy de l'utilisateur actuellement connecté.
 * @param {string} [projectId=DEFAULT_PROJECT_ID] - L'ID du projet.
 * @returns {Promise<Array>} Un tableau de conversations formatées.
 */

const getConversations = async (currentSnappyUserId, projectId = DEFAULT_PROJECT_ID) => {
 try {
   console.log(`SnappyApiService: Fetching conversations for Snappy User ID: ${currentSnappyUserId}, Project: ${projectId}`);
   const response = await snappyAxiosInstance.get(`/chat/${currentSnappyUserId}/chats`, {
     params: { projectId }
   });

   // La documentation Swagger (page 4) montre que la réponse de /chat/{userId}/chats
   // est un tableau d'objets, où chaque objet a une clé "user" : [ { "user": { ...user_details... } }, ... ]
   // Les détails de l'utilisateur Snappy incluent id, displayName, avatar, externalId, etc.
   
   if (response.data && Array.isArray(response.data)) {
     return response.data.map(convObject => {
       const interlocutor = convObject.user; // L'objet utilisateur de l'interlocuteur
       if (!interlocutor) {
         console.warn("SnappyApiService: Conversation object missing user details", convObject);
         return null; // Ou un objet par défaut pour éviter les erreurs
       }
       
       // TODO: Obtenir lastMessage, time, unread. Ces infos ne viennent PAS de cet endpoint.
       // Elles viendront probablement via WebSocket ou un autre appel API pour les métadonnées de chat.
       // Pour l'instant, on met des placeholders.
       return {
         id: interlocutor.id, // ID Snappy de l'interlocuteur
         externalId: interlocutor.externalId, // Potentiellement l'ID Yowyob de l'interlocuteur
         name: interlocutor.displayName || 'Unknown User',
         avatar: interlocutor.avatar ? { uri: interlocutor.avatar } : require('../../../assets/utilities/avatar.png'), // Ajuste le chemin de l'avatar par défaut
         online: interlocutor.online || false, // Supposition, le champ 'online' est dans la réponse /auth/user
         lastMessage: 'Tap to chat', // Placeholder
         time: '', // Placeholder
         unread: 0, // Placeholder
       };
     }).filter(conv => conv !== null); // Filtrer les entrées potentiellement nulles
   } else {
     console.warn("SnappyApiService: getConversations received an unexpected response format:", response.data);
     return []; // Retourner un tableau vide en cas de format inattendu
   }
 } catch (error) {
   console.error('SnappyApiService: Error fetching conversations:', error.response?.data || error.message);
   notificationService.showError('Could not load conversations.'); // Notification
   throw error; // Propager pour que le composant puisse gérer l'état d'erreur
 }
};

/**
 * Récupère les détails d'un chat / l'historique des messages.
 * @param {string} currentSnappyUserId - ID Snappy de l'utilisateur actuel.
 * @param {string} interlocutorSnappyId - ID Snappy de l'autre participant.
 * @param {string} [projectId=DEFAULT_PROJECT_ID] - L'ID du projet.
 * @returns {Promise<Array>} Tableau de messages formatés.
 */
const getChatDetails = async (currentSnappyUserId, interlocutorSnappyId, currentYowyobUserId, projectId = DEFAULT_PROJECT_ID) => {
    try {
      console.log(`SnappyApiService: Fetching chat details between SnappyUser ${currentSnappyUserId} and InterlocutorSnappy ${interlocutorSnappyId}`);
      const response = await snappyAxiosInstance.post('/chat/details', {
        user: currentSnappyUserId, // ID Snappy de l'utilisateur demandant les détails
        interlocutor: interlocutorSnappyId, // ID Snappy de l'autre participant
        projectId,
      });
  
      // La réponse contient response.data.messages qui est un tableau
      if (response.data && Array.isArray(response.data.messages)) {
        return response.data.messages.map(msg => {
          // Déterminer si le message est de l'utilisateur actuel en comparant
          // msg.sender.externalId avec l'ID Yowyob de l'utilisateur actuel.
          const isUserMessage = msg.sender?.externalId === currentYowyobUserId;
  
          // Gérer les médias (simplifié pour l'instant, on prendra le premier média image ou audio)
          let imageUri = null;
          let audioData = null; // Pourrait être { path: string, duration: string }
  
          if (msg.medias && msg.medias.length > 0) {
            const imageMedia = msg.medias.find(m => m.mimetype && m.mimetype.startsWith('image/'));
            if (imageMedia) {
              // Si `imageMedia.data` est une URL, c'est direct.
              // Si `imageMedia.data` est du base64, il faudra le préfixer : `data:${imageMedia.mimetype};base64,${imageMedia.data}`
              // Supposons pour l'instant que `imageMedia.data` est une URL ou un chemin utilisable.
              imageUri = imageMedia.data; // A AJUSTER SI BASE64
            }
            // Idem pour l'audio
            const audioMedia = msg.medias.find(m => m.mimetype && m.mimetype.startsWith('audio/'));
            if (audioMedia) {
              audioData = { 
                  path: audioMedia.data, // A AJUSTER SI BASE64
                  duration: "0:00" // La durée n'est pas dans l'objet media de l'API, à voir où la stocker/calculer
              };
            }
          }
  
          return {
            id: msg.id,
            text: msg.body,
            time: new Date(msg.createdAt).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true
            }),
            isUser: isUserMessage,
            senderExternalId: msg.sender?.externalId, // On garde l'externalId pour référence
            receiverExternalId: msg.receiver?.externalId,
            image: imageUri ? { uri: imageUri } : null, // Format attendu par Image component
            audio: audioData, // { path, duration }
            // duration: audioData ? audioData.duration : undefined, // Champ séparé si besoin
            ack: msg.ack, // "SENT", "DELIVERED", "READ"
            // medias: msg.medias, // On peut garder tout le tableau si on veut traiter tous les médias
          };
        }).sort((a, b) => new Date(a.time || a.createdAt) - new Date(b.time || b.createdAt)); // createdAt n'est pas directement sur l'objet mappé, donc utiliser la date de msg
      } else {
        console.warn("SnappyApiService: getChatDetails received an unexpected response format or no messages array:", response.data);
        return [];
      }
    } catch (error) {
      console.error('SnappyApiService: Error fetching chat details:', error.response?.data || error.message);
      notificationService.showError('Could not load chat history.');
      throw error;
    }
  };
  
  /**
   * Envoie un message texte.
   * @param {Object} data
   * @param {string} data.senderId - ID Snappy de l'expéditeur (utilisateur actuel)
   * @param {string} data.receiverId - ID Snappy du destinataire (interlocuteur)
   * @param {string} data.body - Contenu texte du message
   * @param {Array<string>} [data.attachements] - Tableau d'IDs/URLs de pièces jointes
   * @param {string} [data.projectId=DEFAULT_PROJECT_ID] - L'ID du projet
   * @returns {Promise<Object>} Le message envoyé par l'API
   */
  const sendMessage = async ({ senderId, receiverId, body, projectId = DEFAULT_PROJECT_ID /*, attachements = []*/ }) => {
    // POST /chat/send
    // Request Body: { "body": "<string>", "projectId": "<string>", "receiverId": "<string>", "senderId": "<string>" }
    // `senderId` et `receiverId` ici sont les IDs SNAPPY INTERNES.
    // `attachements` n'est pas dans le corps de la requête pour l'envoi de message texte.
    // L'upload de média et leur liaison à un message se feront probablement via un autre flux ou un champ 'mediasIds' ici.
    // Pour l'instant, on se concentre sur le texte.
    try {
      console.log(`SnappyApiService: Sending message from SnappyID ${senderId} to SnappyID ${receiverId}`);
      const payload = {
        senderId,     // ID Snappy de l'expéditeur
        receiverId,   // ID Snappy du destinataire
        body,
        projectId,
        // medias: [] // Si l'API permet d'envoyer des IDs de médias pré-uploadés ici.
                     // La doc Swagger précédente montrait 'attachements' en query param,
                     // mais le cURL de la nouvelle doc ne le montre pas pour la requête /chat/send de base.
                     // Le champ `medias` est dans la RÉPONSE, pas dans la requête d'envoi de texte simple.
      };
      const response = await snappyAxiosInstance.post('/chat/send', payload);
      // La réponse est l'objet message créé, contenant sender.externalId et receiver.externalId
      return response.data;
    } catch (error) {
      console.error('SnappyApiService: Error sending message:', error.response?.data || error.message);
      notificationService.showError('Failed to send message.');
      throw error;
    }
  };


  /**
 * Récupère tous les utilisateurs enregistrés dans un projet.
 * Utile pour démarrer une nouvelle conversation.
 * @param {string} [projectId=DEFAULT_PROJECT_ID] - L'ID du projet.
 * @returns {Promise<Array>} Un tableau d'objets utilisateur Snappy.
 */
const findAllUsersInProject = async (projectId = DEFAULT_PROJECT_ID) => {
  // GET /users/find-all?projectId=<string> (Doc page 15)
  try {
    console.log(`SnappyApiService: Finding all users for project ${projectId}`);
    const response = await snappyAxiosInstance.get('/users/find-all', {
      params: { projectId }
    });
    return response.data || [];
  } catch (error) {
    console.error('SnappyApiService: Error finding all users:', error.response?.data || error.message);
    notificationService.showError('Could not fetch the users list.');
    throw error;
  }
};

const snappyApiService = {
  createUserInSnappy,
  authenticateAndStoreSnappyData,
  findAllUsersInProject,
  getConversations,
  getChatDetails,
  sendMessage,
  // ... (futures fonctions)
};

export default snappyApiService;