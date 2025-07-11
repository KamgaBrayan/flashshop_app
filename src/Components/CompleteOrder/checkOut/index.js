import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import AppHeader from '../../../reusableComponents/header';
import { useCart } from '../../../context/cartContext';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { cartItems } = useCart();

  const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  }

  const handleShippingAddress = () => {
    console.log("Shipping address");
    navigation.navigate('ShippingAddress');
  }

  const handleChooseShipping = () => {
    console.log("Choose Shipping");
    navigation.navigate('ChooseShipping');
  }

  const handlePaymentMethods = () => {
    console.log('Payment methods chosen');
    navigation.navigate("PaymentMethods");
  }

  // Calculate total from cart items
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Checkout" onGoBack={handleGoBack} />

      <ScrollView style={styles.content}>
        {/* Shipping Address Section */}
        <TouchableOpacity onPress={handleShippingAddress}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="location-outline" size={24} color="#666" />
              <Text style={styles.sectionTitle}>Shipping Address</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changeButton} onPress={handleShippingAddress}>CHANGE</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.address}>
            Home
          </Text>
          <Text style={styles.addressDetail}>
            1901 Thornridge Cir. Shiloh, Hawaii 81063
          </Text>
        </View>
        </TouchableOpacity>

        {/* Shipping Type Section */}
        <TouchableOpacity onPress={handleChooseShipping}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons name="cube-outline" size={24} color="#666" />
              <Text style={styles.sectionTitle}>Choose Shipping Type</Text>
            </View>
            <TouchableOpacity onPress={handleChooseShipping}>
              <Text style={styles.changeButton}>CHANGE</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.shippingType}>Economy</Text>
          <Text style={styles.deliveryDate}>Estimated Arrival: 25 August 2023</Text>
        </View>
        </TouchableOpacity>

        
        {/* Order List Section */}
        <View style={styles.section}>
          <Text style={styles.sectionOrder}>Order List</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={item.video} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.title}</Text>
                {item.car && <Text style={styles.productSize}>Car: {item.car}</Text>}
                {item.size && <Text style={styles.productSize}>Size: {item.size}</Text>}
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>{item.price.toFixed(2)}</Text>
                  <Text style={styles.priceCurrency}> FCFA</Text>
                </View>
                <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Total Section */}
        <View style={styles.section}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.totalPrice}>{calculateTotal().toFixed(2)}</Text>
              <Text style={styles.totalCurrency}> FCFA</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.continueButton} onPress={handlePaymentMethods}>
        <Text style={styles.continueButtonText}>Continue to Payment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CheckoutScreen;