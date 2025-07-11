// src/Components/authentication/settings/index.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // << NOUVEL IMPORT
import styles from './style';
import AppHeader from '../../../reusableComponents/header';

const SettingsScreen = () => {
  const { t } = useTranslation(); // << INITIALISER LE HOOK
  const navigation = useNavigation();
  
  // La liste des items est définie à l'intérieur pour utiliser `t()`
  const settingsItems = [
    { icon: 'bell', title: "settings.notificationSettings", route: 'Notification' },
    { icon: 'lock', title: 'settings.passwordManager', route: 'PasswordManager' },
    { icon: 'globe', title: 'settings.changeLanguage', route: 'LanguageSettings' },
    { icon: 'trash-2', title: 'settings.deleteAccount', route: 'Welcome' } // Note: cette route devrait probablement aller vers une page de confirmation de suppression
  ];

  const handleSettingNav = (route) => {
    if (route) {
      navigation.navigate(route);
    } else {
      console.warn("No route defined for this setting.");
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppHeader 
          title={t('settings.title')} // Titre traduit
          onGoBack={handleGoBack}
        />

        <View style={styles.settingsContainer}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.settingsItem}
              onPress={() => handleSettingNav(item.route)}
            >
              <View style={styles.settingsItemLeft}>
                <Feather name={item.icon} size={20} color="#666" />
                <Text style={styles.settingsItemText}>{t(item.title)}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;