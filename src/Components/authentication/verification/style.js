// Ton src/screens/Authentication/VerifyCode/style.js
import { StyleSheet } from 'react-native';
import Platform from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Important pour que le contenu s'étende bien
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    // textAlign: 'center', // Pas nécessaire sur un View
    // justifyContent: 'center', // Pas nécessaire si alignItems: 'center' suffit
    marginBottom: 10, // Réduit pour moins d'espace si le titre est le seul élément
  },
  backButton: {
    // Positionner en haut à gauche si désiré, ou laisser le flux normal
    // position: 'absolute', 
    // top: 10, // ou Platform.OS === 'ios' ? 40 : 20,
    // left: 10,
    padding: 10, // Pour une meilleure zone de clic
    marginTop: Platform.OS === 'ios' ? 20 : 0, // Espace en haut pour iOS
    marginBottom: 10, // Espace avant le header
    alignSelf: 'flex-start', // Pour s'assurer qu'il est à gauche s'il n'est pas en position absolue
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Couleur plus standard pour le titre
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    lineHeight: 20, // Pour l'espacement vertical du texte sur plusieurs lignes
    textAlign: 'center',
    // alignItems: 'center', // Pas nécessaire sur un Text
    // justifyContent: 'center', // Pas nécessaire sur un Text
    paddingHorizontal: 10, // Pour éviter que le texte ne touche les bords
  },
  email: { // Utilisé pour afficher l'email/téléphone où le code a été envoyé
    fontWeight: 'bold',
    color: '#8B4513', // Ta couleur de marque
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 'space-around' peut aussi être bien
    marginBottom: 30,
    width: '90%', // Ou un padding horizontal sur le parent
    alignSelf: 'center',
  },
  codeInput: {
    width: 45, // Ajuste la largeur pour 6 inputs
    height: 55, // Un peu plus haut pour une meilleure saisie
    borderWidth: 1,
    borderColor: '#E0E0E0', // Bordure plus douce
    borderRadius: 8, // Moins arrondi que 30 pour un look plus standard de champ de texte
    fontSize: 22, // Un peu plus petit si la case est plus petite
    textAlign: 'center',
    backgroundColor: '#F9F9F9', // Fond léger
    color: '#333',
  },
  resendText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    lineHeight: 20, // Pour le \n
  },
  resendLink: {
    color: '#8B4513',
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#8B4513',
    borderRadius: 30, // Garder ton arrondi
    paddingVertical: 15, // padding vertical au lieu de padding fixe
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Styles que j'avais suggérés, à fusionner/adapter avec tes styles existants si tu les aimes
  cooldownText: { // Pour "Resend in Xs"
    // Tu peux l'intégrer dans resendText ou le styler différemment
    color: '#888', 
    fontWeight: 'normal', 
  },
  disabledText: { // Style pour le texte du lien de renvoi quand il est désactivé
    opacity: 0.6,
  },
  disabledButton: { // Style pour le bouton Verify quand il est désactivé
    opacity: 0.6,
    elevation: 0, // Pas d'ombre si désactivé
  },
});

export default styles;