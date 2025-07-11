import React from 'react';
import { View, Text } from 'react-native';
import styles from '../style';
import PaymentOption from './PaymentOption';

const PaymentOptionsSection = ({ 
  paymentOptions, 
  selectedMethod, 
  setSelectedMethod, 
  isProcessing 
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Other payment methods</Text>
      {paymentOptions.map(option => (
        <PaymentOption
          key={option.id}
          option={option}
          isSelected={selectedMethod === option.id}
          onSelect={setSelectedMethod}
          disabled={isProcessing}
        />
      ))}
    </View>
  );
};

export default PaymentOptionsSection;