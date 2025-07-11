import axios from 'axios';

// Constantes de configuration
const API_KEY = '3qUkt_O1YcClmouM6_-W-dZ5bWdx13uf';
const BASE_URL = `https://gateway.yowyob.com/payment-service/${API_KEY}`;

// États possibles d'une transaction
export const TRANSACTION_STATUS = {
  CREATED: 'CREATED',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

// Méthodes de paiement disponibles
export const PAYMENT_METHODS = {
  MOBILE: 'MOBILE',
  CARD: 'CARD',
  BANK: 'BANK'
};

// Devises supportées
export const SUPPORTED_CURRENCIES = ['XAF', 'EUR', 'USD'];

// Messages d'erreur par code HTTP
const ERROR_MESSAGES = {
  400: "Paramètres de paiement invalides. Veuillez vérifier vos informations.",
  401: "Erreur d'authentification. Veuillez réessayer plus tard.",
  404: "Transaction introuvable.",
  500: "Le service de paiement est actuellement indisponible. Veuillez réessayer plus tard."
};

/**
 * Valide un numéro de téléphone (format Cameroun/Afrique)
 * @param {string} phone - Numéro à valider
 * @returns {boolean} - Validité du numéro
 */
const validatePhoneNumber = (phone) => {
  if (!phone) return false;
  
  // Format international: 237XXXXXXXXX
  const internationalRegex = /^237[6-9]\d{8}$/;
  
  // Format local: 6XXXXXXXX
  const localRegex = /^[6-9]\d{8}$/;
  
  return internationalRegex.test(phone) || localRegex.test(phone);
};

/**
 * Formate un numéro de téléphone au format international
 * @param {string} phone - Numéro à formater
 * @returns {string} - Numéro formaté
 */
const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Si déjà au format international, renvoyer tel quel
  if (phone.startsWith('+')) return phone.replace('+', '');
  
  // Sinon, ajouter l'indicatif du Cameroun
  if (phone.length === 9 && /^[6-9]/.test(phone)) {
    return `237${phone}`;
  }
  
  // Si format inconnu, renvoyer tel quel
  return phone;
};

/**
 * Valide les données de paiement avant envoi à l'API
 * @param {Object} data - Données à valider
 * @throws {Error} - Erreur si les données sont invalides
 */
