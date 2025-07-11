import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../../../../context/cartContext';

export const useProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { addToCart } = useCart();
  
  // State for product/service details
  const [productDetails, setProductDetails] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  // Sizes and colors (will be conditionally set)
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  
  useEffect(() => {
    // Hide notification after 3 seconds
    let timeoutId;
    if (showNotification) {
      timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showNotification]);
  
  const handleAddToCart = () => {
    addToCart(productDetails);
    setShowNotification(true);
  };
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const handleIsFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const loadProductDetails = (dummyData1, dummyData2) => {
    // Find the product/service in both datasets
    const { productId } = route.params;
    const foundProduct =
      dummyData1.find(item => item.id === productId) ||
      dummyData2.find(item => item.id === productId);
      
    if (foundProduct) {
      setProductDetails(foundProduct);
      
      // Set gallery images
      const galleryImages = [
        foundProduct.video,
        foundProduct.option1,
        foundProduct.option2,
        foundProduct.option1,
        foundProduct.option2,
        foundProduct.option1,
        foundProduct.option2
      ].filter(img => img); // Remove undefined images
      
      // Set sizes and colors for tangible products
      if (foundProduct.type === 'tangible') {
        setSizes(['S', 'M', 'L', 'XL', 'XXL', 'XXXL']);
        setColors([
          { hex: '#D2B48C', name: 'Tan' },
          { hex: '#8B4513', name: 'Brown' },
          { hex: '#DEB887', name: 'Burlywood' },
          { hex: '#CD853F', name: 'Peru' },
          { hex: 'blue', name: 'Blue' },
          { hex: '#000000', name: 'Black' }
        ]);
        setSelectedSize('M');
        setSelectedColor('#8B4513');
      }
      
      return galleryImages;
    }
    
    return [];
  };
  
  return {
    productDetails,
    selectedSize,
    selectedColor,
    isFavorite,
    showNotification,
    sizes,
    colors,
    setSelectedSize,
    setSelectedColor,
    handleAddToCart,
    handleGoBack,
    handleIsFavorite,
    loadProductDetails,
    setShowNotification
  };
};