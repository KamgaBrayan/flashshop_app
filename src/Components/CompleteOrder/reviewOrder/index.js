import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import NotificationBar from '../../Products/productDetails/NotificationBar';
import Icon from 'react-native-vector-icons/Feather';
import AppHeader from '../../../reusableComponents/header';

const ReviewScreen = () => {

  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const [showNotification, setShowNotification] = useState(false);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i)}
          style={styles.starContainer}
        >
          <Icon
            name="star"
            size={32}
            color={i <= rating ? '#FFA41C' : '#E0E0E0'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    setShowNotification(true);
  }

  const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  }

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);


  return (
    <SafeAreaView style={styles.container}>
      <NotificationBar
        visible={showNotification}
        message="Item added to cart successfully!"
      />

      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <AppHeader 
        title="Review Order"
        onPress={handleGoBack}
      />

      {/* Product Info */}
      <View style={styles.productContainer}>
        <Image
          source={require('../../../../assets/products/novel/cyber.jpg')}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>Brown Jacket</Text>
          <Text style={styles.productDetails}>Size : XL | Qty : 10pcs</Text>
          <Text style={styles.productPrice}>$83.97</Text>
        </View>
        <TouchableOpacity style={styles.reorderButton} onPress={handleAddToCart}>
          <Text style={styles.reorderButtonText}>Re-Order</Text>
        </TouchableOpacity>
      </View>

      {/* Review Section */}
      <View style={styles.reviewSection}>
        <Text style={styles.reviewQuestion}>How is your order?</Text>
        <Text style={styles.ratingLabel}>Your overall rating</Text>
        <View style={styles.starsContainer}>
          {renderStars()}
        </View>
        
        <Text style={styles.reviewLabel}>Add detailed review</Text>
        <TextInput
          style={styles.reviewInput}
          placeholder="Enter here"
          multiline
          value={review}
          onChangeText={setReview}
        />

        <TouchableOpacity style={styles.addPhotoButton}>
          <Icon name="camera" size={20} color="#8B4513" />
          <Text style={styles.addPhotoText}>add photo</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReviewScreen;