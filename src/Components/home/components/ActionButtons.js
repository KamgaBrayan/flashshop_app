import React from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/authContext/authContext'; // Ajoutez cet import
import styles from '../style';

const ActionButtons = ({ 
  item, 
  onProfilePress, 
  onLikePress, 
  onCommentPress, 
  onAddToCart,
  scaleValue,
}) => {
  const navigation = useNavigation(); // Ajoutez cette ligne
  const { isAuthenticated } = useAuth() || {}; // Ajoutez cette ligne
  
  // Fonction pour gérer les actions qui nécessitent une authentification
  const handleAuthRequiredAction = (action, params) => {
    if (!isAuthenticated) {
      // Rediriger vers la page de connexion si non authentifié
      navigation.navigate('SignIn');
      return;
    }
    
    // Exécuter l'action si authentifié
    action(params);
  };
  
  return (
    <View style={styles.rightActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onProfilePress(item)}
      >
        <Image
          source={item.userImage}
          style={styles.profileImage}
        />
        <View style={styles.followButtonProfile}>
          <Ionicons name="add-circle" size={20} color="#8B4513" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleAuthRequiredAction(onLikePress, item.id)}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <Ionicons 
            name={item.isLiked ? "heart" : "heart-outline"}
            size={35} 
            color={item.isLiked ? "#FF2D55" : "#FFF"} 
          />
        </Animated.View>
        <Text style={styles.actionText}>{item.likes}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => onCommentPress(item)}
      >
        <Ionicons name="chatbubble-ellipses" size={35} color="#FFF" />
        <Text style={styles.actionText}>{item.comments}</Text>
      </TouchableOpacity>
    
      <TouchableOpacity 
        style={[styles.actionButton, {
          backgroundColor: '#FFF',
          borderRadius: 30,
          padding: 8,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }]}
        onPress={() => handleAuthRequiredAction(onAddToCart, item)}
      >
        <Ionicons name="cart" size={26} color="#8B4513" />
        <View style={styles.followButton}>
          <Ionicons name="add-circle" size={20} color="#8B4513" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButtons;