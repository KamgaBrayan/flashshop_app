import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import NotificationBar from '../../Products/productDetails/NotificationBar';
import styles from './style';
import AppHeader from '../../../reusableComponents/header';

const ChooseShipping = () => {

    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState('economy');
    const [showNotification, setShowNotification] = useState(false);
    
    const shippingMethods = [
        {
            id: 'economy',
            title: 'Economy',
            icon: 'cube-outline',
            estimatedDate: '25 August 2023'
        },
        {
            id: 'regular',
            title: 'Regular',
            icon: 'cube-outline',
            estimatedDate: '24 August 2023'
        },
        {
            id: 'cargo',
            title: 'Cargo',
            icon: 'truck-outline',
            estimatedDate: '22 August 2023'
        },
        {
            id: 'friend',
            title: "Friend's House",
            icon: 'home-outline',
            address: '2464 Royal Ln. Mesa, New Jersey 45463'
        }
    ];

    const renderShippingMethod = (method) => (
        <TouchableOpacity
            key={method.id}
            style={styles.shippingCard}
            onPress={() => setSelectedMethod(method.id)}
        >
            <View style={styles.shippingContent}>
                <View style={styles.shippingLeft}>
                    { method.icon === 'truck-outline' ? 
                    <MaterialCommunityIcons name="truck-cargo-container" size={24} color="black" />
                    :
                    <Ionicons 
                        name={method.icon} 
                        size={24} 
                        color="#666"
                    />}
                    <View style={styles.shippingTextContainer}>
                        <Text style={styles.shippingTitle}>{method.title}</Text>
                        <Text style={styles.shippingDetails}>
                            {method.estimatedDate ? 
                                `Estimated Arrival ${method.estimatedDate}` : 
                                method.address
                            }
                        </Text>
                    </View>
                </View>
                <View style={[
                    styles.radioButton,
                    selectedMethod === method.id && styles.radioButtonSelected
                ]} />
            </View>
        </TouchableOpacity>
    );

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
    };
    
    return (
        <SafeAreaView style={styles.container}>

            <NotificationBar
                visible={showNotification}
                message="Shipping address updated!"
            />
            
            <AppHeader title="Choose Shipping" onGoBack={handleGoBack} />

            <ScrollView style={styles.shippingList}>
                {shippingMethods.map(renderShippingMethod)}
            </ScrollView>

            <TouchableOpacity style={styles.applyButton} onPress={() => setShowNotification(true)}>
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ChooseShipping;