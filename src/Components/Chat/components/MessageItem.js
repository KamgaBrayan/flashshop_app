import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from '../style';

const renderMessageContent = (message) => {
  if (message.text) {
    return (
      <View style={[
        styles.messageBubble,
        message.isUser ? styles.userBubble : styles.otherBubble
      ]}>
        <Text style={[
          styles.messageText,
          !message.isUser && styles.otherMessageText
        ]}>{message.text}</Text>
      </View>
    );
  } else if (message.image) {
    return (
      <TouchableOpacity 
        onPress={() => {
          // You could add image preview functionality here
          console.log('Image pressed');
        }}
      >
        <Image
          source={message.image}
          style={styles.messageImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  } else if (message.audio) {
    return (
      <View style={styles.audioContainer}>
        <TouchableOpacity style={styles.playButton}>
          <Icon name="play" size={18} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.waveform}>
          {/* Render audio waveform bars */}
          {Array(30).fill().map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.waveformBar,
                { height: Math.random() * 20 + 5 }
              ]} 
            />
          ))}
        </View>
        <Text style={styles.audioDuration}>{message.duration}</Text>
      </View>
    );
  }
  return null;
};

const MessageItem = ({ message }) => {
  return (
    <View style={[
      styles.messageContainer,
      message.isUser ? styles.userMessage : styles.otherMessage
    ]}>
      {!message.isUser && (
        <Image
          source={require('../../../../assets/utilities/avatar.png')}
          style={styles.messagePic}
        />
      )}
      <View style={styles.messageContent}>
        {renderMessageContent(message)}
        <Text style={styles.messageTime}>{message.time}</Text>
      </View>
      {message.isUser && (
        <Image
          source={require('../../../../assets/utilities/avatar.png')}
          style={styles.messagePic}
        />
      )}
    </View>
  );
};

export default MessageItem;