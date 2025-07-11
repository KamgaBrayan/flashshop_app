import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style';

const AddCardSection = ({ onAddCard }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Credit Card</Text>
      <TouchableOpacity 
        style={styles.addCardButton}
        onPress={onAddCard}
      >
        <View style={styles.addCardContent}>
          <Ionicons name="card-outline" size={24} color="#666" />
          <Text style={styles.addCardText}>Add a card</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

export default AddCardSection;