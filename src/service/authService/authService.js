import axios from '../../utils/axiosConfig'; // Assurez-vous que ce chemin est correct
import secureStorage from './secureStorage';

// URL de base pour l'auth-service
const AUTH_SERVICE_BASE_URL = 'https://gateway.yowyob.com/auth-service';

// Informations pour l'authentification OAuth2 Client Credentials de l'application
const OAUTH_TOKEN_URL = `${AUTH_SERVICE_BASE_URL}/oauth/token`;
const CLIENT_ID = 'test-client';
const CLIENT_SECRET = 'secret';

// Variable pour mettre en cache le token d'application (optionnel, mais recommandé pour la performance)
let appClientToken = null;
let appClientTokenExpiry = null;

// Fonction pour obtenir le token d'application OAuth2 (Client Credentials)
const getAppClientToken = async () => {
  // Si on a un token valide en cache, on le retourne
  if (appClientToken && appClientTokenExpiry && appClientTokenExpiry > Date.now()) {
    return appClientToken;
  }

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);
    // Scopes optionnels, si l'API les requiert pour client_credentials.
    // D'après la doc, on peut sélectionner read/write.
    // Pour register/login, des scopes ne sont généralement pas nécessaires au niveau client_credentials,
    // mais on peut les ajouter si l'API l'exige. Exemple: params.append('scope', 'read write');
    params.append('scope', 'read write');

    const response = await axios.post(OAUTH_TOKEN_URL, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json' // Ou '*/*' si l'API le préfère
      }
    });

    console.log('App client token received:', response.data);
    appClientToken = response.data.access_token;
    // Mettre en cache pour la durée de vie du token moins une marge (ex: 5 minutes)
    // response.data.expires_in est en secondes
    appClientTokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;
    
    return appClientToken;
  } catch (error) {
    console.error('Error fetching app client token:', error.response?.data || error.message);
    // Réinitialiser le token en cas d'erreur pour forcer une nouvelle tentative
    appClientToken = null; 
    appClientTokenExpiry = null;
    throw new Error('Could not obtain application client token');
  }
};


const authYowyobService = {
  register: async (userData) => {
    try {
      const appToken = await getAppClientToken();

      const formattedUserData = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        first_name: userData.first_name || userData.name?.split(' ')[0] || '',
        last_name: userData.last_name || userData.name?.split(' ')[1] || '',
        phone_number: userData.phone_number || '',
        authorities: [] // Ou [] comme dans l'exemple cURL
      };

      console.log('Données d\'inscription formatées:', formattedUserData);
      
      // Utilisation du préfixe /api/ comme vu dans la doc Swagger
      const response = await axios.post(`${AUTH_SERVICE_BASE_URL}/api/register`, formattedUserData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
          'Authorization': `Bearer ${appToken}` // Token d'application OAuth2
        }
      });
      
      console.log('Réponse d\'inscription:', response.data);
      // L'API Yowyob pour register renvoie directement les données de l'utilisateur créé
      return response.data; 
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const appToken = await getAppClientToken();
      console.log('Tentative de connexion avec:', credentials);
      
      // Utilisation du préfixe /api/
      const response = await axios.post(`${AUTH_SERVICE_PREFIX}/api/login`, credentials, {
        headers: {
          // On définit MANUELLEMENT le token d'application
          'Authorization': `Bearer ${appToken}` 
        }
      });
      
      console.log('Réponse de connexion Yowyob:', response.data);

      // Adapter à la structure de réponse de Yowyob (doc page 6)
      // { access_token: { token: "JWT_USER", ... }, user: { ... } }
      if (response.data && response.data.access_token && response.data.user) {
        return {
          token: response.data.access_token.token, // Le JWT de l'utilisateur
          user: response.data.user                 // Les informations de l'utilisateur
        };
      } else {
        console.error('Login response format unexpected:', response.data);
        throw new Error('Unexpected login response format from Yowyob API');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: async () => {
    // Si votre API a un endpoint de déconnexion (par exemple pour invalider le token côté serveur),
    // vous pouvez l'appeler ici. Sinon, la suppression locale du token suffit.
    // Pour l'instant, on suppose qu'il n'y a pas d'endpoint serveur.
    appClientToken = null; // Invalider le token d'application en cache au logout
    appClientTokenExpiry = null;
    return true;
  },

  getCurrentUser: async () => {
    try {
      // Pas besoin de définir le header Authorization ici, l'intercepteur le fera pour nous !
      const response = await axios.get(`${AUTH_SERVICE_PREFIX}/api/user`);
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error.response?.data || error.message);
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token invalide ou expiré, effacer
        await secureStorage.clearAll();
      }
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      // Pas besoin de définir le header Authorization, l'intercepteur le fera.
      const response = await axios.put(`${AUTH_SERVICE_PREFIX}/api/update-profile`, profileData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default authYowyobService;