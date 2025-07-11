// src/screens/Cart/components/PromoCodeSection.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../style';

const PromoCodeSection = ({ 
  promoCode, 
  setPromoCode,
  promoPlaceholder,
  applyLabel
}) => {
  return (
    <View style={styles.promoContainer}>
      <TextInput
        style={styles.promoInput}
        placeholder={promoPlaceholder}
        value={promoCode}
        onChangeText={setPromoCode}
      />
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>{applyLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PromoCodeSection;