import { useState, useRef, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useProductImages = (initialImages = []) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState(initialImages);
  const flatListRef = useRef(null);
  const { width } = Dimensions.get('window');
  
  // Cette référence nous aide à éviter les mises à jour en boucle
  const isManualScrollRef = useRef(false);

  // Assure que l'index reste synchronisé avec le défilement manuel
  const handleScroll = (event) => {
    if (isManualScrollRef.current) return;
    
    const slideWidth = width;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / slideWidth);
    
    if (index !== currentImageIndex) {
      setCurrentImageIndex(index);
    }
  };

  // Garantit que la sélection d'une vignette déclenche le bon comportement
  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
    isManualScrollRef.current = true;
    
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: index * width,
        animated: true
      });
    }
    
    // Réinitialise notre flag après l'animation
    setTimeout(() => {
      isManualScrollRef.current = false;
    }, 500);
  };

  // Assure que quand de nouvelles images sont définies, nous restions sur l'image actuelle
  useEffect(() => {
    if (images.length > 0 && flatListRef.current && currentImageIndex > 0) {
      flatListRef.current.scrollToOffset({
        offset: currentImageIndex * width,
        animated: false
      });
    }
  }, [images, width]);

  const setProductImages = (productImages) => {
    const filteredImages = productImages.filter(img => img);
    setImages(filteredImages);
    setCurrentImageIndex(0);
    
    // Assure que la liste défile vers la première image
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        offset: 0,
        animated: false
      });
    }
  };

  return {
    currentImageIndex,
    images,
    flatListRef,
    width,
    handleImageSelect,
    handleScroll,
    setProductImages
  };
};