import React from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';

import { useCart } from '../../../context/cartContext';
import modalStyles from './modalStyles'

const CartRemovalModal = ({ 
  visible, 
  onClose, 
  item,
}) => {
  const { removeFromCart, cartItems } = useCart(); // Add cartItems here

  const confirmRemoval = () => {
    if (item) {
      // Remove the entire item from cart
      removeFromCart(item.id);
      onClose(); // Close the modal after removal
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalTitle}>Remove from Cart?</Text>
          
          {item && (
            <View style={modalStyles.itemPreview}>
              <Image 
                source={item.video} 
                style={modalStyles.itemImage}
              />
              <View style={modalStyles.itemDetails}>
                <Text style={modalStyles.itemTitle}>{item.title}</Text>
                {item.size && <Text style={modalStyles.itemSize}>Size: {item.size}</Text>}
                {item.car && <Text style={modalStyles.itemSize}>Car: {item.car}</Text>}
                <Text style={modalStyles.itemPrice}>{item.price} FCFA</Text>
              </View>
            </View>
          )}

          <View style={modalStyles.modalActions}>
            <TouchableOpacity 
              style={modalStyles.cancelButton} 
              onPress={onClose}
            >
              <Text style={modalStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={modalStyles.removeButton}
              onPress={confirmRemoval}
            >
              <Text style={modalStyles.removeButtonText}>Yes, Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CartRemovalModal;