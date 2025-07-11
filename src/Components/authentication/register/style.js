import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 10 : 20, // Espace en haut
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 25,
    position: 'relative', // Pour positionner le bouton d'édition
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55, // Moitié de la largeur/hauteur pour un cercle parfait
    backgroundColor: '#E0E0E0',
    borderWidth: 3,
    borderColor: '#8B4513', // Couleur de ta marque
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    backgroundColor: '#8B4513',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF', // Bordure blanche pour le détacher de l'avatar
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10, // Ajustement pour padding vertical
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  countryCodeInput: {
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 16,
    color: '#666',
    borderRightWidth: 1,
    borderColor: '#D0D0D0',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center', // Pour centrer le texte du Picker sur Android
  },
  picker: {
    height: Platform.OS === 'ios' ? undefined : 50, // Sur iOS, la hauteur est dynamique
    // Sur iOS, tu peux vouloir styler le Picker différemment ou utiliser un composant modal.
    // Pour l'instant, cela donne un style de base.
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 5,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: '#8B4513',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8B4513',
    borderColor: '#7A3D0F', // Un peu plus foncé pour le contraste
  },
  termsText: {
    fontSize: 14,
    color: '#555',
    flex: 1, // Permet au texte de prendre l'espace restant
  },
  termsLink: {
    color: '#8B4513',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  signUpButton: {
    backgroundColor: '#8B4513',
    borderRadius: 30, // Plus arrondi pour un look moderne
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000", // Ombre subtile
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  signUpButtonDisabled: {
    opacity: 0.6,
    elevation: 0, // Pas d'ombre si désactivé
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  signInRedirectContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  signInRedirectText: {
    fontSize: 15,
    color: '#444',
  },
  signInRedirectLink: {
    color: '#8B4513',
    fontWeight: 'bold',
  },
  orDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orDividerText: {
    marginHorizontal: 15,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  socialIcon: {
    width: 30,
    height: 30,
  }
});

export default styles;