// index.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import NotificationBar from '../../Products/productDetails/NotificationBar';
import styles from './style';
import AppHeader from '../../../reusableComponents/header';

const AddCardScreen = () => {

  const navigation = useNavigation();
  const [cardHolder, setCardHolder] = useState('Esther Howard');
  const [cardNumber, setCardNumber] = useState('4716 9627 1635 8047');
  const [expiryDate, setExpiryDate] = useState('02/30');
  const [cardType, setCardType] = useState('VISA');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = cleaned.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return text;
    }
  };

  const formatExpiryDate = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardType = (itemValue) => {
      setCardType(itemValue);
  };

  useEffect(() => {
        if (showNotification) {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);
        return () => clearTimeout(timer);
        }
    }, [showNotification]);

    const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>

      <NotificationBar
                visible={showNotification}
                message="Card added successfully!"
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <AppHeader title="Add Card" onGoBack={handleGoBack} />

        <View style={styles.content}>
          {/* Card Preview */}
          <View style={styles.cardPreview}>
            <View style={styles.cardChip} />
            <Text style={styles.cardNumber}>{cardNumber}</Text>
            <View style={styles.cardDetails}>
              <View>
                <Text style={styles.cardLabel}>Card holder name</Text>
                <Text style={styles.cardHolderName}>{cardHolder}</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>Expiry date</Text>
                <Text style={styles.cardExpiry}>{expiryDate}</Text>
              </View>
            </View>
            <Text style={styles.visaLogo}>{cardType}</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>

              <Text style={styles.label}>Card Type</Text>
              <Picker
                selectedValue={cardType}
                onValueChange={(itemValue) => handleCardType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Orange money" value="Orange Money" />
                <Picker.Item label="Mobile money" value="Mobile Money" />
                <Picker.Item label="VISA" value="VISA" />
                <Picker.Item label="PayPal" value="PayPal" />
              </Picker>

              <Text style={styles.label}>Card Holder Name</Text>
              <TextInput
                style={styles.input}
                value={cardHolder}
                onChangeText={setCardHolder}
                placeholder="Enter card holder name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={styles.input}
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                keyboardType="numeric"
                maxLength={19}
                placeholder="Enter card number"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  keyboardType="numeric"
                  maxLength={5}
                  placeholder="MM/YY"
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  value={cvv}
                  onChangeText={setCvv}
                  keyboardType="numeric"
                  maxLength={3}
                  placeholder="000"
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.saveCardContainer}
              onPress={() => setSaveCard(!saveCard)}
            >
              <View style={[styles.checkbox, saveCard && styles.checkboxChecked]}>
                {saveCard && <Ionicons name="checkmark" size={16} color="#fff" />}
              </View>
              <Text style={styles.saveCardText}>Save Card</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.addCardButton} onPress={() => setShowNotification(true)}>
          <Text style={styles.addCardButtonText}>Add Card</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddCardScreen;