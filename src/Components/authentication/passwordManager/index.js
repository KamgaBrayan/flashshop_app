// src/Components/authentication/passwordManager/index.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // << NOUVEL IMPORT
import styles from './style';
import AppHeader from '../../../reusableComponents/header';
import notificationService from '../../../service/notificationService'; // << NOUVEL IMPORT

const PasswordManager = () => {
  const { t } = useTranslation(); // << INITIALISER LE HOOK
  const navigation = useNavigation();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Pour gérer l'état de chargement

  const handlePasswordChange = async () => {
    // 1. Validation du formulaire
    if (!currentPassword || !newPassword || !confirmPassword) {
      notificationService.showError(t('passwordManager.notification_allFieldsRequired'));
      return;
    }
    if (newPassword.length < 8) {
      notificationService.showError(t('passwordManager.notification_passwordTooShort'));
      return;
    }
    if (newPassword !== confirmPassword) {
      notificationService.showError(t('passwordManager.notification_passwordsDontMatch'));
      return;
    }

    setIsLoading(true);
    console.log('Changing password...');

    // 2. SIMULATION d'appel API pour changer le mot de passe
    // Dans une vraie application, tu appellerais un service ici.
    // await authService.changePassword({ oldPassword: currentPassword, newPassword });
    try {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simuler un succès
        notificationService.showSuccess(t('passwordManager.notification_changeSuccess'));
        navigation.goBack(); // Revenir à l'écran précédent (probablement Settings)

    } catch (error) {
        // Simuler une erreur
        console.error("Password change failed:", error);
        notificationService.showError(t('passwordManager.notification_changeError'));
    } finally {
        setIsLoading(false);
    }
  };

  const handleForgotPasswordChange = () => {
    console.log("forgot password pressed");
    // Ce flux est déjà géré par SignIn.js. Ici, on pourrait demander l'email
    // de l'utilisateur avant de naviguer, si `user.email` n'est pas disponible.
    // Pour l'instant, on navigue directement.
    navigation.navigate("Verify", {
      // On suppose que l'utilisateur veut réinitialiser le mdp pour son compte actuel
      // Il faudrait une logique pour récupérer l'identifiant (email/username) de l'utilisateur connecté
      // identifier: user.email, 
      operationType: 'passwordReset'
    });
  };

  const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={t('passwordManager.title')}
        onGoBack={handleGoBack} // Corrigé pour utiliser onGoBack
      />

      <View style={styles.formContainer}>
        <View style={styles.formItem}>
          <Text style={styles.formLabel}>{t('passwordManager.currentPassword')}</Text>
          <TextInput
            style={styles.formInput}
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="********"
            editable={!isLoading}
          />

          <TouchableOpacity onPress={handleForgotPasswordChange}>
            <Text style={{marginTop: 10, color: '#8B4513', textDecorationLine: 'underline', textAlign: 'right'}}>
              {t('passwordManager.forgotPasswordLink')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formLabel}>{t('passwordManager.newPassword')}</Text>
          <TextInput
            style={styles.formInput}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="********"
            editable={!isLoading}
          />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formLabel}>{t('passwordManager.confirmNewPassword')}</Text>
          <TextInput
            style={styles.formInput}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="********"
            editable={!isLoading}
          />
        </View>

        <TouchableOpacity 
          style={[styles.changeButton, isLoading && styles.disabledButton]} // Style pour bouton désactivé
          onPress={handlePasswordChange}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.changeButtonText}>{t('passwordManager.changeButton')}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordManager;