import 'react-native-url-polyfill/auto';
import { registerRootComponent } from 'expo';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Animated, Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import AppRouter from './src/Routes/Approuter';

// Contexte & Services
import { AuthProvider } from './src/context/authContext/authContext';
import { LanguageProvider } from './src/context/languageContext';
import { loadLanguage } from './src/context/translation/i18n'; // Importer notre fonction d'initialisation
import notificationService, { NOTIFICATION_COLORS } from './src/service/notificationService';
import { CartProvider } from './src/context/cartContext'; // Assure-toi que ces chemins sont corrects
import { SharedPostsProvider } from './src/context/postContext/sharedPostsContext';
import { NotificationProvider } from './src/reusableComponents/paymentStatus';
// Composants
import LanguageSelector from './src/Components/authentication/languageSelector';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// --- Composant LoadingDots (inchangé) ---
const LoadingDots = () => {
  const dots = Array(7).fill(0);
  const [activeDotIndex, setActiveDotIndex] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveDotIndex(prevIndex => (prevIndex + 1) % dots.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.dotsContainer}>
      {dots.map((_, index) => (
        <View key={index} style={[styles.dot, index <= activeDotIndex && styles.activeDot]} />
      ))}
    </View>
  );
};

// --- Configuration Toast (inchangée) ---
const toastConfig = { /* ... ton objet toastConfig existant ... */ };
toastConfig.success = (props) => (<BaseToast {...props} style={{ borderLeftColor: NOTIFICATION_COLORS.success, height: 'auto', minHeight: 60, width: '90%' }} contentContainerStyle={{ paddingHorizontal: 15 }} text1Style={{ fontSize: 16, fontWeight: 'bold' }} text2Style={{ fontSize: 14 }} text2NumberOfLines={3} />);
toastConfig.error = (props) => (<ErrorToast {...props} style={{ borderLeftColor: NOTIFICATION_COLORS.error, height: 'auto', minHeight: 60, width: '90%' }} contentContainerStyle={{ paddingHorizontal: 15 }} text1Style={{ fontSize: 16, fontWeight: 'bold' }} text2Style={{ fontSize: 14 }} text2NumberOfLines={3} />);
toastConfig.info = (props) => (<BaseToast {...props} style={{ borderLeftColor: NOTIFICATION_COLORS.info, height: 'auto', minHeight: 60, width: '90%' }} contentContainerStyle={{ paddingHorizontal: 15 }} text1Style={{ fontSize: 16, fontWeight: 'bold' }} text2Style={{ fontSize: 14 }} text2NumberOfLines={3} />);
toastConfig.warning = (props) => (<BaseToast {...props} style={{ borderLeftColor: NOTIFICATION_COLORS.warning, height: 'auto', minHeight: 60, width: '90%' }} contentContainerStyle={{ paddingHorizontal: 15 }} text1Style={{ fontSize: 16, fontWeight: 'bold' }} text2Style={{ fontSize: 14 }} text2NumberOfLines={3} />);


