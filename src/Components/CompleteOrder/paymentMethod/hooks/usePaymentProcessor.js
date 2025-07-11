import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { requestMobilePayment, checkPaymentStatus, TRANSACTION_STATUS } from '../../../../service/paymentService';
import { showSuccess, showError, showInfo } from '../../../../service/notificationService';
import { calculateTotal } from '../utils/paymentCalculations';

export const usePaymentProcessor = (cartItems, clearCart, paymentOptions) => {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    // Check if a payment method is selected
    if (!selectedMethod) {
      showError('Select a payment method');
      return;
    }
    
    // Check if the cart has valid items
    const total = calculateTotal(cartItems);
    if (total <= 0) {
      showError('Invalid amount');
      return;
    }

    setIsProcessing(true);
    showInfo('Preparing your payment...');
    
    try {
      // Find the selected payment method
      const selectedOption = paymentOptions.find(option => option.id === selectedMethod);
      
      if (!selectedOption) {
        throw new Error('Invalid payment method');
      }

      // In a real app, you would get this from user input or user profile
      const phoneNumber = '237658026633';
      const userName = 'BRAYAN ARMEL KUATE KAMGA';
      
      // Prepare payment data
      const paymentData = {
        amount: total,
        phoneNumber,
        customerName: userName,
        serviceName: 'Achat sur E-commerce',
        serviceDescription: `Achat de ${cartItems.length} article(s)`,
        email: 'client@example.com',
        paymentMethod: selectedOption.method
      };
      
      console.log("Sending payment request with data:", paymentData);
      
      // Request payment
      const result = await requestMobilePayment(paymentData);
      
      console.log("Response received:", JSON.stringify(result, null, 2));
      
      if (!result.success || !result.data) {
        throw new Error(result.message || 'Payment failed');
      }
      
      // Check if transaction code is available
      if (!result.data.transaction_code) {
        throw new Error('Transaction code missing in the response');
      }
      
      // Store transaction code for tracking
      const transactionCode = result.data.transaction_code;
      console.log("Transaction code obtained:", transactionCode);
      
      // Show processing message
      showInfo('Processing your payment...');
      
      // In a real app, you would implement polling or use webhooks
      setTimeout(async () => {
        try {
          // Check payment status
          const statusResult = await checkPaymentStatus(transactionCode);
          
          console.log("Status result:", JSON.stringify(statusResult, null, 2));
          
          if (statusResult.success && 
              statusResult.data && 
              statusResult.data.status === TRANSACTION_STATUS.COMPLETED) {
            // Payment successful
            showSuccess('Payment successful!');
            clearCart(); // Clear the cart
            
            // Prepare transaction details for success screen
            const transactionDetails = {
              transactionId: transactionCode,
              amount: total.toString(),
              date: new Date().toLocaleDateString(),
              paymentMethod: selectedOption.title
            };
            
            navigation.navigate('PaymentSuccess', { transactionDetails });
          } else {
            // Status indicates failure or pending
            const status = statusResult.data?.status || 'UNKNOWN';
            
            if (status === TRANSACTION_STATUS.PENDING) {
              showInfo('Payment pending...');
              // You could direct the user to a waiting screen here
            } else {
              showError('Payment failed!');
            }
          }
        } catch (statusError) {
          showError('Failed to check payment status');
          console.error('Failed to check payment status:', statusError);
        } finally {
          setIsProcessing(false);
        }
      }, 3000); // Simulate a 3-second delay
      
    } catch (error) {
      showError(error.message || 'Payment failed!');
      console.error('Failed to process payment:', error);
      setIsProcessing(false);
    }
  };

  return {
    selectedMethod,
    setSelectedMethod,
    isProcessing,
    handlePayment
  };
};