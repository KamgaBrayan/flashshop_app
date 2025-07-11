import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../style';
import { formatPrice } from './formatters';

const CartItem = ({ item, updateQuantity, handleRemoveItem }) => {
  const navigation = useNavigation();
  
  if (!item) return null;

  let displayPrice = '';
  let displayName = '';
  let itemImage = null;
  let itemQuantity = 1;

  try {
    switch (item.type) {
      case 'selling_price':
        if (item.priceOption) {
          displayPrice = formatPrice(item.priceOption.price || 
            (item.priceOption.quantity_range?.price_per_unit * 
              (item.priceOption.quantity_range?.min || 1)));
          displayName = `${item.priceOption.type?.toUpperCase() || 'Package'}`;
        }
        itemImage = item.image || item.video;
        break;

      case 'delivery':
        if (item.deliveryOption) {
          displayPrice = formatPrice(item.deliveryOption.cost);
          displayName = item.deliveryOption.name || 'Delivery';
        }
        break;

      default:
        displayPrice = formatPrice(item.price || 0);
        displayName = item.title || item.name || 'Product';
        itemImage = item.image || item.video;
        itemQuantity = item.quantity || 1;
    }

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.cartItem}
        onPress={() => {
          if (!item.type || item.type === 'product') {
            const isDriverService = item.serviceType === 'driver' ||
              item.description?.toLowerCase().includes('driver') ||
              item.description?.toLowerCase().includes('driving') ||
              item.category === 'driver';

            navigation.navigate(
              isDriverService ? 'DriverService' : 'ProductDetails',
              { productId: item.id, product: item }
            );
          }
        }}
      >
        {itemImage && (
          <View style={styles.itemImageContainer}>
            <Image source={itemImage} style={styles.itemImage} />
            {item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}% OFF</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.itemContent}>
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle} numberOfLines={2}>{displayName}</Text>
            
            {/* Show specs only for regular products */}
            {(!item.type || item.type === 'product') && (
              <View style={styles.itemSpecs}>
                {item.size && (
                  <View style={styles.specTag}>
                    <Text style={styles.specText}>Size: {item.size}</Text>
                  </View>
                )}
                {item.car && (
                  <View style={styles.specTag}>
                    <Text style={styles.specText}>Car: {item.car}</Text>
                  </View>
                )}
              </View>
            )}

            <Text style={styles.itemPrice}>{displayPrice} FCFA</Text>

            {/* Additional details for special items */}
            {item.type === 'selling_price' && item.priceOption && (
              <Text style={styles.packageDetails}>
                {item.priceOption.duration || 
                  `${item.priceOption.quantity_range?.min || 1} - ${item.priceOption.quantity_range?.max || 1} units`}
              </Text>
            )}
            {item.type === 'delivery' && item.deliveryOption?.estimated_time && (
              <Text style={styles.deliveryTime}>
                Estimated time: {item.deliveryOption.estimated_time}
              </Text>
            )}
          </View>

          <View style={styles.itemActions}>
            {/* Show quantity controls only for regular products */}
            {(!item.type || item.type === 'product') && (
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    updateQuantity(item.id, false);
                  }}
                >
                  <Ionicons name="remove" size={20} color="#8B4513" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{itemQuantity}</Text>
                <TouchableOpacity
                  style={[styles.quantityButton, styles.quantityButtonPlus]}
                  onPress={(e) => {
                    e.stopPropagation();
                    updateQuantity(item.id, true);
                  }}
                >
                  <Ionicons name="add" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.removeButton}
              onPress={(e) => {
                e.stopPropagation();
                handleRemoveItem(item);
              }}
            >
              <Ionicons name="trash-outline" size={24} color="#FF4444" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  } catch (error) {
    console.error('Error rendering cart item:', error);
    return null;
  }
};

export default CartItem;