export default function App() {
  // Un état pour l'initialisation (langue, etc.) et un pour la séquence d'animation.
  const [isAppInitialized, setIsAppInitialized] = React.useState(false);
  const [appDisplayState, setAppDisplayState] = React.useState('loading'); // loading -> dots -> language-selection/main-app
  
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [hasLanguageBeenPreviouslySet, setHasLanguageBeenPreviouslySet] = React.useState(false);

  // Étape 1: Préparer l'application (langue, notifications) une seule fois.
  React.useEffect(() => {
    async function prepareApp() {
      try {
        // Initialiser les notifications
        const toastHandler = ({ message, type, duration }) => { Toast.show({ type: type, text1: type.charAt(0).toUpperCase() + type.slice(1), text2: message, visibilityTime: duration || 4000, autoHide: true }); };
        notificationService.initNotifications(toastHandler);
        
        // Charger la langue stockée dans i18n
        await loadLanguage();
        
        // Vérifier si l'utilisateur a déjà choisi une langue par le passé
        const languageSetFlag = await AsyncStorage.getItem('languageHasBeenSet');
        if (languageSetFlag === 'true') {
          setHasLanguageBeenPreviouslySet(true);
        }

      } catch (e) {
        console.warn("App.js: Error during app preparation:", e);
      } finally {
        // Une fois terminé, on indique que l'application est prête à démarrer la séquence d'animation.
        setIsAppInitialized(true);
      }
    }
    
    prepareApp();
  }, []);

  // Étape 2: Gérer la séquence d'animation une fois que l'application est initialisée.
  React.useEffect(() => {
    if (!isAppInitialized) return; // N'exécuter que si la préparation est terminée.

    let logoTimer;
    let dotsTimer;

    if (appDisplayState === 'loading') {
      logoTimer = setTimeout(() => {
        Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true })
          .start(() => { setAppDisplayState('dots'); fadeAnim.setValue(1); });
      }, 4000); // 4 secondes pour le logo
    } else if (appDisplayState === 'dots') {
      dotsTimer = setTimeout(() => {
        Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true })
          .start(() => {
            // Décider où aller après les animations
            if (hasLanguageBeenPreviouslySet) {
              setAppDisplayState('main-app'); // Aller directement à l'application principale
            } else {
              setAppDisplayState('language-selection'); // Montrer l'écran de sélection de langue
            }
            fadeAnim.setValue(1);
          });
      }, 5000); // 5 secondes pour les points
    }

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(dotsTimer);
    };
  }, [isAppInitialized, appDisplayState, hasLanguageBeenPreviouslySet, fadeAnim]);


  const handleLanguageSelected = async () => {
    await AsyncStorage.setItem('languageHasBeenSet', 'true');
    setHasLanguageBeenPreviouslySet(true);
    setAppDisplayState('main-app'); // Passer à l'application principale
  };

  // Fonction de rendu du contenu principal
  const renderAppContent = () => {
    // Si l'application n'est pas encore initialisée, on affiche le premier écran de splash.
    // Cela évite le flash d'un écran vide et résout le bug de rendu de texte.
    if (!isAppInitialized || appDisplayState === 'loading') {
      return (
        <Animated.View style={[styles.fullScreenContainer, appDisplayState === 'loading' && { opacity: fadeAnim }]}>
          <Image source={require('./assets/flashshop_logo.png')} style={styles.logoImage} resizeMode="contain" />
        </Animated.View>
      );
    }

    switch (appDisplayState) {
      case 'dots':
        return (
          <Animated.View style={[styles.fullScreenContainer, { opacity: fadeAnim }]}>
            <Image source={require('./assets/loading_image.png')} style={styles.illustrationImage} resizeMode="contain" />
            <LoadingDots />
          </Animated.View>
        );
      case 'language-selection':
        return (
          <View style={styles.screenContainer}>
            <LanguageSelector onLanguageSelected={handleLanguageSelected} showWelcomeMessage={true} />
          </View>
        );
      case 'main-app':
        return <AppRouter />;
      default:
        // Fallback au cas où, affiche un loader simple.
        return (
          <View style={styles.fullScreenContainer}>
            <ActivityIndicator size="large" color="#8B4513" />
          </View>
        );
    }
  };

  return (
    // Les providers enveloppent toute la logique de rendu pour être disponibles partout.
    <NotificationProvider>
        <CartProvider>
            <SharedPostsProvider>
                <AuthProvider>
                    <LanguageProvider>
                        {renderAppContent()}
                        <StatusBar style="auto" />
                        <Toast config={toastConfig} />
                    </LanguageProvider>
                </AuthProvider>
            </SharedPostsProvider>
        </CartProvider>
    </NotificationProvider>
  );
}

// --- Styles (inchangés par rapport à ton fichier) ---
const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  screenContainer: {
    flex: 1,
  },
  logoImage: {
    width: screenWidth * 1.0,
    height: screenWidth * 1.0,
  },
  illustrationImage: {
    width: screenWidth * 1.5,
    height: screenHeight * 1.0,
    marginBottom: 30,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 40,
    position: 'absolute',
    bottom: screenHeight * 0.1,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 12,
    marginHorizontal: 8.5,
    backgroundColor: 'gray',
  },
  activeDot: {
    backgroundColor: '#FF6F00',
  },
});

registerRootComponent(App);