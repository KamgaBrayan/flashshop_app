import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from '../style';
import { showMediaSelectionDialog, selectImage } from '../utils/mediaHelpers';

const InputArea = ({ 
  message, 
  setMessage, 
  onSendMessage,
  onImageSelected,
  isRecording,
  startRecording,
  stopRecording
}) => {
  
  const handleAttachPress = () => {
    showMediaSelectionDialog(
      () => selectImage('camera', onImageSelected),
      () => selectImage('gallery', onImageSelected)
    );
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity 
        style={styles.attachButton}
        onPress={handleAttachPress}
      >
        <Icon name="plus" size={24} color="#8B4513" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Type a message here..."
        value={message}
        onChangeText={setMessage}
        multiline
      />
      {message.length > 0 ? (
        <TouchableOpacity 
          style={[styles.voiceButton, styles.sendButton]}
          onPress={onSendMessage}
        >
          <Icon name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={styles.voiceButton}
          onPressIn={startRecording}
          onPressOut={stopRecording}
        >
          <Icon 
            name={isRecording ? "stop-circle" : "mic"} 
            size={24} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputArea;