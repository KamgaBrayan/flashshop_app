import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Helper function to generate unique IDs for cart items
  const generateCartItemId = (baseId, type, option) => {
    return `${baseId}_${type}_${option.type || option.name}`;
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    
    // Show notification
    setNotificationMessage(`${item.username}'s ${item.type || 'item'} added to cart`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const addSellingPriceToCart = (productId, username, sellingPrice) => {
    const cartItemId = generateCartItemId(productId, 'selling_price', sellingPrice);
    
    // Check if this selling price option is already in cart
    const existingItem = cartItems.find(item => item.id === cartItemId);
    
    if (!existingItem) {
      const cartItem = {
        id: cartItemId,
        type: 'selling_price',
        productId,
        username,
        priceOption: {
          type: sellingPrice.type,
          price: sellingPrice.price,
          duration: sellingPrice.duration,
          quantity_range: sellingPrice.quantity_range,
          features: sellingPrice.features
        },
        quantity: 1
      };
      
      setCartItems([...cartItems, cartItem]);
      
      // Show notification
      setNotificationMessage(`${sellingPrice.type.toUpperCase()} package added to cart`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const addDeliveryOptionToCart = (productId, username, deliveryOption) => {
    const cartItemId = generateCartItemId(productId, 'delivery', deliveryOption);
    
    // Check if this delivery option is already in cart
    const existingItem = cartItems.find(item => item.id === cartItemId);
    
    if (!existingItem) {
      const cartItem = {
        id: cartItemId,
        type: 'delivery',
        productId,
        username,
        deliveryOption: {
          type: deliveryOption.type,
          name: deliveryOption.name,
          cost: deliveryOption.cost,
          currency: deliveryOption.currency,
          negotiable: deliveryOption.negotiable,
          estimated_time: deliveryOption.estimated_time,
          notes: deliveryOption.notes,
          ...(deliveryOption.address && { address: deliveryOption.address }),
          ...(deliveryOption.available_hours && { available_hours: deliveryOption.available_hours }),
          ...(deliveryOption.available_towns && { available_towns: deliveryOption.available_towns })
        },
        quantity: 1
      };
      
      setCartItems([...cartItems, cartItem]);
      
      // Show notification
      setNotificationMessage(`${deliveryOption.name} added to cart`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));
      
      // Show notification
      let message = '';
      switch (existingItem.type) {
        case 'selling_price':
          message = `${existingItem.priceOption.type.toUpperCase()} package removed from cart`;
          break;
        case 'delivery':
          message = `${existingItem.deliveryOption.name} removed from cart`;
          break;
        default:
          message = `${existingItem.username}'s ${existingItem.type || 'item'} removed from cart`;
      }
      
      setNotificationMessage(message);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  // Get all cart items related to a specific product
  const getProductCartItems = (productId) => {
    return cartItems.filter(item => 
      item.id === productId || // Main product
      item.productId === productId // Related selling price or delivery options
    );
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      setCartItems, 
      addToCart,
      addSellingPriceToCart,
      addDeliveryOptionToCart,
      removeFromCart,
      getProductCartItems,
      showNotification,
      notificationMessage 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);