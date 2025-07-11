import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Calculate responsive sizes
const scale = SCREEN_WIDTH / 375; // Use iPhone 8 as base size
const normalize = (size) => Math.round(scale * size);

// Platform-specific constants
const IS_IOS = Platform.OS === 'ios';
const STATUS_BAR_HEIGHT = Platform.select({
  ios: IS_IOS && (SCREEN_HEIGHT >= 812 || SCREEN_WIDTH >= 812) ? 44 : 20,
  android: StatusBar.currentHeight,
});

const TOP_HEADER_HEIGHT = normalize(50);
const HEADER_HEIGHT = STATUS_BAR_HEIGHT + TOP_HEADER_HEIGHT;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topNav: {
    position: 'absolute',
    top: Platform.select({
      ios: IS_IOS && (SCREEN_HEIGHT >= 812 || SCREEN_WIDTH >= 812) ? 44 : 20,
      android: StatusBar.currentHeight,
    }),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    zIndex: 100,
    height: normalize(44),
    backgroundColor: 'transparent',
  },
  navButton: {
    backgroundColor: 'transparent',
    borderRadius: normalize(20),
    height: normalize(40),
    width: normalize(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: normalize(40),
  },
  navButtonIcon: {
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: normalize(1), height: normalize(1) },
    textShadowRadius: normalize(3),
  },
  headerTitle: {
    color: '#FFF',
    fontSize: normalize(17),
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerTitleUsername: {
    color: '#FFF',
    fontSize: normalize(17),
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  postContainer: {
    width: SCREEN_WIDTH,
    height: Platform.select({
      ios: IS_IOS && SCREEN_HEIGHT >= 812 ? SCREEN_HEIGHT - 90 : SCREEN_HEIGHT - 60,
      android: SCREEN_HEIGHT,
    }),
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  imageContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  postVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  rightActions: {
    position: 'absolute',
    right: normalize(12),
    bottom: normalize(120),
    alignItems: 'center',
    width: normalize(60),
    zIndex: 3,
  },
  actionButton: {
    alignItems: 'center',
    marginVertical: normalize(10),
    justifyContent: 'center',
    width: '100%',
    marginBottom: normalize(20),
  },
  actionText: {
    color: '#FFF',
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginTop: normalize(1),
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  profileImage: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(25),
    borderWidth: normalize(2),
    borderColor: '#FFF',
  },
  followButton: {
    position: 'absolute',
    bottom: normalize(-10),
    left: normalize(-10),
    backgroundColor: '#FFF',
    borderRadius: normalize(12),
    padding: normalize(2),
  },
  followButtonProfile: {
    position: 'absolute',
    bottom: normalize(-10),
    backgroundColor: '#FFF',
    borderRadius: normalize(12),
    padding: normalize(2),
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    padding: normalize(16),
    paddingBottom: normalize(40),
    zIndex: 2,
  },
  userInfo: {
    marginBottom: normalize(16),
  },
  username: {
    color: '#8B4513',
    fontSize: normalize(20),
    fontWeight: 'bold',
    marginBottom: normalize(4),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: normalize(8),
  },
  rating: {
    color: '#FFF',
    marginLeft: normalize(4),
    marginRight: normalize(8),
    fontWeight: 'bold',
    fontSize: normalize(20),
  },
  trips: {
    color: '#FFF',
    opacity: 0.8,
    fontSize: normalize(20),
    fontWeight: 'bold',
    marginRight: normalize(8),
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceType: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(4),
    borderRadius: normalize(16),
  },
  serviceTypeText: {
    color: '#FFF',
    fontSize: normalize(16),
    fontWeight: '500',
  },
  price: {
    color: '#8B4513',
    fontSize: normalize(20),
    fontWeight: 'bold',
    backgroundColor: 'white',
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(4),
    borderRadius: normalize(16),
  },
  bottomTabs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: normalize(4),
    paddingBottom: normalize(8),
    backgroundColor: '#FFF',
  },
  tabButton: {
    alignItems: 'center',
    color: '#8B4513'
  },
  tabText: {
    color: '#8B4513',
    fontSize: normalize(10),
    marginTop: normalize(1),
  },
  tabTextInactive: {
    color: '#8B4513',
  },
  cartBadge: {
    position: 'absolute',
    right: normalize(-6),
    top: normalize(-6),
    backgroundColor: 'green',
    borderRadius: normalize(10),
    width: normalize(20),
    height: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: normalize(2),
    borderColor: '#FFF',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: normalize(12),
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: normalize(1),
    width: '75%',
  },
  description: {
    color: '#FFF',
    fontSize: normalize(15),
    lineHeight: normalize(20),
  },
  descriptionText: {
    color: '#FFF',
    fontSize: normalize(17),
    lineHeight: normalize(20),
  },
  seeMoreButton: {
    marginTop: normalize(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: normalize(16),
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  expandedDescription: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: normalize(16),
    paddingBottom: normalize(90),
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
  },
  expandedDescriptionContent: {
    color: '#FFF',
    fontSize: normalize(15),
    lineHeight: normalize(22),
  },
  closeButton: {
    position: 'absolute',
    top: normalize(-10),
    right: normalize(12),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: normalize(20),
    padding: normalize(8),
  },
  descriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(12),
  },
  descriptionTitle: {
    color: '#FFF',
    fontSize: normalize(18),
    fontWeight: 'bold',
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: normalize(30),
    left: 0,
    right: 0,
    zIndex: 100,
    padding: normalize(16),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(8),
  },
  appName: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  userNameContainer: {
    marginTop: normalize(4),
    alignItems: 'center',
  },
  userNameBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(16),
    borderRadius: normalize(20),
    minWidth: normalize(150),
  },
  currentUserName: {
    fontSize: normalize(18),
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  logoImage: {
    width: normalize(150),
    height: normalize(70),
    resizeMode: 'cover',
    borderRadius: normalize(10),
  },

  // Style pour l'indicateur vidéo catalogue - Petit rectangle penché en bas à droite comme TikTok
  videoIndicatorCatalog: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 2,
    transform: [{ rotate: '15deg' }], // Petit rectangle penché vers la droite
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Style pour le container vidéo dans le catalogue (SANS bouton play)
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },

  // Overlay transparent pour double tap uniquement
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 4,
  },

  // Indicateur vidéo (simple, en haut à gauche)
  videoIndicator: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },

  videoIndicatorText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
    fontWeight: 'bold',
  },

  // Indicateur de son (en haut à droite)
  soundIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    padding: 8,
    zIndex: 2,
  },

  // Style pour le buffer/loading (simple)
  bufferingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -15 },
      { translateY: -15 }
    ],
    zIndex: 5,
  },

  // Spinner de chargement simple
  loadingSpinner: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFF',
    borderTopColor: 'transparent',
  },

  // Animation du coeur pour le like
  heartAnimation: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [
      { translateX: -30 },
      { translateY: -30 }
    ],
    zIndex: 15,
  },

  // Style pour l'icône de coeur animée
  heartIcon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default styles;