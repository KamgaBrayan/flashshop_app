import reqresAuthService from './reqresAuthService';
import authYowyobService from './authService'; // Votre service existant


// Constante pour contrôler quel service utiliser
const USE_MOCK_SERVICE = false; // À mettre à false pour revenir au service original

// Exporter le service approprié
const authService = USE_MOCK_SERVICE ? reqresAuthService : authYowyobService;

export default authService;