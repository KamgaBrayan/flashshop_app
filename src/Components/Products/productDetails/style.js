import { StyleSheet } from 'react-native';

// Constants for colors and typography
export const COLORS = {
  primary: '#8B4513',      // Rich brown
  secondary: '#FFE4C4',    // Soft bisque
  background: {
    main: '#FFFFFF',       // Clean white
    light: '#F5F5F5',      // Light background
    accent: '#F8F8F8',     // Slight off-white
  },
  text: {
    dark: '#333333',       // Near black for main text
    medium: '#666666',     // Gray for secondary text
    light: '#999999'       // Light gray for hints
  },
  accent: {
    soft: '#FFE4C4',       // Soft bisque for highlights
    gold: '#FFD700',       // Gold for ratings
    green: '#4CAF50',      // Green for success/savings
    shadow: 'rgba(0,0,0,0.1)', // Subtle shadow
    primaryLight: 'rgba(139, 69, 19, 0.1)', // Light primary
    primaryLighter: 'rgba(139, 69, 19, 0.05)', // Very light primary
  },
  border: '#DDD',          // Border color
  disabled: '#D3D3D3',     // Disabled elements
  success: '#4CAF50',      // Success color
  highlight: '#007BFF',    // Blue highlight
};

const TYPOGRAPHY = {
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  title: 20,
  heading: 24,
};

// Common styles that can be reused
const commonStyles = {
  shadow: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  card: {
    backgroundColor: COLORS.background.main,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 69, 19, 0.1)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
    marginBottom: 16,
  },
};

