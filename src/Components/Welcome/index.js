// src/screens/Welcome/index.js (ou ton chemin)
import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // << NOUVEL IMPORT
import styles from './style';

const WelcomeAppScreen = () => {
  const { t } = useTranslation(); // << INITIALISER LE HOOK
  const navigation = useNavigation();

  const handleGetStarted = () => {
    // Naviguer vers l'inscription ou la page principale si l'utilisateur est déjà "invité"
    console.log('Get Started pressed');
    // Si tu veux que ce bouton mène à l'inscription, change 'Home' par 'CreateA'
    navigation.navigate("Home"); 
  };

  const handleSignIn = () => {
    console.log('Sign In pressed');
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/home/welcome.jpg')}
          style={styles.mainImage}
        />
        <View style={styles.circleImagesContainer}>
          <Image
            source={require('../../../assets/home/fabien-bellanger-Rue-8bbZ5T0-unsplash.jpg')}
            style={styles.circleImage}
          />
          <Image
            source={require('../../../assets/home/sam-quek-66GYcgw0kPo-unsplash.jpg')}
            style={styles.circleImage}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{t('welcomeScreen.title')}</Text>
        <Text style={styles.subtitle}>{t('welcomeScreen.subtitle')}</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>{t('welcomeScreen.getStartedButton')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.signInText}>
            {t('welcomeScreen.alreadyHaveAccount')} <Text style={styles.signInLink}>{t('welcomeScreen.signInLink')}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeAppScreen;