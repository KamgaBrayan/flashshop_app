import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/authContext/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notificationService from '../../../service/notificationService';
import googleAuthService from '../../../service/authService/googleAuthService';
import { useTranslation } from 'react-i18next';
import styles from './style';

const CreateAccount = () => { // Ou SignUpScreen, etc.
  const navigation = useNavigation();
  const { t } = useTranslation();
  const auth = useAuth() || {};
  const { register, loading, isAuthenticated, user, loginWithGoogle } = auth;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState(''); // << NOUVEAU CHAMP USERNAME
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+237');
  const [password, setPassword] = useState('');
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { request, response, promptAsync } = googleAuthService.useGoogleAuth();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          notificationService.showWarning('Permission to access gallery is required to select a profile picture.');
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigation.replace('Home');
    }
  }, [isAuthenticated, user, navigation]);

  useEffect(() => {
    if (!response) {
      return;
    }
    
    if (response.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        // Une fois que nous avons le token d'accès Google, nous appelons la fonction du contexte
        handleGoogleSignUpSuccess(authentication.accessToken);
      } else {
        setGoogleAuthLoading(false);
        notificationService.showError("Google sign-up failed: No access token received.");
      }
    } else if (response.type === 'error') {
        setGoogleAuthLoading(false);
        notificationService.showError("Authentification Service not available : Google sign-up cancelled or failed.");
        console.log("Google Auth Response Error:", response.error);
    } else if (response.type === 'dismiss' || response.type === 'cancel') {
        setGoogleAuthLoading(false);
        // Pas besoin de notifier si l'utilisateur a simplement fermé la fenêtre
        console.log("Google Auth session dismissed by user.");
    }
  }, [response]);
  
  const storeOtpDataForVerification = async (identifier, otp, emailForStorage, phoneForStorage, yowyobIdForStorage) => {
    try {
      const OTP_STORAGE_KEY_PREFIX = 'otp_data_'; // Garder cohérent avec VerifyCode
      const OTP_EXPIRATION_MINUTES = 5;
      const data = {
        otp,
        email: emailForStorage,
        phoneNumber: phoneForStorage,
        yowyobUserId: yowyobIdForStorage,
        expiresAt: Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000,
      };
      await AsyncStorage.setItem(`${OTP_STORAGE_KEY_PREFIX}${identifier}`, JSON.stringify(data));
      console.log(`CreateAccount: OTP data stored for ${identifier}:`, data.otp);
    } catch (e) {
      console.log("CreateAccount: Failed to store OTP data.", e);
      notificationService.showError("System error: Could not prepare verification step.");
      throw e; // Renvoyer l'erreur pour arrêter le processus
    }
  };

  const generateAndStoreOTP = async (userDataForOtp, yowyobUserId) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const identifier = userDataForOtp.email || userDataForOtp.phone_number; // Ou juste email

    await storeOtpDataForVerification(identifier, otp, userDataForOtp.email, userDataForOtp.phone_number, yowyobUserId);
    return otp;
  };

  const handleGoogleSignUpSuccess = async (accessToken) => {
    try {
      if (!loginWithGoogle) {
        notificationService.showError("Google Sign-In service is not available.");
        setGoogleAuthLoading(false);
        return;
      }
      // La fonction `loginWithGoogle` va gérer l'inscription/connexion et la navigation
      // si l'authentification globale (Yowyob + Snappy) réussit.
      await loginWithGoogle(accessToken);
    } catch (error) {
      // Les erreurs spécifiques sont déjà notifiées dans AuthContext,
      // mais on peut afficher un message générique ici si nécessaire.
      notificationService.showError(error.message || "An error occurred during Google Sign-Up.");
    } finally {
      // Le loading global du AuthContext gérera l'indicateur principal, mais on désactive le nôtre.
      setGoogleAuthLoading(false);
    }
  };

  const handleGoogleButtonPress = () => {
    // Si l'utilisateur n'a pas coché les termes, on peut le lui rappeler
    if (!agreeToTerms) {
        notificationService.showWarning("Please agree to the Terms & Conditions before signing up.");
        return;
    }
    setGoogleAuthLoading(true);
    promptAsync(); // Lance le flux d'authentification Google
  };
  
  const handleSignUp = async () => {
    // Enhanced validations
    if (!firstName.trim() || !lastName.trim() || !username.trim() || !email.trim() || !password || !phoneNumber.trim()) {
      notificationService.showError('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notificationService.showError('Please enter a valid email address.');
      return;
    }
    
    // Username validation
    if (username.length < 3) {
      notificationService.showError('Username must be at least 3 characters long.');
      return;
    }
    
    // Enhanced username validation
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      notificationService.showError('Username can only contain letters, numbers, and underscores.');
      return;
    }
    
    // Password validation
    if (password.length < 8) {
      notificationService.showError('Password must be at least 8 characters long.');
      return;
    }
    
    // Enhanced password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(password)) {
      notificationService.showError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }
    
    // Phone number validation
    const phoneRegex = /^\d{8,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      notificationService.showError('Please enter a valid phone number (8-15 digits).');
      return;
    }
    
    if (!agreeToTerms) {
      notificationService.showError('You must agree to the Terms & Conditions.');
      return;
    }
  
    if (!register) {
      notificationService.showError('Registration service unavailable. Please try again later.');
      return;
    }
  
    const userData = {
      username: username.toLowerCase().trim(), // Normalize username
      email: email.toLowerCase().trim(), // Normalize email
      password: password,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      phone_number: `${countryCode}${phoneNumber}`,
      authorities: []
    };
  
    console.log('Registering with combined data:', { ...userData, password: '[REDACTED]' }); // Don't log password
  
    try {
      console.log('CreateAccount: Calling auth.register...');
      const registrationResult = await register(userData);
      console.log('CreateAccount: auth.register call finished. Result:', registrationResult);
  
      if (registrationResult && registrationResult.success) {
        console.log('CreateAccount: Registration successful. Proceeding to OTP generation...');
        const otpToSend = await generateAndStoreOTP(userData, registrationResult.yowyobUser.id);
        
        console.log(`SIMULATED OTP SEND to ${userData.phone_number} and ${userData.email}: ${otpToSend}`);
        notificationService.showInfo(`(For Dev) Your OTP is: ${otpToSend}`);
  
        console.log("CreateAccount: Attempting to navigate to 'Verify' screen...");
        
        // Navigation vers l'écran de vérification OTP
        navigation.replace('Verify', {
          identifier: userData.email, 
          operationType: 'accountVerification',
          email: userData.email,
          phoneNumber: userData.phone_number,
          yowyobUserId: registrationResult.yowyobUser.id
        });
  
        console.log("CreateAccount: Navigation to 'Verify' screen dispatched.");
  
      } else {
        notificationService.showError('Registration failed. Please check your connection and try again.');
      }
    } catch (err) {
      console.log('CreateAccount: Registration error:', err);
      notificationService.showError('Authentification Service not available : Registration failed. Please check your connection and try again.');
      
      // Enhanced error handling
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (err.response?.data) {
        const errorData = err.response.data;
        
        if (errorData.errors) {
          // Handle field-specific errors
          if (errorData.errors.email) errorMessage = errorData.errors.email;
          else if (errorData.errors.username) errorMessage = errorData.errors.username;
          else if (errorData.errors.phone_number) errorMessage = errorData.errors.phone_number;
          else {
            // Get first error message
            const firstErrorKey = Object.keys(errorData.errors)[0];
            if (firstErrorKey) {
              errorMessage = Array.isArray(errorData.errors[firstErrorKey]) 
                ? errorData.errors[firstErrorKey][0] 
                : errorData.errors[firstErrorKey];
            }
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      notificationService.showError(errorMessage);
    }
  };


  
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.log("Image pick error:", err);
      notificationService.showError('Failed to pick image. Please try again.');
    }
  };

  const handleSignInRedirect = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.title}>{t('createAccount.title')}</Text>
        <Text style={styles.subtitle}>{t('createAccount.subtitle')}</Text>
      </View>

      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image
          source={image ? { uri: image } : require('../../../../assets/utilities/avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.editAvatarButton}>
          <Feather name="camera" size={16} color="white" />
        </View>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('createAccount.firstName')}</Text>
        <TextInput style={styles.input} placeholder={t('createAccount.firstNamePlaceholder')} value={firstName} onChangeText={setFirstName} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('createAccount.lastName')}</Text>
        <TextInput style={styles.input} placeholder={t('createAccount.lastNamePlaceholder')} value={lastName} onChangeText={setLastName} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('createAccount.username')}</Text>
        <TextInput 
            style={styles.input} 
            placeholder={t('createAccount.usernamePlaceholder')} 
            value={username} 
            onChangeText={setUsername} 
            autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('createAccount.email')}</Text>
        <TextInput style={styles.input} placeholder={t('createAccount.emailPlaceholder')} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('createAccount.phone')}</Text>
        <View style={styles.phoneInputContainer}>
          <TextInput style={styles.countryCodeInput} value={countryCode} onChangeText={setCountryCode} keyboardType="phone-pad" maxLength={5} />
          <TextInput style={styles.phoneInput} placeholder={t('createAccount.phonePlaceholder')} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('createAccount.password')}</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput style={styles.passwordInput} placeholder={t('createAccount.passwordPlaceholder')} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={22} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('createAccount.gender')}</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)} style={styles.picker}>
            <Picker.Item label={t('createAccount.selectGender')} value="" />
            <Picker.Item label={t('createAccount.male')} value="male" />
            <Picker.Item label={t('createAccount.female')} value="female" />
            <Picker.Item label={t('createAccount.other')} value="other" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.termsContainer} onPress={() => setAgreeToTerms(!agreeToTerms)}>
        <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
          {agreeToTerms && <Feather name="check" size={16} color="white" />}
        </View>
        <Text style={styles.termsText}>
          {t('createAccount.agreeToTerms')}
          <Text style={styles.termsLink}>{t('createAccount.termsAndConditions')}</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.signUpButton, (!agreeToTerms || loading) && styles.signUpButtonDisabled]} 
        onPress={handleSignUp}
        disabled={!agreeToTerms || loading}
      >
        <Text style={styles.signUpButtonText}>{loading ? t('createAccount.creatingAccount') : t('createAccount.signUpButton')}</Text>
      </TouchableOpacity>

      <View style={styles.orDividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.orDividerText}>{t('createAccount.orSignUpWith')}</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity 
          style={styles.socialButton} 
          onPress={handleGoogleButtonPress}
          disabled={googleAuthLoading || !agreeToTerms} // Désactiver si en chargement ou termes non acceptés
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

      <TouchableOpacity onPress={handleSignInRedirect} style={styles.signInRedirectContainer}>
        <Text style={styles.signInRedirectText}>
          {t('createAccount.alreadyHaveAccount')} <Text style={styles.signInRedirectLink}>{t('createAccount.signInLink')}</Text>
        </Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default CreateAccount;