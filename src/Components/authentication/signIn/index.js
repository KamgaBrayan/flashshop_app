import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'; // Alert retiré
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useAuth } from '../../../context/authContext/authContext';
import googleAuthService from '../../../service/authService/googleAuthService';
import notificationService from '../../../service/notificationService'; // Importer le service de notification
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';

const OTP_STORAGE_KEY_PREFIX = 'otp_data_';
const OTP_EXPIRATION_MINUTES = 5;

const generateOtpForPasswordReset = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const storeOtpDataForPasswordReset = async (identifier, otp) => {
  try {
    const data = {
      otp,
      identifier, // email ou username
      operationType: 'passwordReset', // Pour différencier
      expiresAt: Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000,
    };
    await AsyncStorage.setItem(`${OTP_STORAGE_KEY_PREFIX}${identifier}_reset`, JSON.stringify(data)); // Clé distincte pour reset
    console.log(`SignIn: OTP data for password reset stored for ${identifier}:`, data.otp);
  } catch (e) {
    console.log("SignIn: Failed to store OTP data for password reset.", e);
    notificationService.showError("System error: Could not prepare password reset.");
    throw e;
  }
};

const SignIn = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const auth = useAuth() || {};
  const { user, isAuthenticated, login, loading: authLoading, loginWithGoogle } = auth;
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);
  const { request, response, promptAsync } = googleAuthService.useGoogleAuth();
  
  const route = useRoute();

  useEffect(() => {
    // Pré-remplir l'email si l'utilisateur existe mais n'est pas encore authentifié
    // (par exemple, s'il revient sur la page après une tentative échouée)
    // Ne pas pré-remplir si déjà authentifié car la redirection s'en chargera.
    if (!route.params?.email && user && !isAuthenticated) {
      setUsernameOrEmail(user.email || user.username || '');
      setPassword(''); // Toujours effacer le mot de passe
    }
  }, [user, isAuthenticated]); // Exécuter si user ou isAuthenticated change
  
  useEffect(() => {
    if (isAuthenticated && user) {
      navigation.replace('Home'); 
    }
  }, [isAuthenticated, user, navigation]);


  // Google SignIn useEffect
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        // Une fois que nous avons le token d'accès Google, nous appelons la fonction du contexte
        handleGoogleSignInSuccess(authentication.accessToken);
      } else {
        setGoogleAuthLoading(false);
        notificationService.showError("Google sign-in failed: No access token received.");
      }
    } else if (response?.type === 'error') {
        setGoogleAuthLoading(false);
        notificationService.showError("Google sign-in cancelled or failed.");
        console.log("Google Auth Response Error:", response.error);
    }
  }, [response]);

  const handleGoogleSignInSuccess = async (accessToken) => {
    try {
      await loginWithGoogle(accessToken);
      // La navigation vers 'Home' est gérée par le useEffect qui écoute 'isAuthenticated'
    } catch (error) {
      // Les erreurs spécifiques sont déjà notifiées dans AuthContext,
      // mais on peut afficher un message générique ici si nécessaire.
      notificationService.showError(error.message || "An error occurred during Google sign-in.");
    } finally {
      setGoogleAuthLoading(false);
    }
  };

  const handleGoogleButtonPress = () => {
    setGoogleAuthLoading(true);
    promptAsync(); // Lance le flux d'authentification Google
  };

  const handleSignIn = async () => {
    // Utilise usernameOrEmail ici
    if (!usernameOrEmail.trim() || !password) { // << CORRIGÉ: Utilise usernameOrEmail et trim()
      notificationService.showError('Please enter both username/email and password');
      return;
    }

    if (!login) {
        notificationService.showError('Login service is currently unavailable.');
        return;
    }

    try {
      await login({ username: usernameOrEmail, password });
      notificationService.showSuccess('You logged in successfully! Enjoy your stay!')
      // La navigation est gérée par le useEffect ci-dessus.
      // Un message de succès ici est optionnel et pourrait ne pas être vu.
    } catch (err) {
      let errorMessage = 'Failed to sign in. Please check your credentials.';
      if (err.response && err.response.data) {
        if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (typeof err.response.data.error === 'string') {
          errorMessage = err.response.data.error;
        } else if (err.response.data.errors && Object.keys(err.response.data.errors).length > 0) {
            const firstErrorKey = Object.keys(err.response.data.errors)[0];
            errorMessage = err.response.data.errors[firstErrorKey];
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      notificationService.showError(errorMessage);
    }
  };

  const handleUsernameOrEmailChange = (text) => { // Renommé pour clarté
    setUsernameOrEmail(text);
}

  const handlePassword = (text) => { 
      setPassword(text)
  }
  
  const handleSetShowPassword = () => {
      setShowPassword(!showPassword);    
  }

  const handleForgotPassword = async () => {
    if (!usernameOrEmail.trim()) {
      notificationService.showError(t('signIn.forgotPasswordPrompt')); // Nouvelle clé à ajouter
      return;
    }

    setForgotPasswordLoading(true);
    // SIMULATION: Vérifier si l'utilisateur existe (dans une vraie app, ce serait un appel API)
    // Pour la démo, on suppose que l'utilisateur existe toujours s'il saisit quelque chose.
    console.log(`SignIn: Initiating password reset for ${usernameOrEmail}`);
    
    try {
      // Étape 1: Générer et stocker l'OTP
      const otp = generateOtpForPasswordReset();
      await storeOtpDataForPasswordReset(usernameOrEmail, otp);

      // Étape 2: Simuler l'envoi de l'OTP
      console.log(`SIMULATED OTP SEND for password reset to ${usernameOrEmail}: ${otp}`);
      notificationService.showInfo(t('signIn.forgotPasswordInfo'));

      // Étape 3: Naviguer vers VerifyCode
      navigation.navigate('Verify', {
        identifier: usernameOrEmail, // L'email ou username entré
        operationType: 'passwordReset', // Indiquer le type d'opération
        // On ne passe pas yowyobUserId car on ne l'a pas forcément à ce stade pour un mdp oublié
      });
    } catch (error) {
      // L'erreur de stockage est déjà notifiée par storeOtpDataForPasswordReset
      console.log("SignIn: Error in forgot password process", error);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleCreateAccount = () => {
    // S'assurer que 'SignUp' est le nom de la route pour le nouvel écran d'inscription fusionné
    navigation.navigate('CreateA'); 
  };

  return (
    <ScrollView 
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t('signIn.title')}</Text>
        <Text style={styles.subtitle}>{t('signIn.subtitle')}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('signIn.usernameOrEmail')}</Text> 
        <TextInput
          style={styles.input}
          placeholder={t('signIn.usernameOrEmailPlaceholder')}
          value={usernameOrEmail}
          onChangeText={handleUsernameOrEmailChange}
          keyboardType="email-address" // Garder email-address pour la suggestion @
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('signIn.password')}</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="••••••••••••••"
            value={password}
            onChangeText={handlePassword}
            secureTextEntry={!showPassword}
            autoCompleteType="password" // Correction: autoCompleteType
          />
          {/* Utilisation d'un style 'eyeIcon' qu'il faudra peut-être ajouter à style.js */}
          <TouchableOpacity onPress={handleSetShowPassword} style={styles.eyeIconContainer}> 
            <Feather name={showPassword ? "eye" : "eye-off"} size={22} color="#888" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
            onPress={handleForgotPassword} 
            disabled={!usernameOrEmail.trim() || forgotPasswordLoading} // Désactiver si champ vide ou en chargement
        >
          <Text 
            style={[
                styles.forgotPasswordText, 
                (!usernameOrEmail.trim() || forgotPasswordLoading) && styles.disabledLinkText // Style pour lien désactivé
            ]}
          > 
            {t('signIn.forgotPassword')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Le nom de style 'signUpButton' est conservé car il existe dans ton style.js */}
      <TouchableOpacity 
        style={[styles.signUpButton, authLoading && styles.signUpButtonDisabled]} 
        onPress={handleSignIn}
        disabled={authLoading} // Utilise authLoading du contexte pour le bouton Sign In
      >
        {authLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
            <Text style={styles.signUpButtonText}>{t('signIn.signInButton')}</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.orText}>{t('signIn.orSignInWith')}</Text>

      <View style={styles.socialButtonsContainer}>
      
      <TouchableOpacity 
          style={styles.socialButton} 
          onPress={handleGoogleButtonPress}
          disabled={googleAuthLoading} // Désactiver le bouton pendant le chargement
        >
          {googleAuthLoading ? (
            <ActivityIndicator size="small" color="#8B4513" />
          ) : (
            <Image source={require('../../../../assets/utilities/icons8-google-48.png')} style={styles.socialIcon} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => notificationService.showInfo('Facebook Sign-In coming soon!')}>
          <Image source={require('../../../../assets/utilities/icons8-facebook-48.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.socialButton} onPress={() => notificationService.showInfo('Apple Sign-In coming soon!')}>
          <Image source={require('../../../../assets/utilities/icons8-apple-32.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      
      </View>

      {/* Le nom de style 'signInText' et 'signInLink' sont conservés */}
      <TouchableOpacity onPress={handleCreateAccount}>
        <Text style={styles.signInText}>
          {t('signIn.dontHaveAccount')} <Text style={styles.signInLink}>{t('signIn.signUpLink')}</Text>
        </Text>
      </TouchableOpacity>
      <View style={{ height: 30 }} /> 
    </ScrollView>
  );
};

export default SignIn;