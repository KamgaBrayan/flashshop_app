import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import AppHeader from '../../../reusableComponents/header';
import { useCart } from '../../../context/cartContext';

// Import components
import AddCardSection from './components/AddCardSection';
import PaymentOptionsSection from './components/PaymentOptionsSection';

// Import hooks and utilities
import { usePaymentProcessor } from './hooks/usePaymentProcessor';
import { calculateTotal } from './utils/paymentCalculations';

const PaymentMethods = () => {
    const navigation = useNavigation();
    const { cartItems, clearCart } = useCart();
    
    // Payment options configuration
    const paymentOptions = [
        {
            id: 'mobile-money',
            title: 'Mobile Money (MTN)',
            icon: require('../../../../assets/paymentMethods/mtn-1.jpg'),
            method: 'MOBILE',
            provider: 'MTN'
        },
        {
            id: 'orange-money',
            title: 'Orange Money',
            icon: require('../../../../assets/paymentMethods/orange.png'),
            method: 'MOBILE',
            provider: 'ORANGE'
        },
        {
            id: 'paypal',
            title: 'Paypal',
            icon: require('../../../../assets/paymentMethods/paypal.png'),
            method: 'CARD',
            provider: 'PAYPAL'
        },
    ];

    // Payment processing hook
    const {
        selectedMethod,
        setSelectedMethod,
        isProcessing,
        handlePayment
    } = usePaymentProcessor(cartItems, clearCart, paymentOptions);

    // Navigation handlers
    const handleAddCard = () => {
        console.log('Add card');
        navigation.navigate('AddCard');
    };

    const handleGoBack = () => {
        console.log('Go back pressed');
        navigation.goBack();
    };

    // Check if cart is empty
    useEffect(() => {
        const total = calculateTotal(cartItems);
        if (total <= 0) {
            Alert.alert(
                "Empty Cart",
                "Your cart is empty. Please add some items before proceeding to payment.",
                [{ text: "OK", onPress: () => navigation.navigate('Home') }]
            );
        }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader title="Payment method" onGoBack={handleGoBack} />

            <ScrollView style={styles.content}>
                <AddCardSection onAddCard={handleAddCard} />
                
                <PaymentOptionsSection 
                    paymentOptions={paymentOptions}
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                    isProcessing={isProcessing}
                />
            </ScrollView>

            <TouchableOpacity 
                style={[
                    styles.confirmButton,
                    (!selectedMethod || isProcessing) && styles.confirmButtonDisabled
                ]}
                disabled={!selectedMethod || isProcessing}
                onPress={handlePayment}
            >
                <Text style={styles.confirmButtonText}>
                    {isProcessing ? 'Processing...' : 'Confirm payment'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PaymentMethods;