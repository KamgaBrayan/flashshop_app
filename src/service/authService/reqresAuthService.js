import axios from 'axios';

const API_URL = 'https://reqres.in/api';
const API_KEY = 'reqres-free-v1';

// Configuration des headers communs pour toutes les requêtes
const headers = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY
};

const reqresAuthService = {
  // Inscription
  register: async (userData) => {
    try {
      console.log('Register attempt with:', userData);
      
      // Reqres.in n'accepte que email et password pour l'inscription
      const reqresData = {
        email: userData.email || userData.username,
        password: userData.password
      };
      
      const response = await axios.post(`${API_URL}/register`, reqresData, { headers });
      console.log('Reqres register response:', response.data);
      
      // Créer un utilisateur complet en combinant les données de la requête et de la réponse
      const user = {
        id: response.data.id || '1',
        username: userData.username || userData.email,
        email: userData.email || userData.username,
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        phone_number: userData.phone_number || '',
        // Ajoutez d'autres champs si nécessaire
      };
      
      return {
        ...user,
        token: response.data.token
      };
    } catch (error) {
      console.error('Reqres register error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  },

  // Connexion
  login: async (credentials) => {
    try {
      console.log('Login attempt with:', credentials);
      
      // Reqres.in utilise email au lieu de username
      const reqresCredentials = {
        email: credentials.username.includes('@') 
               ? credentials.username 
               : 'eve.holt@reqres.in', // Email de test qui fonctionne toujours avec Reqres
        password: credentials.password || 'cityslicka' // Mot de passe qui fonctionne avec Reqres
      };
      
      const response = await axios.post(`${API_URL}/login`, reqresCredentials, { headers });
      console.log('Reqres login response:', response.data);
      
      // Créer un utilisateur simulé car Reqres ne renvoie qu'un token
      const mockUser = {
        id: '4',
        username: credentials.username,
        email: reqresCredentials.email,
        first_name: 'Eve',
        last_name: 'Holt',
        phone_number: '',
        active: true
      };
      
      // Renvoyer dans le format attendu par votre application
      return {
        user: mockUser,
        token: response.data.token
      };
    } catch (error) {
      console.error('Reqres login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  },

  // Déconnexion
  logout: async () => {
    console.log('Mock logout');
    return true;
  },

  // Récupérer l'utilisateur courant
  getCurrentUser: async () => {
    try {
      return null; // Retourne null pour forcer l'utilisateur à se reconnecter
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },
  
  // Mise à jour du profil
  updateProfile: async (profileData) => {
    try {
      console.log('Update profile with:', profileData);
      
      // Simuler une requête à Reqres
      const response = await axios.put(`${API_URL}/users/2`, {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        email: profileData.email
      }, { headers });
      
      console.log('Reqres update response:', response.data);
      
      // Retourner les données combinées
      return {
        ...profileData,
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Update profile error:', error.response?.data || error.message);
      throw new Error('Failed to update profile');
    }
  }
};

export default reqresAuthService;