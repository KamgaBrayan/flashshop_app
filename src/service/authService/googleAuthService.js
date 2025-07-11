// src/service/authService/googleAuthService.js
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

// Cette ligne permet au navigateur de se fermer correctement après l'authentification.
WebBrowser.maybeCompleteAuthSession();

// Tes identifiants clients obtenus depuis Google Cloud Console
// Il est fortement recommandé de ne pas les coder en dur ici mais de les charger depuis des variables d'environnement.
// Pour le développement, on peut les mettre ici temporairement.
const GOOGLE_CLIENT_IDS = {
  // L'ID Client Expo Go (type: Web) est utilisé pour le développement
  expoClientId: '613136888659-oma8nm7hav8l3hnj9ufi70e7dum558h6.apps.googleusercontent.com', 
  // L'ID Client pour une build Android standalone
  androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
  // L'ID Client pour une build iOS standalone
  iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  // L'ID Client pour une application web standalone
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
};

const googleAuthService = {
  // Hook personnalisé pour gérer le flux d'authentification Google
  useGoogleAuth: () => {
    // Le hook de expo-auth-session gère une grande partie de la complexité
    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: GOOGLE_CLIENT_IDS.expoClientId,
      iosClientId: GOOGLE_CLIENT_IDS.iosClientId,
      androidClientId: GOOGLE_CLIENT_IDS.androidClientId,
      webClientId: GOOGLE_CLIENT_IDS.webClientId,
      scopes: ['profile', 'email'], // Les scopes que nous avons demandés
    });

    return { request, response, promptAsync };
  },

  // Fonction pour récupérer les informations de l'utilisateur après une authentification réussie
  getUserInfo: async (accessToken) => {
    if (!accessToken) {
      throw new Error("No access token provided to fetch user info.");
    }
    try {
        const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        
        // Ajout pour plus de robustesse
        if (!response.ok) {
          throw new Error(`Google API request failed with status: ${response.status}`);
        }
        
        const userInfo = await response.json();
        console.log('Google user info retrieved:', userInfo);
        return userInfo;
    } catch (error) {
      console.error("Error fetching Google user info:", error);
      throw new Error("Failed to fetch user information from Google.");
    }
  },
};

export default googleAuthService;