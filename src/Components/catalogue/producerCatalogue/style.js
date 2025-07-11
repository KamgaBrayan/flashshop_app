import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

const COLORS = {
  primary: '#8B4513',      // Rich brown
  background: '#FFFFFF',   // Clean white
  text: {
    dark: '#333333',       // Near black for main text
    medium: '#666666',     // Gray for secondary text
    light: '#999999'       // Light gray for hints
  },
  accent: {
    soft: '#FFE4C4',       // Soft bisque for highlights
    gold: '#FFD700',       // Gold for ratings
    shadow: 'rgba(0,0,0,0.1)' // Subtle shadow
  }
};

const TYPOGRAPHY = {
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  title: 20
};

const styles = StyleSheet.create({
  // Base Container
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    paddingBottom: 10,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent.shadow,

  },
  headerTitle: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.primary,

  },

  // Search Container
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: COLORS.accent.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10
  },
  searchIcon: {
    marginRight: 8,
    color: COLORS.text.light,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: TYPOGRAPHY.medium,
    color: COLORS.text.dark,
  },

  // Category Styles
  categoriesContainer: {
    marginVertical: 8,
  },

  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: COLORS.accent.soft,
    borderColor: COLORS.primary,
  },
  categoryText: {
    marginLeft: 8,
    color: COLORS.text.medium,
    fontSize: TYPOGRAPHY.medium,
  },
  categoryTextActive: {
    color: COLORS.primary,
    fontWeight: '500',
  },

  // Product Card Styles
  productCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 15,
    margin: 8,
    shadowColor: COLORS.accent.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.25,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: TYPOGRAPHY.large,
    fontWeight: 'bold',
    color: COLORS.text.dark,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: TYPOGRAPHY.medium,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    color: COLORS.text.medium,
  },
  stock: {
    marginLeft: 8,
    color: COLORS.text.medium,
  },
  duration: {
    marginLeft: 8,
    color: COLORS.text.medium,
  },
  productDescription: {
    fontSize: TYPOGRAPHY.medium,
    color: COLORS.text.medium,
    lineHeight: 20,
  },

  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: COLORS.text.dark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  // Camera Styles
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  cameraButton: {
    padding: 15,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  // Filter Container
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeFilterButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    color: COLORS.text.medium,
    fontWeight: '500',
  },

  // Modal Styles (Enhancing the existing)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.74)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'white',
    padding: 16,

  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 20,
    maxHeight: WINDOW_HEIGHT * 0.8,

  },

  modalScrollContent: {
    flex: 1,
    padding: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: TYPOGRAPHY.medium,
    color: COLORS.text.dark,
  },
  mediaSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  selectedMedia: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.3,
    borderRadius: 10,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 50,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 8,
  },
  saveButtonText: {
    color: COLORS.background,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: TYPOGRAPHY.medium,

  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    borderRadius: 10,
    marginLeft: 8,
  },
  cancelButtonText: {
    color: COLORS.text.dark,
    textAlign: 'center',
    fontSize: TYPOGRAPHY.medium,
  },

  // Empty State
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: TYPOGRAPHY.large,
    color: COLORS.text.medium,
  },

  // Enhanced Category Container for Modal
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10,
  },
  categoryButtonM: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 100,
    shadowColor: COLORS.accent.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    transition: 'all 0.3s ease',
  },
  selectedCategoryM: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowOpacity: 0.3,
  },
  categoryButtonTextM: {
    color: COLORS.text.medium,
    fontSize: TYPOGRAPHY.medium,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedCategoryTextM: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  categoryIconM: {
    marginRight: 8,
    opacity: 0.6,
  },
  selectedCategoryIcon: {
    opacity: 1,
    color: COLORS.background,
  },
  postButton: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    },
    postButtonText: {
        color: COLORS.background,
        fontWeight: 'bold',
        fontSize: TYPOGRAPHY.medium,
    },

  // TabView Styles
  tabBar: {
    backgroundColor: COLORS.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent.shadow,
  },
  tabContent: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.background,
  },
  tabHeaderTitle: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  tabSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tabSearchIcon: {
    marginRight: 8,
  },
  tabSearchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  tabFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent.shadow,
  },
  tabFilterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  tabActiveFilterButton: {
    backgroundColor: COLORS.primary,
  },
  tabFilterButtonText: {
    color: COLORS.text.medium,
    fontSize: 14,
  },
  tabCategoriesContainer: {
    marginVertical: 8,
  },
  tabCategoriesList: {
    paddingHorizontal: 16,
  },
  tabCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  tabCategoryButtonActive: {
    backgroundColor: COLORS.accent.soft,
  },
  tabCategoryText: {
    marginLeft: 8,
    color: COLORS.text.medium,
    fontSize: 14,
  },
  tabCategoryTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Selling Points and Delivery Options
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sellingPointsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  deliveryOptionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sellingPointItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    minWidth: 150,
  },
  deliveryOptionItem: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    minWidth: 150,
  },
  selectedItem: {
    backgroundColor: '#FFE4C4',
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 4,
  },
  itemAddress: {
    fontSize: 12,
    color: '#666',
  },
  itemPrice: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  availabilityContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#8B4513',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8B4513',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#8B4513',
  },
  radioLabel: {
    fontSize: 16,
    color: '#666',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  availability: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },

  // Pricing Options
  pricingSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  pricingSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  pricingOption: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 10,
  },
  featuresContainer: {
    marginTop: 15,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
  },
  removeFeatureButton: {
    padding: 5,
  },
  addFeatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  featureInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  addFeatureButton: {
    padding: 5,
  },

  // Unit Selection
  unitSelection: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  unitButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 10,
  },
  unitButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedUnit: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },
  unitButtonText: {
    color: '#666',
    fontSize: 14,
  },
  selectedUnitText: {
    color: '#fff',
  },

  // Product Pricing
  quantityRangeContainer: {
    marginBottom: 15,
  },
  rangeInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  halfInput: {
    flex: 1,
  },

  // Type Selection
  typeSelection: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 10,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },
  typeButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedTypeText: {
    color: '#fff',
  },

  // Header styles
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  menuButton: {
    padding: 5,
  },

  // Menu styles
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    marginTop: 60,
    marginRight: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 10,
    minWidth: 150,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },

  videoContainer: {
    position: 'relative',
    width: '100%',
    height: 200, // ou WINDOW_HEIGHT * 0.25
  },

  videoPlayButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  videoIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 2,
  },

  // Styles pour la prévisualisation de média dans le modal
  mediaPreviewContainer: {
    position: 'relative',
    marginBottom: 16,
  },

  mediaTypeIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  mediaTypeText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },

  // Améliorations des styles de la caméra pour l'interface TikTok
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

  cameraBottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  modeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    marginBottom: 30,
    padding: 4,
  },

  modeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
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
  },

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
  },

  recordingCaptureButton: {
    borderColor: 'red',
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
    backgroundColor: 'red',
  },

  // Styles pour les boutons de sélection de média
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE4C4', // COLORS.accent.soft
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },

  mediaButtonText: {
    color: '#8B4513', // COLORS.primary
    fontSize: 14,
    fontWeight: '500',
  },

});

export default styles;