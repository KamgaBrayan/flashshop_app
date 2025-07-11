// notificationService.js
import { Alert, Platform } from 'react-native'; // Ajout de Alert

// Types de notification possibles
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

// Configuration des couleurs par type de notification
export const NOTIFICATION_COLORS = {
  [NOTIFICATION_TYPES.SUCCESS]: '#4CAF50', // Vert
  [NOTIFICATION_TYPES.ERROR]: '#F44336',   // Rouge
  [NOTIFICATION_TYPES.INFO]: '#2196F3',    // Bleu
  [NOTIFICATION_TYPES.WARNING]: '#FF9800'  // Orange
};

// Stockage des fonctions d'affichage de notifications
let notificationHandler = null;

/**
 * Initialise le gestionnaire de notifications.
 * Doit être appelé une fois au niveau racine de l'application avec la fonction qui affiche le composant UI de notification.
 * @param {Function} handler - Fonction qui affiche les notifications (ex: une fonction qui met à jour l'état d'un composant Toast)
 */
export const initNotifications = (handler) => {
  if (typeof handler !== 'function') {
    console.error('Notification handler must be a function.');
    return;
  }
  notificationHandler = handler;
  console.log('Notification handler initialized.');
};

/**
 * Affiche une notification.
 * Si le gestionnaire personnalisé n'est pas initialisé, utilise Alert.alert en fallback.
 * @param {string} message - Message à afficher
 * @param {string} type - Type de notification (success, error, info, warning)
 * @param {number} duration - Durée d'affichage en ms (optionnel, pour le handler personnalisé)
 * @param {string} title - Titre pour Alert.alert (optionnel)
 */
export const showNotification = (
  message,
  type = NOTIFICATION_TYPES.INFO,
  duration = 3000,
  title = 'Notification' // Titre par défaut pour Alert
) => {
  if (notificationHandler) {
    const color = NOTIFICATION_COLORS[type] || NOTIFICATION_COLORS.info;
    notificationHandler({
      message,
      type,
      color,
      duration
    });
  } else {
    // Fallback à Alert si le handler n'est pas prêt
    console.warn('Notification handler not initialized. Falling back to Alert.alert for:', message);
    let alertTitle = title;
    if (type === NOTIFICATION_TYPES.ERROR) alertTitle = 'Erreur';
    if (type === NOTIFICATION_TYPES.SUCCESS) alertTitle = 'Succès';
    // Pour Alert, la durée n'est pas gérée, c'est une action utilisateur
    Alert.alert(alertTitle, message); 
  }
};

/**
 * Affiche une notification de succès.
 * @param {string} message - Message à afficher
 * @param {number} duration - Durée d'affichage en ms (optionnel)
 */
export const showSuccess = (message, duration) => {
  showNotification(message, NOTIFICATION_TYPES.SUCCESS, duration, 'Succès');
};

/**
 * Affiche une notification d'erreur.
 * @param {string} message - Message à afficher
 * @param {number} duration - Durée d'affichage en ms (optionnel)
 */
export const showError = (message, duration) => {
  showNotification(message, NOTIFICATION_TYPES.ERROR, duration, 'Erreur');
};

/**
 * Affiche une notification d'information.
 * @param {string} message - Message à afficher
 * @param {number} duration - Durée d'affichage en ms (optionnel)
 */
export const showInfo = (message, duration) => {
  showNotification(message, NOTIFICATION_TYPES.INFO, duration, 'Information');
};

/**
 * Affiche une notification d'avertissement.
 * @param {string} message - Message à afficher
 * @param {number} duration - Durée d'affichage en ms (optionnel)
 */
export const showWarning = (message, duration) => {
  showNotification(message, NOTIFICATION_TYPES.WARNING, duration, 'Avertissement');
};

// Export groupé pour une importation plus facile
const notificationService = {
  initNotifications,
  showNotification,
  showSuccess,
  showError,
  showInfo,
  showWarning,
  NOTIFICATION_TYPES,
  NOTIFICATION_COLORS
};

export default notificationService;