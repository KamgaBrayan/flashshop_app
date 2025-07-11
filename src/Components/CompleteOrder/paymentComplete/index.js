import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  Animated,
  Easing,
  Share
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import AppHeader from '../../../reusableComponents/header';
import { showSuccess, showError } from '../../../service/notificationService';

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const checkmarkScale = new Animated.Value(0);
  const checkmarkOpacity = new Animated.Value(0);
  
  // Récupérer les détails de la transaction s'ils sont disponibles
  const transactionDetails = route.params?.transactionDetails || {
    transactionId: 'TX-' + Math.floor(Math.random() * 1000000),
    amount: route.params?.amount || '0',
    date: new Date().toLocaleDateString(),
    paymentMethod: route.params?.paymentMethod || 'Paiement mobile'
  };

  useEffect(() => {
    // Animation de l'icône de succès
    Animated.parallel([
      Animated.spring(checkmarkScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true
      }),
      Animated.timing(checkmarkOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      })
    ]).start();
    
    // Afficher une notification de succès lors du chargement de la page
    showSuccess('Payment was successful!');
  }, []);

  const handleGoHome = () => {
    console.log('Retour à l\'accueil');
    navigation.navigate('Home');
  }

  const handleOrderScreen = () => {
    console.log("Navigation vers l'écran des commandes");
    navigation.navigate("OrderScreen");
  }
  
  // Partager le reçu de paiement
  const handleShareReceipt = async () => {
    try {
      const result = await Share.share({
        message: `Receipt of payment - ID transaction: ${transactionDetails.transactionId}, 
        Amount: ${transactionDetails.amount} FCFA, 
        Date: ${transactionDetails.date}, 
        Method: ${transactionDetails.paymentMethod}`
      });
      
      if (result.action === Share.sharedAction) {
        showSuccess('Receipt shared successfully');
      }
    } catch (error) {
      showError('Unable to share receipt');
      console.error('Error sharing receipt:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Paiement" onGoBack={handleGoHome} />

      <View style={styles.content}>
        <Animated.View 
          style={[
            styles.checkmarkContainer,
            {
              transform: [{ scale: checkmarkScale }],
              opacity: checkmarkOpacity
            }
          ]}
        >
          <View style={styles.checkmarkCircle}>
            <Ionicons name="checkmark" size={48} color="#fff" />
          </View>
        </Animated.View>

        <Text style={styles.successTitle}>Payment Successful !</Text>
        <Text style={styles.successMessage}>Thank you for your purchase.</Text>
        
        {/* Détails de la transaction */}
        <View style={styles.transactionDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ID Transaction :</Text>
            <Text style={styles.detailValue}>{transactionDetails.transactionId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount :</Text>
            <Text style={styles.detailValue}>{transactionDetails.amount} FCFA</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date :</Text>
            <Text style={styles.detailValue}>{transactionDetails.date}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Method :</Text>
            <Text style={styles.detailValue}>{transactionDetails.paymentMethod}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.viewOrderButton}
            onPress={handleOrderScreen}
          >
            <Text style={styles.viewOrderButtonText}>View the command</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.viewReceiptButton}
            onPress={handleShareReceipt}
          >
            <Text style={styles.viewReceiptButtonText}>Share receipt</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default PaymentSuccessScreen;