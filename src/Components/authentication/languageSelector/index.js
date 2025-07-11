import React from 'react'; // Retiré useState qui n'est plus nécessaire
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeAppLanguage } from '../../../context/translation/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import notificationService from '../../../service/notificationService'; // Pour le feedback

// Ajout de la prop `showWelcomeMessage` pour le rendre réutilisable
const LanguageSelector = ({ onLanguageSelected, showWelcomeMessage = false }) => {
  const { t, i18n } = useTranslation();

  // Liste des langues avec les CODES STANDARDS qui correspondent à i18n.js
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const handleLanguageChange = async (code) => {
    try {
      // 1. Appeler la fonction centralisée pour changer la langue
      await changeAppLanguage(code);
      
      // 2. Si c'est le premier choix, marquer comme fait
      if (showWelcomeMessage) {
        await AsyncStorage.setItem('languageHasBeenSet', 'true');
      }

      // 3. Afficher une notification de succès
      notificationService.showSuccess(t('languageChangedTo', { lang: code.toUpperCase() })); // Nécessite d'ajouter cette clé de traduction
      
      // 4. Appeler le callback si fourni (pour la navigation au premier lancement)
      if (onLanguageSelected) {
        setTimeout(() => {
          onLanguageSelected();
        }, 300); // Léger délai pour que l'utilisateur voie la coche
      }
    } catch (error) {
      console.error('Error changing language:', error);
      notificationService.showError('Failed to change language.');
    }
  };

  // On utilise directement i18n.language comme source de vérité
  const currentLanguageCode = i18n.language;

  return (
    <SafeAreaView style={styles.container}>
      {/* Afficher le message de bienvenue uniquement si la prop est true */}
      {showWelcomeMessage && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>{t('welcomeTitleCombination', 'Welcome! Bienvenue! Willkommen!')}</Text>
          <Text style={styles.subtitle}>{t('selectLanguage', 'Please select your preferred language')}</Text>
        </View>
      )}

      <View style={styles.languagesContainer}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageOption,
              // La sélection est basée sur l'état actuel de i18n
              currentLanguageCode === language.code && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageChange(language.code)}
          >
            <Text style={styles.flag}>{language.flag}</Text>
            <Text style={styles.languageName}>{language.name}</Text>
            {currentLanguageCode === language.code && (
              <Feather name="check" size={20} color="#8D4714" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.currentLanguageContainer}>
        <Text style={styles.normalText}>{t('currentLanguage', 'Current')}: </Text>
        <Text style={styles.selectedText}>{currentLanguageCode.toUpperCase()}</Text>
      </View>
      
      <Text style={styles.noteText}>
        {t('canChangeLater', 'You can change this later in settings')}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginTop: 20,
    width: '100%'
  },
  backButton: {
    width: 40,
    justifyContent: 'center'
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  sideElement: {
    width: 40,
    justifyContent: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#8D4714',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  languagesContainer: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    margin: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 15,
    width: '80%',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedLanguage: {
    borderColor: '#8D4714',
    backgroundColor: '#FEE4C3',
    transform: [{ scale: 1.02 }],
  },
  flag: {
    fontSize: 28,
    marginRight: 15,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 10,
  },
  currentLanguageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  normalText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8D4714',
  },
  noteText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default LanguageSelector;