const validatePaymentData = (data) => {
  const requiredFields = [
    'transaction_amount',
    'transaction_currency',
    'transaction_method',
    'payer_phone_number',
    'payer_name'
  ];
  
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Champs manquants: ${missingFields.join(', ')}`);
  }
  
  if (isNaN(Number(data.transaction_amount)) || Number(data.transaction_amount) <= 0) {
    throw new Error("Le montant de la transaction doit être un nombre positif");
  }
  
  if (!SUPPORTED_CURRENCIES.includes(data.transaction_currency)) {
    throw new Error(`Devise non supportée. Devises acceptées: ${SUPPORTED_CURRENCIES.join(', ')}`);
  }
  
  if (!Object.values(PAYMENT_METHODS).includes(data.transaction_method)) {
    throw new Error(`Méthode de paiement invalide. Options disponibles: ${Object.values(PAYMENT_METHODS).join(', ')}`);
  }
  
  if (!validatePhoneNumber(data.payer_phone_number)) {
    throw new Error("Format de numéro de téléphone invalide");
  }
};

/**
 * Demande un paiement
 * @param {Object} paymentData - Données du paiement
 * @returns {Promise<Object>} - Réponse de l'API
 */
export const requestPayment = async (paymentData) => {
  try {
    // Validation des données obligatoires
    validatePaymentData(paymentData);
    
    const response = await axios.post(`${BASE_URL}/payin`, paymentData, {
      headers: { 'Content-Type': 'application/json' },
    });
    
    // Vérifier si la réponse contient des données
    if (!response.data || !response.data.data) {
      throw new Error("Réponse de l'API incorrecte");
    }
    
    return {
      success: true,
      data: response.data.data,
      message: response.data.message
    };
  } catch (error) {
    console.error('Erreur lors de la demande de paiement:', error);
    console.error('Détails:', error.response?.data || error.message);
    
    // Gestion spécifique selon le code d'erreur HTTP
    const statusCode = error.response?.status;
    const errorMessage = ERROR_MESSAGES[statusCode] || error.response?.data?.message || "Échec de la demande de paiement";
    
    return {
      success: false,
      data: null,
      statusCode: statusCode,
      message: errorMessage,
      errors: error.response?.data?.errors || { general: error.message }
    };
  }
};

/**
 * Vérifie le statut d'un paiement
 * @param {string} transactionCode - Code unique de la transaction
 * @returns {Promise<Object>} - Statut de la transaction
 */
export const checkPaymentStatus = async (transactionCode) => {
  try {
    if (!transactionCode) {
      throw new Error("Code de transaction requis");
    }
    
    const response = await axios.get(`${BASE_URL}/transactions/${transactionCode}/status`);
    
    // Vérifier si la réponse contient des données
    if (!response.data || !response.data.data) {
      throw new Error("Réponse de l'API incorrecte");
    }
    
    return {
      success: true,
      data: response.data.data,
      message: response.data.message
    };
  } catch (error) {
    console.error("Erreur lors de la vérification du statut du paiement:", error);
    console.error('Détails:', error.response?.data || error.message);
    
    // Gestion spécifique selon le code d'erreur HTTP
    const statusCode = error.response?.status;
    const errorMessage = ERROR_MESSAGES[statusCode] || error.response?.data?.message || "Échec de la vérification du statut";
    
    return {
      success: false,
      data: null,
      statusCode: statusCode,
      message: errorMessage,
      errors: error.response?.data?.errors || { general: error.message }
    };
  }
};

/**
 * Surveille périodiquement le statut d'une transaction jusqu'à ce qu'elle soit terminée
 * @param {string} transactionCode - Code de la transaction à surveiller
 * @param {Function} onStatusChange - Fonction de callback appelée à chaque changement de statut
 * @param {number} intervalMs - Intervalle entre les vérifications en millisecondes (défaut: 5000ms)
 * @param {number} maxAttempts - Nombre maximum de tentatives (défaut: 30)
 * @returns {Promise<Object>} - Dernière réponse de statut
 */
export const pollPaymentStatus = async (
  transactionCode, 
  onStatusChange, 
  intervalMs = 5000, 
  maxAttempts = 30
) => {
  if (!transactionCode) {
    throw new Error("Code de transaction requis pour le polling");
  }

  let attempts = 0;
  let lastStatus = null;
  let timerId = null;

  // Promise pour gérer le résultat final
  return new Promise((resolve, reject) => {
    const checkStatus = async () => {
      try {
        attempts++;
        const response = await checkPaymentStatus(transactionCode);
        
        if (!response.success) {
          throw new Error(response.message);
        }
        
        const currentStatus = response.data.status;
        
        // Notifier du changement de statut si nécessaire
        if (currentStatus !== lastStatus) {
          lastStatus = currentStatus;
          if (typeof onStatusChange === 'function') {
            onStatusChange(response.data);
          }
        }
        
        // Vérifier si le paiement est dans un état final
        if (
          currentStatus === TRANSACTION_STATUS.COMPLETED ||
          currentStatus === TRANSACTION_STATUS.FAILED ||
          currentStatus === TRANSACTION_STATUS.CANCELLED ||
          currentStatus === TRANSACTION_STATUS.EXPIRED
        ) {
          clearTimeout(timerId);
          resolve({
            success: true,
            finalStatus: currentStatus,
            data: response.data
          });
          return;
        }
        
        // Vérifier si on a atteint le nombre maximum de tentatives
        if (attempts >= maxAttempts) {
          clearTimeout(timerId);
          resolve({
            success: false,
            finalStatus: currentStatus,
            data: response.data,
            message: "Durée maximale de vérification atteinte"
          });
          return;
        }
        
        // Programmer la prochaine vérification
        timerId = setTimeout(checkStatus, intervalMs);
        
      } catch (error) {
        console.error("Erreur lors du polling de statut:", error);
        clearTimeout(timerId);
        reject(error);
      }
    };
    
    // Démarrer la vérification
    checkStatus();
  });
};

/**
 * Crée une demande de paiement mobile money (MTN, Orange Money)
 * @param {Object} paymentInfo - Informations sur le paiement
 * @returns {Promise<Object>} - Résultat de la demande
 */
export const requestMobilePayment = async ({
  amount,
  phoneNumber,
  customerName,
  serviceReference,
  serviceName,
  serviceDescription,
  email,
  paymentMethod = "MOBILE",
  currency = "XAF"
}) => {
  // Vérifier les champs requis
  if (!amount || !phoneNumber || !customerName) {
    return {
      success: false,
      data: null,
      message: "Champs obligatoires manquants: montant, numéro de téléphone ou nom du client"
    };
  }

  // Valider le numéro de téléphone
  if (!validatePhoneNumber(phoneNumber)) {
    return {
      success: false,
      data: null,
      message: "Format de numéro de téléphone invalide. Utilisez le format: +237XXXXXXXXX ou 6XXXXXXXX"
    };
  }
  
  // Valider la méthode de paiement
  if (!Object.values(PAYMENT_METHODS).includes(paymentMethod)) {
    return {
      success: false,
      data: null,
      message: `Méthode de paiement invalide. Options disponibles: ${Object.values(PAYMENT_METHODS).join(', ')}`
    };
  }
  
  // Valider la devise
  if (!SUPPORTED_CURRENCIES.includes(currency)) {
    return {
      success: false,
      data: null,
      message: `Devise non supportée. Devises acceptées: ${SUPPORTED_CURRENCIES.join(', ')}`
    };
  }

  // Formatage du montant au format numérique
  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return {
      success: false,
      data: null,
      message: "Le montant doit être un nombre positif"
    };
  }

  // Générer une référence unique pour cette transaction
  const txRef = `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
  const paymentData = {
    transaction_amount: numericAmount, // Utiliser le montant dynamique
    transaction_currency: currency,
    transaction_method: paymentMethod,
    transaction_reference: txRef,
    payer_reference: phoneNumber,
    payer_name: customerName,
    payer_phone_number: formatPhoneNumber(phoneNumber),
    payer_lang: "fr",
    payer_email: email || "",
    service_reference: serviceReference || txRef,
    service_name: serviceName || "Achat",
    service_description: serviceDescription || "Paiement",
    service_quantity: 1
  };
  
  return requestPayment(paymentData);
};

