// src/Components/authentication/business tools/index.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // << NOUVEL IMPORT
import styles from './style';
import AppHeader from '../../../reusableComponents/header';

// Le nom du composant est 'SettingsScreen' dans ton fichier, mais il affiche "Business Tools".
// Je vais le renommer en 'BusinessToolsScreen' pour plus de clarté.
// Si tu veux le garder comme 'SettingsScreen', c'est aussi bon.
const BusinessToolsScreen = () => {
  const { t } = useTranslation(); // << INITIALISER LE HOOK
  const navigation = useNavigation();

  // Définir la liste des items à l'intérieur pour utiliser `t()`
  const settingsItems = [
    { icon: 'credit-card', title: t('businessTools.paymentMethods'), route: 'PaymentMethods' },
    { icon: 'shopping-bag', title: t('businessTools.myOrders'), route: 'OrderScreen' },
    { icon: 'user', title: t('businessTools.myShop'), route: 'PC' }, // 'user' peut être ambigu, 'package' ou 'archive' pourrait être mieux ?
  ];

  const handleSettingNav = (route) => {
    if (route) {
      navigation.navigate(route);
    }
  };

  const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppHeader 
          title={t('businessTools.title')} // Traduire le titre du header
          onGoBack={handleGoBack} // Passé en tant que onGoBack
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
                <Text style={styles.settingsItemText}>{item.title}</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessToolsScreen; // Renommé ici aussi