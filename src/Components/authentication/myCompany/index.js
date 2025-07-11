// src/Components/authentication/myCompany/index.js
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // << NOUVEL IMPORT
import styles from './style';
import AppHeader from '../../../reusableComponents/header';

const MyCompanyScreen = () => {
  const { t } = useTranslation(); // << INITIALISER LE HOOK
  const navigation = useNavigation();

  // On définit la liste des items à l'intérieur du composant pour utiliser `t()`
  const settingsItems = [
    { icon: 'user', title: t('myCompany.myVendors'), route: 'MyVendors' },
    { icon: 'home', title: t('myCompany.myAgencies'), route: 'MyAgencies' },
    { icon: 'shopping-bag', title: t('myCompany.myCatalogue'), route: 'PC' },
  ];

  // La navigation est simplifiée en utilisant la clé 'route'
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
          title={t('myCompany.title')} // Traduire le titre du header
          onGoBack={handleGoBack} // Passé en tant que onGoBack
        />

        <View style={styles.settingsContainer}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.settingsItem}
              onPress={() => handleSettingNav(item.route)} // Utiliser la route définie
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

export default MyCompanyScreen;