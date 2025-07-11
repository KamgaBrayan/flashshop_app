// src/Components/catalogue/customProductCatalogue/components/ProductCard.js
import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style';

// On passe `t` en prop
const ProductCard = ({ item, onPress, t }) => {
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => onPress(item)}
    >
      <Image
        source={
          typeof item.option1 === 'number'
            ? item.option1
            : { uri: item.option1 }
        }
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price} FCFA</Text>

        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
          {item.type === 'tangible' ? (
            // Utilisation de l'interpolation pour le stock
            <Text style={styles.stock}>• {t('productCard.inStock', { stock: item.stock || 0 })}</Text>
          ) : (
            <Text style={[
              styles.availability,
              { color: item.availability === 'Available' ? '#4CAF50' : '#FF6B6B' }
            ]}>
              {/* Traduction de 'Available' / 'Not Available' */}
              • {item.availability === 'Available' ? t('productCard.available') : t('productCard.notAvailable')}
            </Text>
          )}
        </View>

        <Text numberOfLines={2} style={styles.productDescription}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;