/**
 * Obtient un message utilisateur en fonction du statut de transaction
 * @param {string} status - Statut de la transaction
 * @returns {Object} - Message et type (pour affichage UI)
 */
export const getStatusMessage = (status) => {
  switch (status) {
    case TRANSACTION_STATUS.CREATED:
      return { 
        message: "Votre paiement a été créé. Veuillez suivre les instructions pour le compléter.", 
        type: "info" 
      };
    case TRANSACTION_STATUS.PENDING:
      return { 
        message: "Votre paiement est en cours de traitement. Merci de patienter.", 
        type: "warning" 
      };
    case TRANSACTION_STATUS.COMPLETED:
      return { 
        message: "Paiement effectué avec succès! Merci pour votre achat.", 
        type: "success" 
      };
    case TRANSACTION_STATUS.FAILED:
      return { 
        message: "Le paiement a échoué. Veuillez réessayer ou choisir une autre méthode de paiement.", 
        type: "error" 
      };
    case TRANSACTION_STATUS.CANCELLED:
      return { 
        message: "Le paiement a été annulé.", 
        type: "info" 
      };
    case TRANSACTION_STATUS.EXPIRED:
      return { 
        message: "Le délai de paiement a expiré. Veuillez faire une nouvelle demande.", 
        type: "error" 
      };
    default:
      return { 
        message: "Statut de paiement inconnu.", 
        type: "warning" 
      };
  }
};

export default {
  requestPayment,
  checkPaymentStatus,
  requestMobilePayment,
  pollPaymentStatus,
  getStatusMessage,
  TRANSACTION_STATUS,
  PAYMENT_METHODS,
  SUPPORTED_CURRENCIES
};