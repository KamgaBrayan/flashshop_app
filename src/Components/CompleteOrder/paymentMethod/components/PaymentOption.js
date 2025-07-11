import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import styles from '../style';

const PaymentOption = ({ option, isSelected, onSelect, disabled }) => {
  return (
    <TouchableOpacity
      style={styles.paymentOption}
      onPress={() => onSelect(option.id)}
      disabled={disabled}
    >
      <View style={styles.paymentOptionContent}>
        <Image 
          source={option.icon}
          style={styles.paymentIcon}
        />
        <Text style={styles.paymentOptionText}>{option.title}</Text>
      </View>
      <View style={[
        styles.radioButton,
        isSelected && styles.radioButtonSelected
      ]} />
    </TouchableOpacity>
  );
};

export default PaymentOption;