import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style';

const BottomTabs = ({ 
  cartItems, 
  onCartPress, 
  onAddPress, 
  onChatPress, 
  onProfilePress 
}) => {
  return (
    <View style={styles.bottomTabs}>
      <TouchableOpacity style={styles.tabButton}>
        <Ionicons name="home" size={26} color="#8B4513" />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabButton} onPress={onCartPress}>
        <View>
          <Ionicons name="cart-outline" size={26} color="#8B4513" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartItems.length}
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.tabText, styles.tabTextInactive]}>Cart</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.tabButton} onPress={onAddPress}>
        <Ionicons name="add-circle" size={42} color="#8B4513" />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onChatPress} style={styles.tabButton}>
        <Ionicons name="chatbubble-outline" size={26} color="#8B4513" />
        <Text style={[styles.tabText, styles.tabTextInactive]}>Chat</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.tabButton} onPress={onProfilePress}>
        <Ionicons name="person-outline" size={26} color="#8B4513" />
        <Text style={[styles.tabText, styles.tabTextInactive]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;