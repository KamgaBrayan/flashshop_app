import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';
const SNAPPY_TOKEN_KEY = 'snappy_auth_token'; // << NOUVEAU : Token Snappy
const SNAPPY_USER_ID_KEY = 'snappy_user_id';  // << NOUVEAU : ID utilisateur Snappy

const secureStorage = {
  // Stocker le token
  saveToken: async (token) => {
    try {
      // Vérifier que le token est une chaîne
      if (typeof token !== 'string') {
        console.warn('Token is not a string, converting to string');
        token = String(token);
      }
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  // Récupérer le token
  getToken: async () => {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Supprimer le token
  removeToken: async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  // Stocker les données utilisateur
  saveUser: async (userData) => {
    try {
      // On DOIT convertir l'objet en chaîne JSON
      const userDataString = JSON.stringify(userData);
      await SecureStore.setItemAsync(USER_KEY, userDataString);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  // Récupérer les données utilisateur
  getUser: async () => {
    try {
      const userData = await SecureStore.getItemAsync(USER_KEY);
      // Parse la chaîne JSON en objet
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  // Supprimer les données utilisateur
  removeUser: async () => {
    try {
      await SecureStore.deleteItemAsync(USER_KEY);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  },

  saveSnappyToken: async (token) => {
    try {
      if (typeof token !== 'string') {
        console.warn('Snappy Token is not a string, converting to string');
        token = String(token);
      }
      await SecureStore.setItemAsync(SNAPPY_TOKEN_KEY, token);
      console.log('Snappy token saved.');
    } catch (error) {
      console.error('Error saving Snappy token:', error);
    }
  },
  getSnappyToken: async () => {
    try {
      const token = await SecureStore.getItemAsync(SNAPPY_TOKEN_KEY);
      // console.log('Retrieved Snappy token:', token ? 'Token found' : 'No token');
      return token;
    } catch (error) {
      console.error('Error getting Snappy token:', error);
      return null;
    }
  },
  removeSnappyToken: async () => {
    try {
      await SecureStore.deleteItemAsync(SNAPPY_TOKEN_KEY);
      console.log('Snappy token removed.');
    } catch (error) {
      console.error('Error removing Snappy token:', error);
    }
  },
  saveSnappyUserId: async (userId) => {
    try {
      if (typeof userId !== 'string') userId = String(userId);
      await SecureStore.setItemAsync(SNAPPY_USER_ID_KEY, userId);
      console.log('Snappy User ID saved:', userId);
    } catch (error) {
      console.error('Error saving Snappy User ID:', error);
    }
  },
  getSnappyUserId: async () => {
    try {
      const userId = await SecureStore.getItemAsync(SNAPPY_USER_ID_KEY);
      // console.log('Retrieved Snappy User ID:', userId);
      return userId;
    } catch (error) {
      console.error('Error getting Snappy User ID:', error);
      return null;
    }
  },
  removeSnappyUserId: async () => {
    try {
      await SecureStore.deleteItemAsync(SNAPPY_USER_ID_KEY);
      console.log('Snappy User ID removed.');
    } catch (error) {
      console.error('Error removing Snappy User ID:', error);
    }
  },

  // Effacer toutes les données d'authentification
  clearAll: async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      await SecureStore.deleteItemAsync(SNAPPY_TOKEN_KEY);    // << AJOUTÉ
      await SecureStore.deleteItemAsync(SNAPPY_USER_ID_KEY); // << AJOUTÉ
      console.log('All auth storage cleared (Yowyob & Snappy).');
    } catch (error) {
      console.error('Error clearing all storage:', error);
    }
  }
};

export default secureStorage;