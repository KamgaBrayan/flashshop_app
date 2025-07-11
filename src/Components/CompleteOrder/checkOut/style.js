// styles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionOrder: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
  },
  changeButton: {
    color: '#8B4513',
    fontSize: 14,
    fontWeight: '600',
  },
  address: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  addressDetail: {
    fontSize: 14,
    color: '#666',
  },
  shippingType: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  deliveryDate: {
    fontSize: 14,
    color: '#666',
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    marginLeft: 3,
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  productSize: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B4513',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  priceCurrency: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 3,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  totalCurrency: {
    fontSize: 14,
    color: '#e74c3c',
    marginLeft: 3,
  },
  continueButton: {
    backgroundColor: '#8B4513',
    margin: 16,
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});