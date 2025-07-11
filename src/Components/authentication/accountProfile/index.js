import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import styles from './style';
import { useCart } from '../../../context/cartContext';
import { useAuth } from '../../../context/authContext/authContext'; // Ajout de l'import
import { useTranslation } from 'react-i18next';
import AppHeader from '../../../reusableComponents/header';
import notificationService from '../../../service/notificationService';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation()
  const { cartItems } = useCart();
  const { user, logout, organization, isProducer } = useAuth() || {}; // Récupérer les informations de l'utilisateur
  const [profileImage, setProfileImage] = useState(require('../../../../assets/default.png'));

  // Fonction pour formater le nom d'utilisateur
  const formatUserName = () => {
    if (!user) return 'Guest User';
    
    // Si l'utilisateur a un prénom et un nom
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    
    // Si l'utilisateur a uniquement un nom complet
    if (user.name) {
      return user.name;
    }
    
    // Si l'utilisateur a un nom d'utilisateur ou email
    return user.username || user.email || 'User';
  };

  const menuItems = useMemo(() => {
    const allItems = [];

    // Ajouter les options "producteur" en premier si l'utilisateur en est un.
    if (isProducer) {
      allItems.push({ icon: 'home', title: 'profile.myCompany' });
      allItems.push({ icon: 'briefcase', title: 'profile.businessTools' });
    }

    // Ajouter le reste des items pour tous les utilisateurs.
    allItems.push(
      { icon: 'heart', title: 'profile.favorites' },
      { icon: 'settings', title: 'profile.settings' },
      { icon: 'help-circle', title: 'profile.helpCenter' },
      { icon: 'lock', title: 'profile.privacyPolicy' },
      { icon: 'users', title: 'profile.inviteFriends' },
      { icon: 'star', title: 'profile.rateApp' },
      { icon: 'log-out', title: 'profile.logout' }
    );

    return allItems;
  }, [isProducer, t]); // Le tableau dépend de `isProducer` et `t` (pour la langue)

  const handleGoBack = () => {
    console.log('Go back pressed');
    navigation.goBack();
  };

  const handleHome = () => {
    console.log('Home pressed');
    navigation.navigate('Home');
  };

  const handleCart = () => {
    console.log('Cart pressed');
    navigation.navigate('Cart');
  };

  const handleProfile = () => {
    console.log('Profile pressed');
    navigation.navigate('profile');
  };

  const handleChat = () => {
    console.log('Chat pressed');
    navigation.navigate('Conversation'); // Adjust this to your actual chat screen name
  };

  const handlePC = () => { // "PC" signifie "Producer Catalogue"
    console.log('Producer button pressed. Is producer:', isProducer);
    if (isProducer && organization) {
      // Si l'utilisateur est déjà un producteur, on l'envoie à son catalogue
      navigation.navigate('PC');
    } else {
      // Sinon, on l'envoie vers l'écran de création d'organisation
      // Nous nommerons cette nouvelle route 'CreateOrganization'
      navigation.navigate('CreateOrganization');
    }
  };

  const handleNavigation = ({chosenItem}) => {
  
    if (chosenItem === 'star') {
      navigation.navigate('Rating');
    }
    if (chosenItem === 'settings') {
      navigation.navigate('Settings')
    };
    if (chosenItem === 'help-circle') {
      navigation.navigate('Help')
    };
    if (chosenItem === 'lock') {
      navigation.navigate('PrivacyPolicy')
    };
    if (chosenItem === 'users') {
      navigation.navigate('Invite')
    };
    if (chosenItem === 'shopping-bag') {
      navigation.navigate('OrderScreen')
    };
    if (chosenItem === 'heart') {
      navigation.navigate('WishList')
    };
    if (chosenItem === 'log-out') {
      Alert.alert(
        t('profile.logout_title'),
        t('profile.logout_message'),
        [
          { text: t('profile.logout_cancel'), style: "cancel" },
          { 
            text: t('profile.logout_confirm'), 
            onPress: async () => {
              try {
                await logout();
                navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
              } catch (error) {
                console.log('Erreur lors de la déconnexion:', error);
                notificationService.showError(t('profile.logout_error_message'))
                Alert.alert(t('profile.logout_error_title'), t('profile.logout_error_message'));
              }
            }
          }
        ]
      );
    };
  
    if (chosenItem === 'briefcase') {
      navigation.navigate('BusinessTools');
    };
    if (chosenItem === 'home') {
      navigation.navigate('MyCompany');
    };
    
    if (chosenItem === 'user') {
      navigation.navigate('PC')
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('profile.permission_gallery_title'), t('profile.permission_gallery_message'));
      return;
    }

    // Launch the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      // The selected image URI is in result.assets[0].uri
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  // Utiliser l'URL de l'image de profil si disponible dans les données utilisateur
  useEffect(() => {
    if (user && user.profile_image) {
      setProfileImage({ uri: user.profile_image });
    }
  }, [user]);

  const renderBottomTabs = () => (
    <View style={styles.bottomTabs}>
      <TouchableOpacity style={styles.tabButton} onPress={handleHome}>
        <Ionicons name="home-outline" size={24} color="#8B4513" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={handleCart}>
        <View>
          <Ionicons name="cart-outline" size={24} color="#8B4513" />
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartItems.length}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.tabButton} onPress={handlePC}>
        <Ionicons name="add-circle-outline" size={40} color="#8B4513" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleChat} style={styles.tabButton}>
        <Ionicons name="chatbubble-outline" size={24} color="#8B4513" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={handleProfile}>
        <Ionicons name="person" size={24} color="#8B4513" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title={t('profile.title')} onGoBack={handleGoBack} />

      <ScrollView style={{marginBottom: 50}}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={profileImage}
              style={styles.avatar}
            />
            <TouchableOpacity 
              style={styles.editButton}
              onPress={pickImage}
            >
              <Feather name="edit-2" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{formatUserName()}</Text>
          {user?.email && <Text style={styles.email}>{user.email}</Text>}
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => {handleNavigation({chosenItem: item.icon})}}
            >
              <View style={styles.menuItemLeft}>
                <Feather name={item.icon} size={20} color="#666" />
                <Text style={styles.menuItemText}>{t(item.title)}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {renderBottomTabs()}
    </SafeAreaView>
  );
};

export default ProfileScreen;