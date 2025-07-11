import axios from 'axios';
import secureStorage from '../service/authService/secureStorage'; // Chemin corrigé potentiellement

// URL de base pour l'API REST de Snappy (y compris /auth et /users, /chat)
const SNAPPY_BASE_URL = 'http://88.198.150.195:8613';


const snappyAxiosInstance = axios.create({
  baseURL: SNAPPY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*' // D'après la doc Snappy (page 4, HEADERS pour /auth/user)
  }
});

// Intercepteur pour ajouter le token d'authentification Snappy JWT
snappyAxiosInstance.interceptors.request.use(
  async (config) => {
    // Exclure les chemins d'authentification de l'ajout automatique du token
    const authPaths = ['/auth/user', '/auth/organization'];
    if (!authPaths.includes(config.url)) {
      const snappyToken = await secureStorage.getSnappyToken();
      if (snappyToken) {
        config.headers.Authorization = `Bearer ${snappyToken}`;
      } else {
        // Gérer le cas où le token est manquant pour une route protégée ?
        // Pour l'instant, l'API retournera 401/403 que nous intercepterons plus tard.
        console.warn(`Snappy token not found for protected route: ${config.url}`);
      }
    }
    
    console.log('Snappy Axios Request:', {
      url: config.baseURL + config.url, // URL complète
      method: config.method,
      headers: JSON.parse(JSON.stringify(config.headers)), // Clonage pour éviter les références circulaires dans les logs
      data: config.data,
      params: config.params
    });
    return config;
  },
  (error) => {
    // console.error('Snappy Axios Request Setup Error:', error); // Peut être verbeux
    return Promise.reject(error);
  }
);

snappyAxiosInstance.interceptors.response.use(
  (response) => {
    console.log('Snappy Axios Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  async (error) => {
    console.error('Snappy Axios Error:', {
      message: error.message,
      url: error.config?.url,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : 'No response object',
    });

    // Gestion d'un token expiré ou invalide (401 Unauthorized ou 403 Forbidden)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const authPaths = ['/auth/user', '/auth/organization'];
      // Ne pas essayer de rafraîchir ou de déconnecter si l'erreur vient d'un appel d'authentification lui-même
      if (error.config && !authPaths.includes(error.config.url)) {
        console.log('Snappy token might be invalid/expired. Clearing Snappy token.');
        await secureStorage.removeSnappyToken();
        await secureStorage.removeSnappyUserId();
        // Ici, tu pourrais vouloir déclencher une déconnexion globale ou une redirection vers la page de connexion
        // pour que l'utilisateur se réauthentifie auprès de Snappy.
        // Cela dépendra de comment tu veux gérer la session Snappy.
        // Par exemple, via un événement ou en mettant à jour un état dans AuthContext.
      }
    }
    return Promise.reject(error);
  }
);

export default snappyAxiosInstance;