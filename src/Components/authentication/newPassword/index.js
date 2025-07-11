// src/screens/Authentication/NewPassword/index.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // << NOUVEL IMPORT
import styles from './style';
import notificationService from '../../../service/notificationService';

const NewPassword = () => {
  const { t } = useTranslation(); // << INITIALISER LE HOOK
  const navigation = useNavigation();
  const route = useRoute();
  const { identifier } = route.params || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNewPassword = async () => {
    // --- VALIDATION DU FORMULAIRE TRADUITE ---
    if (!password || !confirmPassword) {
      notificationService.showError(t('newPassword.notification_fillBothFields'));
      return;
    }
    if (password.length < 8) {
      notificationService.showError(t('newPassword.notification_passwordTooShort'));
      return;
    }
    if (password !== confirmPassword) {
      notificationService.showError(t('newPassword.notification_passwordsDontMatch'));
      return;
    }
    // --- FIN VALIDATION ---

    setIsLoading(true);
    console.log(`NewPassword: Attempting to set new password for identifier: ${identifier} with password: [REDACTED]`);

    // SIMULATION DE LA MISE À JOUR DU MOT DE PASSE
    setTimeout(() => {
      notificationService.showSuccess(t('newPassword.notification_updateSuccess'));
      const prefillEmail = identifier && identifier.includes('@') ? identifier : undefined;
      navigation.replace('SignIn', { email: prefillEmail });
      setIsLoading(false);
    }, 1500);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleGoBack = () => {
    notificationService.showInfo(t('newPassword.notification_resetCancelled'));
    navigation.replace('SignIn'); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      
      <View style={styles.header}>
        <Text style={styles.title}>{t('newPassword.title')}</Text>
        <Text style={styles.subtitle}>
          {t('newPassword.subtitle', { identifier: '' })}
          <Text style={{fontWeight: 'bold'}}>{identifier}</Text>
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('newPassword.newPasswordLabel')}</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
            placeholder={t('newPassword.newPasswordPlaceholder')}
            editable={!isLoading}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{t('newPassword.confirmPasswordLabel')}</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry={!showConfirmPassword}
            placeholder={t('newPassword.confirmPasswordPlaceholder')}
            editable={!isLoading}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.createButton, isLoading && styles.disabledButton]}
        onPress={handleCreateNewPassword}
        disabled={isLoading}
      >
        {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
            <Text style={styles.createButtonText}>{t('newPassword.submitButton')}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NewPassword;