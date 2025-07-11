import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importer les fichiers de traduction
import francais from './languages/francais';
import anglais from './languages/anglais';
import deutsch from './languages/deutsch'; // Renommé pour plus de clarté

// Définition des ressources avec des CODES DE LANGUE STANDARDS
const resources = {
  en: { translation: anglais },
  fr: { translation: francais },
  de: { translation: deutsch },
};

// Clé de stockage
const LANGUAGE_STORAGE_KEY = '@FlashShop:language';

// i18next-react-native-language-detector (optionnel mais recommandé pour la détection auto)
// Pour l'instant, on le fait manuellement pour garder le contrôle.

// Configuration de i18next
i18n
  .use(initReactI18next) // Lie i18next à react-i18next
  .init({
    resources,
    compatibilityJSON: 'v3', // Pour la compatibilité avec React Native
    
    // Langue à utiliser si les détections échouent
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // React gère déjà la protection XSS
    },

    // Ne pas utiliser de suspense si ton app n'est pas configurée pour
    react: {
      useSuspense: false,
    },
  });


// Fonction pour charger la langue au démarrage de l'application
export const loadLanguage = async () => {
  try {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLang && resources[storedLang]) {
      console.log(`i18n: Loading stored language: ${storedLang}`);
      await i18n.changeLanguage(storedLang);
    } else {
      // Si aucune langue n'est stockée, on ne fait rien, i18n utilisera son fallbackLng ('en')
      console.log('i18n: No stored language found, using fallback language.');
    }
  } catch (error) {
    console.error('i18n: Error loading language from storage:', error);
  }
};

// Fonction pour changer la langue, utilisée par le sélecteur
export const changeAppLanguage = async (lng) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    await i18n.changeLanguage(lng);
    console.log(`i18n: Language changed and saved to: ${lng}`);
  } catch (error) {
    console.error('i18n: Error changing language:', error);
  }
};


export default i18n;