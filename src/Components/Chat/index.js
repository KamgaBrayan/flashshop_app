import React, { useEffect } from 'react'; // Ajout de useEffect
import { SafeAreaView, ScrollView, View, Text, StatusBar, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Ajout de useRoute
import { styles } from './style';

import Header from './components/Header'; // Tes composants existants
import MessageItem from './components/MessageItem';
import InputArea from './components/InputArea';
import AudioRecorder from './components/AudioRecorder';

import { useMessages } from './hooks/useMessages';
import { useAudioRecording } from './hooks/useAudioRecording';
import { useAuth } from '../../context/authContext/authContext'; // Pour currentSnappyUserId

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { snappyUser, user: yowyobUser } = useAuth(); // `user` est yowyobUser
  const { interlocutorId, interlocutorName, interlocutorAvatar /*, currentSnappyUserId */ } = route.params;
  // currentSnappyUserId vient maintenant de snappyUser.id
  // currentYowyobUserId vient de yowyobUser.id

  const {
    messageText,
    setMessageText,
    messages,
    isLoadingHistory,
    sendTextMessage,
    addImageMessage, // Sera utilisé plus tard
    addAudioMessage,   // Sera utilisé plus tard
    scrollViewRef,
    loadMessageHistory, // Pour un éventuel pull-to-refresh de l'historique
  } = useMessages(interlocutorId); // Passer l'ID de l'interlocuteur au hook

  const {
    isRecording,
    recordingTime,
    startRecording,
    stopRecording
  } = useAudioRecording((audioPath, duration) => { // audioPath est le chemin local du fichier
    // Ici, il faudra uploader audioPath, puis appeler addAudioMessage avec l'URL du serveur
    console.log("ChatScreen: Audio recording complete - Path:", audioPath, "Duration:", duration);
    addAudioMessage(audioPath, duration); // Pour l'instant, passe le chemin local
  });

  useEffect(() => {
    // Vérifier si l'utilisateur Snappy est bien là, sinon, rediriger ou afficher une erreur
    if (!snappyUser || !snappyUser.id || !currentSnappyUserId) {
      notificationService.showError("User session error. Please try again.");
      if (navigation.canGoBack()) navigation.goBack();
      else navigation.replace('SignIn'); // Fallback
    }
  }, [snappyUser, yowyobUser, navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendTextMessage();
    }
  };

  // Placeholder, sera implémenté avec l'upload de fichiers
  const handleImageSelected = (imageSource) => {
    console.log("ChatScreen: Image selected - Source:", imageSource);
    addImageMessage(imageSource); // Pour l'instant, passe la source locale
  };


  // Rendu du Header avec les infos de l'interlocuteur
  const renderChatHeader = () => (
    <Header 
        onBackPress={handleGoBack} 
        // Passer les props dynamiques au Header
        interlocutorName={interlocutorName || "Chat"} 
        interlocutorAvatarUri={interlocutorAvatar} // `interlocutorAvatar` est déjà l'URI
        // interlocutorStatus={interlocutorOnline ? "Online" : "Offline"} // Si tu as cette info
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B4513" />
      
      {renderChatHeader()}

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Ajuste si nécessaire
      >
        {isLoadingHistory && messages.length === 0 ? (
          <View style={[styles.messagesList, styles.centered]}>
            <ActivityIndicator size="large" color="#8B4513" />
            <Text style={styles.loadingText}>Loading messages...</Text>
          </View>
        ) : messages.length === 0 && !isLoadingHistory ? (
           <View style={[styles.messagesList, styles.centered, styles.emptyChatContainer]}>
             <Icon name="message-circle" size={50} color="#BDBDBD" />
             <Text style={styles.emptyChatMessage}>No messages yet.</Text>
             <Text style={styles.emptyChatSubMessage}>Be the first to send a message!</Text>
           </View>
        ) :(
          <ScrollView 
            ref={scrollViewRef}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContentContainer} // Pour le padding interne
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })} // S'assurer de scroller en bas
            onLayout={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
            // Optionnel: Pull-to-refresh pour l'historique (si beaucoup de messages)
            onRefresh={loadMessageHistory} 
            refreshing={isLoadingHistory}
          >
            {/* Optionnel: Date Divider pour le premier message ou si tu implémentes le groupage par date */}
            {messages.length > 0 && (
                 <View style={styles.dateDivider}>
                    <Text style={styles.dateText}>TODAY</Text> {/* À rendre dynamique */}
                 </View>
            )}
            {messages.map((msg) => (
              <MessageItem key={msg.id.toString()} message={msg} />
            ))}
          </ScrollView>
        )}

        <InputArea 
          message={messageText}
          setMessage={setMessageText}
          onSendMessage={handleSendMessage}
          onImageSelected={handleImageSelected} // À implémenter avec upload
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </KeyboardAvoidingView>
      
      <AudioRecorder 
        isRecording={isRecording}
        recordingTime={recordingTime}
      />
    </SafeAreaView>
  );
};



export default ChatScreen;