const styles = StyleSheet.create({
  // Base container
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },

  // Header styles
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.background.main,
    zIndex: 1000,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.xlarge,
    fontWeight: 'bold',
  },

  // Image styles
  mainImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  thumbnailContainer: {
    position: 'absolute',
    top: 350,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  thumbnailListContainer: {
    alignItems: 'center',
  },
  thumbnailImageWrapper: {
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  selectedThumbnail: {
    borderColor: COLORS.primary,
  },
  lastThumbnail: {
    opacity: 0.7,
  },

  // Content containers
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background.light,
  },
  detailsContainer: {
    backgroundColor: COLORS.background.main,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  addToCartContainer: {
    backgroundColor: COLORS.background.main,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },

  // Text styles
  category: {
    fontSize: TYPOGRAPHY.medium,
    color: COLORS.text.medium,
  },
  titleContainer: {
    ...commonStyles.spaceBetween,
    marginTop: 5,
  },
  title: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: 'bold',
  },
  mainTitle: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.large,
    color: COLORS.text.medium,
    marginBottom: 8,
  },
  description: {
    marginTop: 10,
    fontSize: TYPOGRAPHY.medium,
    color: COLORS.text.medium,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.large,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  sectionTitleContent: {
    fontSize: TYPOGRAPHY.xlarge,
    fontWeight: '600',
    marginBottom: 15,
    color: COLORS.text.dark,
  },
  readMore: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  // Rating
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: TYPOGRAPHY.large,
    fontWeight: 'bold',
  },

  // Size selection
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSizeButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  sizeText: {
    fontSize: TYPOGRAPHY.medium,
    fontWeight: 'bold',
  },
  selectedSizeText: {
    color: COLORS.background.main,
  },

  // Color selection
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.background.main,
  },
  selectedColorButton: {
    borderColor: COLORS.primary,
  },

  // Price display
  priceContainer: {
    ...commonStyles.spaceBetween,
    marginTop: 30,
  },
  priceLabel: {
    fontSize: TYPOGRAPHY.xlarge,
    color: COLORS.text.medium,
    fontWeight: 'bold',
  },
  price: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  priceRow: {
    ...commonStyles.spaceBetween,
    marginBottom: 10,
  },
  priceLabelContent: {
    fontSize: TYPOGRAPHY.large,
    color: COLORS.text.medium,
  },
  priceValue: {
    fontSize: TYPOGRAPHY.large,
    fontWeight: '500',
    color: COLORS.text.dark,
  },
  finalPrice: {
    color: COLORS.success,
    fontWeight: '700',
  },

  // Buttons
  addToCartButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  addToCartText: {
    color: COLORS.background.main,
    marginLeft: 8,
    fontSize: TYPOGRAPHY.large,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  sellingPointsButton: {
    backgroundColor: COLORS.accent.soft,
  },
  deliveryButton: {
    backgroundColor: COLORS.accent.soft,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: TYPOGRAPHY.medium,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Navigation menu
  navigationMenu: {
    marginVertical: 8,
  },
  navigationListContainer: {
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  navigationOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.light,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    ...commonStyles.shadow,
  },
  selectedNavigationOption: {
    backgroundColor: COLORS.accent.soft,
    borderColor: COLORS.primary,
  },
  navigationOptionText: {
    fontSize: TYPOGRAPHY.medium,
    color: COLORS.text.medium,
    fontWeight: '500',
  },
  selectedNavigationOptionText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  navigationIcon: {
    marginRight: 6,
  },

  // Price details
  priceDetailsContainer: {
    backgroundColor: COLORS.background.accent,
    padding: 15,
    borderRadius: 10,
  },

  // Delivery and selling points common
  pointContainer: {
    backgroundColor: COLORS.background.accent,
    padding: 15,
    borderRadius: 10,
  },
  point: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pointText: {
    fontSize: 15,
    color: COLORS.text.dark,
    marginLeft: 10,
  },
  pointTitleText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.dark,
  },
  pointSubText: {
    fontSize: 14,
    color: COLORS.text.medium,
    marginTop: 2,
  },

  // Pricing styles
  pricingMainContainer: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  pricingScrollContainer: {
    flex: 1,
  },
  pricingContainer: {
    flex: 1,
    backgroundColor: COLORS.background.main,
    paddingBottom: 24,
  },
  pricingHeader: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background.main,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 69, 19, 0.1)',
  },
  pricingTitle: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  pricingSubtitle: {
    fontSize: TYPOGRAPHY.large,
    color: COLORS.text.medium,
    lineHeight: 22,
  },
  priceListContainer: {
    padding: 16,
  },

  // Price cards
  priceCard: {
    ...commonStyles.card,
    ...commonStyles.shadow,
    marginLeft: 16,
    marginRight: 16,
  },
  selectedPriceCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.accent.primaryLighter,
    transform: [{ scale: 1.02 }],
  },
  priceCardContent: {
    padding: 20,
  },
  priceCardHeader: {
    ...commonStyles.spaceBetween,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 69, 19, 0.1)',
  },
  priceTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceType: {
    fontSize: TYPOGRAPHY.xlarge,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 8,
  },

  // Price display in cards
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  currencySymbol: {
    fontSize: TYPOGRAPHY.large,
    fontWeight: '600',
    color: COLORS.primary,
    marginRight: 2,
  },
  priceValue: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '700',
    color: COLORS.primary,
  },
  priceUnit: {
    fontSize: TYPOGRAPHY.medium,
    color: COLORS.text.medium,
    marginLeft: 4,
  },

  // Detail sections
  detailsSection: {
    marginTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: COLORS.accent.primaryLighter,
    padding: 12,
    borderRadius: 8,
  },
  detailText: {
    fontSize: 15,
    color: COLORS.text.medium,
    marginLeft: 8,
    flex: 1,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 4,
  },
  featureText: {
    fontSize: 14,
    color: COLORS.text.medium,
    marginLeft: 8,
    flex: 1,
  },

  // Savings
  savingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  savingsText: {
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 8,
  },
  selectedIndicator: {
    position: 'absolute',
    top: -12,
    right: -12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  thresholdContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(139, 69, 19, 0.08)',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  thresholdIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 69, 19, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  thresholdContent: {
    flex: 1,
  },
  thresholdTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 4,
  },
  thresholdMessage: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  // Delivery Content Styles
  deliveryContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 20,
  },
  locationListContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  deliveryHeader: {
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  deliveryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.dark,
    marginBottom: 8,
  },
  deliverySubtitle: {
    fontSize: 16,
    color: COLORS.text.medium,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginLeft: 16,
    marginRight: 16,
  },
  selectedLocationCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  locationCardContent: {
    padding: 16,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.dark,
    marginLeft: 12,
  },
  selectedLocationTitle: {
    color: COLORS.primary,
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  costLabel: {
    fontSize: 16,
    color: COLORS.text.medium,
    marginRight: 8,
  },
  costValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.dark,
  },
  negotiableTag: {
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  negotiableText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  detailsContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.background.light,
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.text.medium,
    marginLeft: 8,
    flex: 1,
  },
  townSelector: {
    marginTop: 8,
  },
  townLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text.dark,
    marginBottom: 8,
  },
  townChip: {
    backgroundColor: COLORS.background.light,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedTownChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  townChipText: {
    fontSize: 14,
    color: COLORS.text.dark,
  },
  selectedTownChipText: {
    color: '#FFFFFF',
  },
  contactContainer: {
    marginTop: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.dark,
    marginBottom: 12,
  },
  contactOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.light,
    padding: 12,
    borderRadius: 8,
    minWidth: '45%',
  },
  contactMethodText: {
    fontSize: 14,
    color: COLORS.text.dark,
    marginLeft: 8,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.background.light,
    borderRadius: 8,
  },
  notesText: {
    fontSize: 14,
    color: COLORS.text.medium,
    marginLeft: 8,
    flex: 1,
  },
  generalNotesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  generalNotesText: {
    fontSize: 14,
    color: COLORS.text.dark,
    marginLeft: 12,
    flex: 1,
  },
  // Selling points styles
  sellingPointsContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  headerContainer: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  locationsList: {
    paddingVertical: 8,
  },
  locationCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(139, 69, 19, 0.1)',
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  callButton: {
    padding: 8,
    backgroundColor: 'rgba(139, 69, 19, 0.1)',
    borderRadius: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  addressText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  hoursText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  featuresContainer: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 69, 19, 0.05)',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  noteText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    flex: 1,
  },


    paymentMethodsContainer: {
      marginTop: 20,
    },
    paymentButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginBottom: 15,
      borderRadius: 8,
      backgroundColor: COLORS.light,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    paymentMethodText: {
      fontSize: 16,
      color: COLORS.text.dark,
      marginLeft: 10,
    },

      contentContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
      },
      sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
      },
      paymentMethodsContainer: {
        marginBottom: 30,
      },
      paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
      },
      selectedPaymentMethod: {
        borderColor: '#007bff',
        backgroundColor: '#e3f2fd',
      },
      paymentMethodText: {
        marginLeft: 15,
        fontSize: 19,
        color: '#333',
        fontWeight: 'bold',
      },
      paymentButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      paymentButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },

    // Quantity Selection

    quantityButton: {
      width: 48, // Augmenté
      height: 48, // Augmenté
      backgroundColor: '#8B4513', // Marron
      borderRadius: 24, // La moitié de la largeur/hauteur pour un cercle parfait
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 2, // Ajoute une ombre sur Android
      shadowColor: '#000', // Ajoute une ombre sur iOS
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },

    buttonDisabled: {
      backgroundColor: '#D3D3D3',
      opacity: 0.7,
    },

    quantityButtonText: {
      color: '#FFFFFF', // Blanc
      fontSize: 24, // Plus grand
      fontWeight: 'bold',
    },

    quantityInput: {
      width: 60,
      height: 48, // Même hauteur que les boutons
      borderWidth: 1,
      borderColor: '#8B4513',
      borderRadius: 8,
      marginHorizontal: 16,
      fontSize: 18,
      textAlign: 'center',
      color: '#8B4513',
    },

    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 16,
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: '#E5E5E5',
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#666',
    },
    totalAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#8B4513',
    },

});



export default styles;