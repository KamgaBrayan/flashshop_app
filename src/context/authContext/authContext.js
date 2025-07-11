import React, { createContext, useState, useContext, useEffect } from 'react';
import authYowyobService from '../../service/authService'; // Renommé pour clarté, c'est ton service Yowyob
import googleAuthService from '../../service/authService/googleAuthService';
import secureStorage from '../../service/authService/secureStorage';
import snappyApiService from '../../service/snappyApiService/snappyApiService'; // Service pour l'API Snappy
import notificationService from '../../service/notificationService'; // Service de notification

// Créer le contexte
export const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => useContext(AuthContext);

// Provider du contexte
export const AuthProvider = ({ children }) => {
  // États pour l'authentification Yowyob
  const [user, setUser] = useState(null); // Utilisateur Yowyob
  const [token, setToken] = useState(null); // Token Yowyob

  // États pour l'authentification Snappy
  const [snappyUser, setSnappyUser] = useState(null); // Données utilisateur Snappy (peut inclure ID Snappy)
  const [snappyToken, setSnappyToken] = useState(null); // Token JWT Snappy

  // États globaux
  const [loading, setLoading] = useState(true); // Chargement initial et opérations en cours
  const [authError, setAuthError] = useState(null); // Pour stocker une erreur d'authentification globale si nécessaire

  // << NOUVEL ÉTAT POUR L'ORGANISATION >>
  const [organization, setOrganization] = useState(null);
  const [isProducer, setIsProducer] = useState(false);
  const [loadingOrganization, setLoadingOrganization] = useState(false);

  // << NOUVELLE FONCTION POUR CHARGER L'ORGANISATION >>
  const loadUserOrganization = async () => {
    setLoadingOrganization(true);
    try {
      const orgs = await organizationApiService.getMyOrganizations();
      if (orgs && orgs.length > 0) {
        // On prend la première organisation par défaut.
        // Tu pourrais avoir une logique plus complexe si un utilisateur peut avoir plusieurs organisations.
        setOrganization(orgs[0]);
        setIsProducer(true);
        console.log('AuthContext: User organization loaded:', orgs[0].id);
      } else {
        setOrganization(null);
        setIsProducer(false);
        console.log('AuthContext: User has no organization.');
      }
    } catch (error) {
      // Échec silencieux, l'utilisateur n'est simplement pas un producteur.
      setOrganization(null);
      setIsProducer(false);
      console.log("AuthContext: Could not load user organization.");
    } finally {
      setLoadingOrganization(false);
    }
  };
  
  
  // Vérifier si l'utilisateur est déjà connecté au chargement de l'app
  useEffect(() => {
    const loadAuthData = async () => {
      setLoading(true);
      try {
        // Charger la session Yowyob
        const storedYowyobToken = await secureStorage.getToken();
        const storedYowyobUser = await secureStorage.getUser();
        
        if (storedYowyobToken && storedYowyobUser) {
          setToken(storedYowyobToken);
          setUser(storedYowyobUser);
          console.log('AuthContext: Yowyob session loaded from storage.');

          await loadUserOrganization();

          // Charger la session Snappy
          // ################################################################################
          /*
          const storedSnappyToken = await secureStorage.getSnappyToken();
          const storedSnappyUserId = await secureStorage.getSnappyUserId();

          if (storedSnappyToken && storedSnappyUserId) {
            setSnappyToken(storedSnappyToken);
            setSnappyUser({ id: storedSnappyUserId }); // Objet minimal, peut être enrichi plus tard
            console.log('AuthContext: Snappy session loaded from storage.');
          } else {
            console.log('AuthContext: No Snappy session found in storage.');
            // Optionnel: Tenter une ré-authentification Snappy ici si `storedYowyobUser` et `storedYowyobToken` existent
            // mais cela nécessiterait le mot de passe, ce qui n'est pas stocké.
            // L'authentification Snappy se fera lors du prochain login ou action pertinente.
          }
          */
        // #################################################################################################
        } else {
          console.log('AuthContext: No Yowyob session found in storage.');
        }
      } catch (err) {
        console.error("AuthContext: Error loading auth data from storage:", err);
        notificationService.showError('Error loading session. Please try logging in again.');
        await secureStorage.clearAll(); // Nettoyer en cas d'erreur critique
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // Fonction d'inscription (Yowyob + liaison/création Snappy)
  const register = async (newUserData) => { // newUserData: { firstName, lastName, username, email, password, phoneNumber }
    setLoading(true);
    setAuthError(null);
    try {
      // 1. Inscription Yowyob
      notificationService.showInfo('Creating your main account...');
      const yowyobApiResponse = await authYowyobService.register(newUserData);
      const yowyobRegisteredUser = yowyobApiResponse.data || yowyobApiResponse; // Adapte selon la réponse réelle
      
      if (!yowyobRegisteredUser || !yowyobRegisteredUser.id) {
          throw new Error("Yowyob registration did not return a user ID.");
      }
      console.log('AuthContext: Yowyob registration successful for user:', yowyobRegisteredUser.email);
      notificationService.showInfo('Yowyob account part created...');


      // 2. Création explicite de l'utilisateur dans Snappy
      // 'login' pour Snappy sera le username ou email de Yowyob.
      // 'secret' pour Snappy sera le mot de passe Yowyob.
      notificationService.showInfo('Setting up your chat account...');
      const snappyLoginId = newUserData.username || newUserData.email;
      
      console.log(`AuthContext: Attempting to create Snappy user for Yowyob ID: ${yowyobRegisteredUser.id}, Snappy login: ${snappyLoginId}`);
      // Cet appel nécessite que `snappyApiService.createUserInSnappy` soit autorisé.
      // Le token utilisé par snappyAxiosInstance pour cet appel est crucial.
      // Si snappyAxiosInstance n'a pas encore de token Snappy valide, cet appel échouera si /users/create est protégé.
      // SCÉNARIO IDÉAL : /users/create est accessible avec un token "application" ou "admin" configuré
      // dans snappyAxiosInstance pour certains appels, OU il est publiquement accessible pour la création
      // si des contrôles stricts sont en place (peu probable pour /users/create sans authentification).
      // AUTRE SCÉNARIO : Le token obtenu d'une authentification d'un "super-utilisateur" ou "service" est utilisé ici.
      
      // Si l'appel à createUserInSnappy est protégé par le token de l'utilisateur lui-même,
      // alors il faut d'abord s'authentifier avec Snappy (ce qui est étrange si l'utilisateur n'existe pas).
      // C'est pourquoi le flux exact de création d'utilisateur Snappy doit être 100% clair.

      // Supposons pour l'instant que createUserInSnappy peut être appelé.
      
      // ####################################################################################
      /*
      const createdSnappyUser = await snappyApiService.createUserInSnappy({
          yowyobUserId: yowyobRegisteredUser.id,
          displayName: `${newUserData.first_name} ${newUserData.last_name}`,
          login: snappyLoginId,
          secret: newUserData.password, // Le même mot de passe
          email: newUserData.email,
          phoneNumber: newUserData.phone_number,
          // projectId est géré par défaut dans snappyApiService
      });

      if (!createdSnappyUser || !createdSnappyUser.id) {
          
          console.warn('AuthContext: Snappy user creation/retrieval did not return expected user object. User might exist or creation failed silently.');
          // Optionnel: tenter de s'authentifier quand même si on suspecte que l'utilisateur existe.
      }
      console.log('AuthContext: Snappy user creation/linking successful:', createdSnappyUser);
      notificationService.showInfo('Snappy account part created...');
      */
      // ####################################################################################

      // 3. Authentification auprès de Snappy avec les credentials fraîchement créés/utilisés
      // pour obtenir et stocker le token JWT Snappy de l'utilisateur.
      // Cet appel stockera le token Snappy et l'ID Snappy dans secureStorage.
      // ####################################################################################
      /*
      console.log(`AuthContext: Attempting Snappy authentication for login: ${snappyLoginId} after creation/linking.`);
      const snappyAuthData = await snappyApiService.authenticateAndStoreSnappyData(
        snappyLoginId,
        newUserData.password
      );
      */
      // ####################################################################################
      // À ce stade, le token Snappy est stocké. On pourrait mettre snappyUser et snappyToken dans l'état
      // mais comme on redirige vers SignIn, ce n'est pas strictement nécessaire ici.
      // setSnappyUser(snappyAuthData);
      // const currentSnappyToken = await secureStorage.getSnappyToken();
      // setSnappyToken(currentSnappyToken);
      console.log('AuthContext: Initial Snappy authentication successful for new user.');


      // 4. Succès global et redirection
      notificationService.showSuccess('Account fully registered! Please sign in to continue.');
      return { success: true, yowyobUser: yowyobRegisteredUser /*, snappyUser: createdSnappyUser*/ }; 
    } catch (err) {
      console.error('AuthContext: Full registration process error:', err);
      const errorMessage = 
          err.response?.data?.errors?.email || // Erreur Yowyob
          err.response?.data?.errors?.username || // Erreur Yowyob ou Snappy
          (err.response?.data?.errors && typeof err.response.data.errors === 'object' ? Object.values(err.response.data.errors).join(', ') : null) || // Autres erreurs structurées
          err.response?.data?.message || // Message d'erreur générique de l'API
          err.message || // Message d'erreur JS
          'An unknown registration error occurred.';

          throw err;
      
      setAuthError(errorMessage);
      notificationService.showError(errorMessage); 
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de connexion (Yowyob + Snappy)
  const login = async (credentials) => {
    setLoading(true);
    setAuthError(null);
    try {
      // 1. Connexion Yowyob
      notificationService.showInfo('Logging into your account...');
      const yowyobLoginResponse = await authYowyobService.login(credentials);
      if (!yowyobLoginResponse.user || !yowyobLoginResponse.token) {
        throw new Error('Yowyob login failed: Invalid response structure.');
      }
      
      setUser(yowyobLoginResponse.user);
      setToken(yowyobLoginResponse.token);
      await secureStorage.saveUser(yowyobLoginResponse.user);
      await secureStorage.saveToken(yowyobLoginResponse.token);
      console.log('AuthContext: Yowyob login successful for user:', yowyobLoginResponse.user.email);

      // 2. Authentification Snappy
      // #######################################################################################
      /*
      const snappyLoginId = credentials.username; // Ou credentials.email si c'est ce que Snappy utilise pour 'login'
      const snappyAuthData = await snappyApiService.authenticateAndStoreSnappyData(
        snappyLoginId,
        credentials.password
      );
      
      if (snappyAuthData && snappyAuthData.id) {
        console.log(`AuthContext: VALIDATION - Storing Snappy User ID: ${snappyAuthData.id}`);
        setSnappyUser(snappyAuthData);
        const currentSnappyToken = await secureStorage.getSnappyToken();
        setSnappyToken(currentSnappyToken);
        console.log('AuthContext: Snappy authentication successful.');
      } else {
          console.error("AuthContext: VALIDATION FAILED - Snappy auth data is invalid or missing ID.", snappyAuthData);
          // Gérer cette erreur - peut-être ne pas considérer l'utilisateur comme authentifié
          throw new Error("Failed to retrieve a valid user ID from Snappy.");
      }
      */
      // #######################################################################################################
      
      await loadUserOrganization();

      notificationService.showSuccess(`Welcome back, ${yowyobLoginResponse.user.first_name || yowyobLoginResponse.user.username}!`);
      return { success: true }; // Indiquer le succès
    } catch (err) {
      console.error('AuthContext: Login process error:', err);
      const errorMessage = err.response?.data?.message || 
                           err.response?.data?.error || // Pourrait venir de Reqres si le service mock est actif
                           err.message || 
                           'An unknown login error occurred.';
      
      await secureStorage.clearAll(); // Nettoyer en cas d'échec
      setUser(null);
      setToken(null);
      setSnappyUser(null);
      setSnappyToken(null);
      setAuthError(errorMessage);
      throw err; // Propager pour que le composant UI puisse afficher la notification spécifique
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (googleAccessToken) => {
    setLoading(true);
    setAuthError(null);
    try {
      // 1. Obtenir les infos Google
      notificationService.showInfo('Fetching your Google profile...');
      const userInfo = await googleAuthService.getUserInfo(googleAccessToken);
      if (!userInfo?.email) throw new Error("Could not retrieve email from Google profile.");
      console.log("AuthContext: Google user info received:", userInfo);

      // 2. Préparer les données pour ton système
      // Le mot de passe doit être fort et unique pour cet utilisateur Google.
      const googleBasedPassword = `${userInfo.sub}_${'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'}`;
      // L'username doit être unique. Combiner le nom et une partie de l'ID Google est une bonne stratégie.
      const uniqueUsername = (userInfo.given_name || 'user') + `_${userInfo.sub.slice(-5)}`;

      // 3. Tenter de se connecter (implique que l'utilisateur existe déjà)
      try {
        notificationService.showInfo('Verifying existing account...');
        // On tente de se connecter avec le username qu'on aurait généré à l'inscription et le mot de passe spécial.
        // Si l'utilisateur s'est inscrit avec un autre username, cela échouera.
        // Un meilleur identifiant pour la connexion serait l'email, si Yowyob le permet.
        // Pour cet exemple, on suppose que l'username est l'identifiant de connexion.
        // Si l'utilisateur s'est inscrit manuellement, puis essaie de se connecter avec Google, il faut une logique de liaison de comptes.
        // Pour l'instant, on se concentre sur "s'inscrire/se connecter uniquement via Google".
        await login({ username: uniqueUsername, password: googleBasedPassword });
        notificationService.showSuccess(`Welcome back, ${userInfo.given_name}!`);

      } catch (error) {
        // 4. Si la connexion échoue (utilisateur non trouvé), on l'inscrit.
        const isUserNotFoundError = error.response?.status === 400 || error.response?.data?.message?.includes("User not found") || error.message.includes("User not found");
        
        if (isUserNotFoundError || error.response?.status === 404) { // 404 est aussi une possibilité pour "not found"
            console.log("AuthContext: User not found with Google credentials. Proceeding to register.");
            notificationService.showInfo('Creating a new account for you...');

            // Inscrire l'utilisateur sur Yowyob + Snappy
            const newUserData = {
                email: userInfo.email,
                username: uniqueUsername,
                first_name: userInfo.given_name || '',
                last_name: userInfo.family_name || '',
                password: googleBasedPassword,
                phone_number: '', // Pas de numéro de téléphone via Google
                authorities: [] // Assure-toi que c'est correct pour Yowyob
            };

            // Utiliser la fonction `register` du contexte, mais elle est conçue pour le flux OTP.
            // Le flux d'inscription directe pour Google doit être différent.
            // On appelle donc les services directement.
            
            // a. Yowyob Register
            const yowyobRegisteredUser = await authYowyobService.register(newUserData);
            if (!yowyobRegisteredUser || !yowyobRegisteredUser.id) throw new Error("Google Sign-Up: Yowyob registration failed.");

            // b. Snappy Create & Auth
            // On suppose ici que le flux create -> auth est correct.
            await snappyApiService.createUserInSnappy({
                yowyobUserId: yowyobRegisteredUser.id,
                displayName: `${newUserData.first_name} ${newUserData.last_name}`,
                login: newUserData.username,
                secret: newUserData.password,
                email: newUserData.email,
            });
            await snappyApiService.authenticateAndStoreSnappyData(newUserData.username, newUserData.password);

            // c. Mettre à jour l'état du contexte pour connecter l'utilisateur immédiatement
            const yowyobToken = await secureStorage.getToken(); // Le token Yowyob n'est pas retourné par register, on doit l'obtenir via un login
            // Le plus simple est d'appeler `login` maintenant.
            await login({ username: newUserData.username, password: newUserData.password });
            
            notificationService.showSuccess(`Welcome, ${userInfo.given_name}! Your account has been created.`);

        } else {
          // Une autre erreur de connexion s'est produite (ex: serveur down), on ne veut pas créer un compte.
          throw error;
        }
      }
    } catch (err) {
      console.error("AuthContext: loginWithGoogle process error:", err);
      notificationService.showError(err.message || 'An error occurred during Google Sign-In.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    setLoading(true);
    setAuthError(null);
    try {
      // Optionnel: appeler un endpoint de déconnexion serveur pour Yowyob si existant
      await authYowyobService.logout(); 
      // Optionnel: appeler un endpoint de déconnexion serveur pour Snappy si existant (non vu dans la doc)
    } catch (err) {
      console.warn("AuthContext: Error during server-side logout (proceeding with local cleanup):", err.message);
    } finally {
      await secureStorage.clearAll();
      setUser(null);
      setToken(null);
      setSnappyUser(null);
      setSnappyToken(null);
      setOrganization(null); 
      setIsProducer(false);
      setLoading(false);
      notificationService.showInfo('You have been successfully logged out.');
      console.log('AuthContext: User logged out, all sessions cleared.');
    }
  };

  // Fonction pour mettre à jour le profil utilisateur (Yowyob pour l'instant)
  const updateProfile = async (profileData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const yowyobUpdatedUserResponse = await authYowyobService.updateProfile(profileData);
      // Supposons que authYowyobService.updateProfile retourne l'utilisateur mis à jour
      // ou que profileData contient toutes les nouvelles infos.
      const updatedUser = { ...user, ...yowyobUpdatedUserResponse }; // Ou juste { ...user, ...profileData }
      setUser(updatedUser);
      await secureStorage.saveUser(updatedUser);
      
      // TODO: Si nécessaire, appeler un endpoint pour mettre à jour le profil Snappy
      // (par exemple, si displayName, avatar, etc. changent)
      // if (snappyUser) {
      //   await snappyApiService.updateSnappyUserProfile({ snappyUserId: snappyUser.id, ...profileData });
      // }
      
      notificationService.showSuccess('Profile updated successfully!');
      return updatedUser;
    } catch (err) {
      console.error('AuthContext: Update profile error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update profile.';
      setAuthError(errorMessage);
      notificationService.showError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Valeur du contexte
  const value = {
    user,           // Yowyob user object
    token,          // Yowyob JWT
    snappyUser,     // Snappy user object (ou au moins { id: snappyUserId })
    snappyToken,    // Snappy JWT
    loading,
    authError,      // Erreur d'authentification globale (peut être affichée par un composant global)
    register,
    login,
    loginWithGoogle,
    logout,
    updateProfile,
    isAuthenticated: !!user && !!token, // Authentifié avec Yowyob
    isSnappyAuthenticated: !!snappyUser && !!snappyToken, // Authentifié avec Snappy
    organization,
    isProducer,
    loadingOrganization,
    loadUserOrganization,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
