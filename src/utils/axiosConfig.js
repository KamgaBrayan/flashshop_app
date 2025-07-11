import axios from 'axios';
import secureStorage from '../service/authService/secureStorage'; // Chemin à vérifier

// L'URL de base de ta passerelle API
const API_GATEWAY_URL = 'https://gateway.yowyob.com';

// On crée une instance d'Axios. C'est mieux que de modifier l'instance globale.
const axiosInstance = axios.create({
  baseURL: API_GATEWAY_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Intercepteur de requête : Le cerveau de l'authentification ---
axiosInstance.interceptors.request.use(
  async (config) => {
    // Liste des URLs qui ne doivent PAS recevoir le token de l'utilisateur.
    // Par exemple, l'appel pour obtenir le token d'application OAuth2.
    const publicUrls = ['/auth-service/oauth/token'];
    
    // On vérifie si l'URL de la requête est publique
    const isPublicUrl = publicUrls.some(url => config.url.includes(url));

    // Si la requête n'est PAS publique, on récupère et on injecte le token JWT de l'utilisateur
    if (!isPublicUrl) {
      const userToken = await secureStorage.getToken(); // Token Yowyob
      if (userToken) {
        // Le token d'application pour /register et /login sera géré directement
        // dans authService.js car il est spécifique à ces appels.
        // Pour toutes les autres requêtes (organisation, etc.), on utilise le token utilisateur.
        
        // On vérifie si un token 'Authorization' n'a pas déjà été défini manuellement
        // (comme le token d'application dans authService.js)
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${userToken}`;
        }
      }
    }

    // --- Log de débogage (ta logique existante) ---
    console.log('Axios Request:', {
      method: config.method.toUpperCase(),
      url: `${config.baseURL}${config.url}`,
      headers: config.headers,
      data: config.data,
    });

    return config;
  },
  (error) => {
    // Si une erreur se produit avant même l'envoi de la requête
    console.error('Axios Request Setup Error:', error);
    return Promise.reject(error);
  }
);


// --- Intercepteur de réponse (ta logique existante est bonne) ---
axiosInstance.interceptors.response.use(
  response => {
    console.log('Axios Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  error => {
    console.error('Axios Error:', {
      message: error.message,
      url: error.config?.url,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : 'No response',
    });
    return Promise.reject(error);
  }
);


export default axiosInstance; // Exporter l'instance configurée