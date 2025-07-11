import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../style';

const PaymentMethodsTab = () => {
  const paymentMethods = [
    { id: 'paypal', label: 'PayPal', icon: 'logo-paypal' },
    { id: 'mtn', label: 'Mobile Money MTN', icon: 'phone-portrait-outline' },
    { id: 'orange', label: 'Orange Money', icon: 'card-outline' }
  ];

  const [selectedMethod, setSelectedMethod] = useState(null);

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Payment Methods</Text>
      <View style={styles.paymentMethodsContainer}>
        {paymentMethods.map((method) => (
          <TouchableOpacity 
            key={method.id} 
            style={[
              styles.paymentMethod, 
              selectedMethod === method.id && styles.selectedPaymentMethod
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <Ionicons 
              name={method.icon} 
              size={24} 
              color={selectedMethod === method.id ? 'blue' : 'gray'} 
            />
            <Text style={styles.paymentMethodText}>{method.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.paymentInstructions}>
        <Text style={styles.instructionTitle}>Payment Instructions:</Text>
        <Text style={styles.instructionText}>
          1. Select your preferred payment method from the options above.
        </Text>
        <Text style={styles.instructionText}>
          2. Click "Add to Cart" and proceed to checkout.
        </Text>
        <Text style={styles.instructionText}>
          3. Follow the payment instructions on the checkout page.
        </Text>
        <Text style={styles.instructionText}>
          4. You'll receive a confirmation once payment is complete.
        </Text>
      </View>
      
      <View style={styles.securityInfo}>
        <Ionicons name="shield-checkmark" size={24} color="green" />
        <Text style={styles.securityText}>
          All payments are secured with end-to-end encryption
        </Text>
      </View>
    </View>
  );
};

export default PaymentMethodsTab;