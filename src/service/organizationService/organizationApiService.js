// src/service/api/organizationApiService.js
import axios from '../../utils/axiosConfig'; // On réutilise l'instance Axios principale
import notificationService, { showNotification } from '../notificationService';

// L'URL de base est déjà dans axiosConfig, on spécifie juste le préfixe du service
const API_PREFIX = '/organization-service';

// Fonctions clés que nous allons implémenter
const organizationApiService = {
  /**
   * Récupère la ou les organisations de l'utilisateur connecté.
   * C'est la fonction la plus importante pour commencer.
   */
  getMyOrganizations: async () => {
    try {
      console.log("OrganizationAPI: Fetching user's organizations...");
      // Pas besoin de header Authorization, l'intercepteur l'ajoute !
      const response = await axios.get(`${API_PREFIX}/organizations/user`);
      return response.data;
    } catch (error) {
      console.warn("OrganizationAPI: Error fetching my organizations:", error.response?.data || error.message);
      notificationService.showError("OrganizationAPI is not available: Error fetching my organizations:")
      // Ne pas notifier l'utilisateur ici, car c'est un chargement en arrière-plan.
      // Le composant qui appelle gérera l'affichage de l'erreur si c'est nécessaire.
      throw error;
    }
  },

  /**
   * Récupère la liste de tous les domaines d'activité disponibles.
   */
  getBusinessDomains: async () => {
    try {
      // On demande une grande page pour essayer d'obtenir tous les domaines en une fois.
      // Note: les API paginées sont souvent 0-indexées pour la page.
      const response = await axios.get(`${API_PREFIX}/business-domains`, {
        params: { page: 0, size: 200 } 
      });

      // --- CORRECTION CLÉ ---
      // La réponse paginée contient généralement le tableau dans une clé 'content' ou 'data'.
      // Si la structure est différente, ajuste `response.data.content` en conséquence.
      // `console.log(response.data)` t'aidera à voir la structure exacte.
      if (response.data && Array.isArray(response.data.content)) {
        return response.data.content;
      }
      
      // Fallback si la structure est un tableau direct (moins probable)
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      // Si aucune donnée n'est trouvée dans un format attendu
      return [];

    } catch (error) {
      console.log("OrganizationAPI: Error fetching business domains:", error);
      notificationService.showError("Could not load business domains.");
      throw error;
    }
  },

  /**
   * Récupère la liste de toutes les formes légales disponibles.
   */
  getLegalForms: async () => {
    console.log("OrganizationAPI: Using mock data for getLegalForms.");
    // Simuler un léger délai réseau
    await new Promise(resolve => setTimeout(resolve, 100));

    // C'est une excellente approche pragmatique.
    // On retourne des données exemples avec une structure `id` et `name`.
    // L'ID est généralement un UUID, mais des chaînes simples suffisent pour le test.
    const mockLegalForms = [
      { id: 'SARL', name: 'Limited Liability Company (SARL)' },
      { id: 'SA', name: 'Public Limited Company (SA)' },
      { id: 'INDIVIDUAL', name: 'Individual / Sole Proprietorship' },
      { id: 'GIE', name: 'Economic Interest Group (GIE)' },
    ];
    
    return Promise.resolve(mockLegalForms);
  },

  /**
   * Crée le profil commercial de l'utilisateur.
   * @param {object} actorData - Données du formulaire (nom, email, etc.)
   */
  createBusinessActor: async (actorData) => {
    try {
      notificationService.showInfo("Creating your business profile...");
      // Pas besoin de header Authorization, l'intercepteur l'ajoute !
      const response = await axios.post(`${API_PREFIX}/business-actors`, actorData);
      notificationService.showSuccess("Business profile created!");
      return response.data;
    } catch (error) {
      console.warn("OrganizationAPI: Error creating business actor:", error.response?.data || error.message);
      notificationService.showError(error.response?.data?.message || "Failed to create business profile.");
      throw error;
    }
  },

  /**
   * Crée une organisation après la création du Business Actor.
   * @param {object} orgData - Données de l'organisation
   */
  createOrganization: async (orgData) => {
    try {
      notificationService.showInfo("Creating your organization...");
      const response = await axios.post(`${API_PREFIX}/organizations`, orgData);
      notificationService.showSuccess("Organization created!");
      return response.data; // Retourne l'Organisation créée
    } catch (error) {
      console.warn("OrganizationAPI: Error creating organization:", error.response?.data || error.message);
      notificationService.showError(error.response?.data?.message || "OrganizationAPI is not available : Failed to create organization.");
      throw error;
    }
  },

  /**
   * Lie un utilisateur à une organisation en tant qu'employé.
   * C'est ce qui formalise le rôle de "producteur".
   * @param {string} organizationId 
   * @param {object} employeeData - { businessActorId, userId, role, tenantId }
   */
  addEmployeeToOrganization: async (organizationId, employeeData) => {
    try {
      notificationService.showInfo("Finalizing setup...");
      const response = await axios.post(`${API_PREFIX}/organizations/${organizationId}/employees`, employeeData);
      return response.data;
    } catch (error) {
      console.warn("OrganizationAPI: Error adding employee:", error.response?.data || error.message);
      notificationService.showError(error.response?.data?.message || "OrganizationAPI is not available : Failed to link your profile to the organization.");
      throw error;
    }
  },
};

export default organizationApiService;