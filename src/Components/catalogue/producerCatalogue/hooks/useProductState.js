import { useState, useEffect } from 'react';
import { sellingPointsData, deliveryOptionsData } from '../../../../dummyData';

export const useProductState = (catalogPosts) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentFeature, setCurrentFeature] = useState('');
  const [availableSellingPoints, setAvailableSellingPoints] = useState([]);
  const [availableDeliveryOptions, setAvailableDeliveryOptions] = useState([]);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Empty product template
  const emptyProduct = {
    id: null,
    name: '',
    description: '',
    price: '',
    category: '',
    type: '',
    media: null,
    sellingPoints: [],
    deliveryOptions: [],
    availability: 'Not Available',
    isPosted: false,
    unit: 'piece',
    selling_price: {
      options: [
        {
          type: 'basic',
          duration: '',
          price: '',
          quantity_range: {
            min: '',
            max: '',
            price_per_unit: ''
          },
          features: []
        },
        {
          type: 'premium',
          duration: '',
          price: '',
          savings: '',
          quantity_range: {
            min: '',
            max: '',
            price_per_unit: ''
          },
          features: []
        },
        {
          type: 'enterprise',
          duration: 'custom',
          price: '',
          quantity_range: {
            min: '',
            max: '',
            price_per_unit: ''
          },
          features: []
        }
      ]
    }
  };

  const [currentProduct, setCurrentProduct] = useState(emptyProduct);

  // Initialize selling points and delivery options
  useEffect(() => {
    setAvailableSellingPoints(sellingPointsData);
    setAvailableDeliveryOptions(deliveryOptionsData);
  }, []);

  // Get search placeholder based on selected tab
  const getSearchPlaceholder = () => {
    switch (selectedTab) {
      case 'products': return 'Search products...';
      case 'services': return 'Search services...';
      case 'selling_points': return 'Search selling points...';
      case 'delivery': return 'Search delivery options...';
      default: return 'Search all items...';
    }
  };

  // Filter results based on search query and selected tab
  const filterResults = (data) => {
    if (!searchQuery) return data;

    const query = searchQuery.toLowerCase();
    return data.filter(item => {
      switch (selectedTab) {
        case 'products':
        case 'services':
        case 'all':
          return (
              item.title?.toLowerCase().includes(query) ||
              item.description?.toLowerCase().includes(query) ||
              item.price?.toString().includes(query)
          );
        case 'selling_points':
          return (
              item.city?.toLowerCase().includes(query) ||
              item.address?.toLowerCase().includes(query) ||
              item.location?.toLowerCase().includes(query)
          );
        case 'delivery':
          return (
              item.name?.toLowerCase().includes(query) ||
              item.description?.toLowerCase().includes(query) ||
              item.price?.toString().includes(query) ||
              item.type?.toLowerCase().includes(query)
          );
        default:
          return false;
      }
    });
  };

  return {
    selectedTab,
    setSelectedTab,
    searchQuery,
    setSearchQuery,
    isAddProductModalVisible,
    setIsAddProductModalVisible,
    isEditMode,
    setIsEditMode,
    currentProduct,
    setCurrentProduct,
    currentFeature,
    setCurrentFeature,
    availableSellingPoints,
    availableDeliveryOptions,
    isMenuVisible,
    setIsMenuVisible,
    emptyProduct,
    getSearchPlaceholder,
    filterResults
  };
};