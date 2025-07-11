import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import NotificationBar from '../../Products/productDetails/NotificationBar';
import styles from './style';
import AppHeader from '../../../reusableComponents/header';

const ShippingAddress = () => {

    const navigation = useNavigation();
    const [selectedAddress, setSelectedAddress] = useState('home');
    const [showNotification, setShowNotification] = useState(false);
    
    const addresses = [
        {
            id: 'home',
            title: 'Home',
            address: '1901 Thornridge Cir. Shiloh, Hawaii 81063'
        },
        {
            id: 'office',
            title: 'Office',
            address: '4517 Washington Ave. Manchester, Kentucky 39495'
        },
        {
            id: 'parents',
            title: "Parent's House",
            address: '8502 Preston Rd. Inglewood, Maine 98380'
        },
        {
            id: 'friend',
            title: "Friend's House",
            address: '2464 Royal Ln. Mesa, New Jersey 45463'
        }
    ];

    const renderAddressCard = (item) => (
        <TouchableOpacity
            key={item.id}
            style={styles.addressCard}
            onPress={() => setSelectedAddress(item.id)}
        >
            <View style={styles.addressContent}>
                <View style={styles.addressLeft}>
                    <Ionicons 
                        name="location-outline" 
                        size={24} 
                        color="#666"
                    />
                    <View style={styles.addressTextContainer}>
                        <Text style={styles.addressTitle}>{item.title}</Text>
                        <Text style={styles.addressText}>{item.address}</Text>
                    </View>
                </View>
                <View style={[
                    styles.radioButton,
                    selectedAddress === item.id && styles.radioButtonSelected
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
        console.log("go back pressed")
        navigation.goBack();
    };
    return (
        <SafeAreaView style={styles.container}>

            <NotificationBar
                visible={showNotification}
                message="Shipping address updated!"
            />
            
            <AppHeader 
                title="Shipping Address" 
                onGoBack={handleGoBack}
            />

            <ScrollView style={styles.addressList}>
                {addresses.map(renderAddressCard)}
                
                <TouchableOpacity style={styles.addNewButton}>
                    <Ionicons name="add" size={24} color="#8B4513" />
                    <Text style={styles.addNewText}>Add New Shipping Address</Text>
                </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity style={styles.applyButton} onPress={() => setShowNotification(true)}>
                <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ShippingAddress;