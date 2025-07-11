import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },

  camera: {
    flex: 1,
  },

  // Message de permission
  message: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  permissionButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },

  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Progress bar en haut
  progressBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    zIndex: 10,
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#ff3040',
  },

  // Header de la caméra
  cameraHeader: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  rightControls: {
    flexDirection: 'row',
    gap: 10,
  },

  // Indicateur d'enregistrement
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,0,0,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginRight: 6,
  },

  recordingTime: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Contrôles latéraux (style TikTok)
  sideControls: {
    position: 'absolute',
    right: 15,
    top: '40%',
    alignItems: 'center',
    gap: 25,
    zIndex: 10,
  },

  sideButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  sideButtonText: {
    color: 'white',
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },

  // Contrôles du bas
  cameraBottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 20,
  },

  // Sélecteur de durée
  durationSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 4,
    gap: 4,
  },

  durationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  activeDurationButton: {
    backgroundColor: 'white',
  },

  durationText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },

  activeDurationText: {
    color: 'black',
    fontWeight: 'bold',
  },

  // Contrôles principaux
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },

  // Bouton galerie
  galleryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  galleryButtonText: {
    color: 'white',
    fontSize: 10,
    marginTop: 2,
  },

  // Bouton de capture
  captureButtonContainer: {
    alignItems: 'center',
  },

  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  recordingCaptureButton: {
    borderColor: '#ff3040',
    backgroundColor: 'rgba(255,48,64,0.1)',
  },

  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },

  recordingCaptureButtonInner: {
    width: 30,
    height: 30,
    borderRadius: 4,
    backgroundColor: '#ff3040',
  },

  // Bouton effets
  effectsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },

  effectsButtonText: {
    color: 'white',
    fontSize: 10,
    marginTop: 2,
  },

  // Sélecteur de mode
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    padding: 4,
    gap: 4,
  },

  modeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },

  activeModeButton: {
    backgroundColor: 'white',
  },

  modeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },

  activeModeText: {
    color: 'black',
    fontWeight: 'bold',
  },

  // Animation pour les boutons
  buttonPressed: {
    transform: [{ scale: 0.95 }],
  },

  // Overlay pour les modes spéciaux
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;