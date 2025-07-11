import { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { useCart } from '../../../../context/cartContext';

export const useSellingPrice = (productDetails) => {
  const { addSellingPriceToCart } = useCart();
  const [selectedSellingPrice, setSelectedSellingPrice] = useState(null);
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);
  const [quantities, setQuantities] = useState({});
  
  // Initialize quantities with minimum order values
  useEffect(() => {
    if (!productDetails?.selling_price?.options) return;
    
    const initialQuantities = {};
    productDetails.selling_price.options.forEach(option => {
      initialQuantities[option.type] = parseInt(option.minimum_order) || 1;
    });
    setQuantities(initialQuantities);
  }, [productDetails]);
  
  const handleDecrement = (option) => {
    const minOrder = parseInt(option.minimum_order) || 1;
    const currentQuantity = quantities[option.type] || minOrder;
    
    if (currentQuantity > minOrder) {
      setQuantities(prev => ({
        ...prev,
        [option.type]: currentQuantity - 1
      }));
    }
  };
  
  const handleIncrement = (option) => {
    const maxOrder = parseInt(option.maximum_order) || 999;
    const currentQuantity = quantities[option.type] || parseInt(option.minimum_order) || 1;
    
    if (currentQuantity < maxOrder) {
      setQuantities(prev => ({
        ...prev,
        [option.type]: currentQuantity + 1
      }));
    }
  };
  
  const handleQuantityChange = (value, option) => {
    const newQuantity = parseInt(value);
    if (isNaN(newQuantity)) return;
    
    const minOrder = parseInt(option.minimum_order) || 1;
    const maxOrder = parseInt(option.maximum_order) || 999;
    
    if (newQuantity >= minOrder && newQuantity <= maxOrder) {
      setQuantities(prev => ({
        ...prev,
        [option.type]: newQuantity
      }));
    }
  };
  
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
  
  const handleSellingPriceAddToCart = (setShowNotification) => {
    if (!selectedSellingPrice) {
      alert("Please select a pricing package first");
      return;
    }
    
    addSellingPriceToCart(
      productDetails.id,
      productDetails.username,
      selectedSellingPrice
    );
    setShowNotification(true);
  };
  
  return {
    selectedSellingPrice,
    isFooterExpanded,
    quantities,
    setSelectedSellingPrice,
    setIsFooterExpanded,
    handleDecrement,
    handleIncrement,
    handleQuantityChange,
    handleContactPress,
    handleSellingPriceAddToCart
  };
};