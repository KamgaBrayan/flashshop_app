// src/screens/Cart/index.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // << NOUVEL IMPORT
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '../../reusableComponents/header';
import { styles } from './style';
import { useCart } from '../../context/cartContext';
import CartRemovalModal from './hooks/cartRemoveModal';
import CartItem from './components/CartItem';
import PromoCodeSection from './components/PromoCodeSection';
import CartSummary from './components/CartSummary';
import { useCartCalculations } from './hooks/useCartCalculations';

const CartScreen = () => {
  const { t } = useTranslation(); // << INITIALISER LE HOOK
  const navigation = useNavigation();
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const summaryData = useCartCalculations(cartItems);

  const updateQuantity = (id, increment) => {
    if (increment) {
      addToCart(cartItems.find(item => item.id === id));
    } else {
      removeFromCart(id);
    }
  };

  const handleRemoveItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCheckout = () => {
    console.log('Checkout pressed');
    navigation.navigate('Checkout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={t('cart.title')} />
      <View style={styles.cartHeader}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart" size={60} color="#000" />
          <View style={styles.cartIconBadge}>
            <Text style={styles.cartIconBadgeText}>{cartItems.length}</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.slogan}>{t('cart.slogan')}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.cartItemsContainer}>
          {cartItems.filter(item => item).map(item => (
            <CartItem 
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} // Clé plus robuste
              item={item} 
              updateQuantity={updateQuantity} 
              handleRemoveItem={handleRemoveItem}
              // Passer les traductions en props
              sizeLabel={t('cart.size')}
              colorLabel={t('cart.color')}
            />
          ))}
        </View>
        <PromoCodeSection 
            promoCode={promoCode} 
            setPromoCode={setPromoCode}
            // Passer les traductions en props
            promoCodeLabel={t('cart.promoCode')}
            promoPlaceholder={t('cart.promoPlaceholder')}
            applyLabel={t('cart.apply')}
        />
        <CartSummary 
            summaryData={summaryData} 
            // Passer les traductions en props
            subtotalLabel={t('cart.subtotal')}
            deliveryFeeLabel={t('cart.deliveryFee')}
            discountLabel={t('cart.discount')}
            totalCostLabel={t('cart.totalCost')}
        />
      </ScrollView>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>{t('cart.checkoutButton')}</Text>
      </TouchableOpacity>

      <CartRemovalModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
        // Passer les traductions en props
        title={t('cart.removeItemTitle')}
        message={t('cart.removeItemMessage')}
        cancelButtonText={t('cart.cancelButton')}
        removeButtonText={t('cart.removeButton')}
      />
    </SafeAreaView>
  );
};

export default CartScreen;