import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../style';

const AudioRecorder = ({ isRecording, recordingTime }) => {
  if (!isRecording) return null;
  
  return (
    <View style={styles.recordingIndicator}>
      <Text style={styles.recordingTime}>{recordingTime}</Text>
      <Text style={styles.recordingText}>Recording...</Text>
    </View>
  );
};

export default AudioRecorder;