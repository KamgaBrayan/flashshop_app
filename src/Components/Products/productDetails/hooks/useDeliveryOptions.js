import { useState } from 'react';
import { Linking } from 'react-native';
import { useCart } from '../../../../context/cartContext';
import { getContactIcon } from '../utils/icons';

export const useDeliveryOptions = (productDetails) => {
  const { addDeliveryOptionToCart } = useCart();
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
  const [selectedTown, setSelectedTown] = useState(null);
  
  const handleContactPress = (method, value) => {
    switch (method) {
      case 'phone':
        Linking.openURL(`tel:${value}`);
        break;
      case 'whatsapp':
        Linking.openURL(`whatsapp://send?phone=${value}`);
        break;
      case 'email':
        Linking.openURL(`mailto:${value}`);
        break;
    }
  };
  
  const handleDeliveryOptionAddToCart = (setShowNotification) => {
    if (!selectedDeliveryOption) {
      alert("Please select a delivery option first");
      return;
    }
    
    addDeliveryOptionToCart(
      productDetails.id,
      productDetails.username,
      selectedDeliveryOption
    );
    setShowNotification(true);
  };
  
  const handleLocationPress = (coordinates) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${coordinates.latitude},${coordinates.longitude}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    
    Linking.openURL(url);
  };
  
  return {
    selectedDeliveryOption,
    selectedTown,
    setSelectedDeliveryOption,
    setSelectedTown,
    handleContactPress,
    handleDeliveryOptionAddToCart,
    handleLocationPress
  };
};