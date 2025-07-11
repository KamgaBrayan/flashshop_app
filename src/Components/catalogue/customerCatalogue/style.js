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
    justifyContent: 'left',
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
    color: 'black',
    alignItems: 'center',
    marginLeft: 30,
    
  },
  username: {
    color: '#8B4513',
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
    marginTop: 10,
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

  
  // Modal Styles (Enhancing the existing)
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 20,
    maxHeight: WINDOW_HEIGHT * 0.8,
    
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
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
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent.soft,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
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
    marginTop: 8,
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

  // Navigation par onglets
  tabsContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  tabButtonActive: {
    backgroundColor: '#8B4513',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  tabTextActive: {
    color: '#fff',
  },
  clearButton: {
    padding: 8,
  },
});

export default styles;