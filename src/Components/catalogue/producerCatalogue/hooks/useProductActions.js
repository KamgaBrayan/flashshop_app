import { Alert } from 'react-native';

export const useProductActions = (
    productsList,
    setProductsList,
    currentProduct,
    setCurrentProduct,
    setIsAddProductModalVisible,
    setIsEditMode,
    emptyProduct,
    addToCatalog,
    updatePost
) => {
  // Edit a product
  const editProduct = (product) => {
    const getMediaType = (uri) => {
      if (!uri) return 'image';

      if (typeof uri === 'string') {
        const lowerUri = uri.toLowerCase();
        if (lowerUri.includes('.mp4') || lowerUri.includes('.mov') ||
            lowerUri.includes('.avi') || lowerUri.includes('.mkv') ||
            lowerUri.includes('video')) {
          return 'video';
        }
      }
      return 'image';
    };

    const mediaType = getMediaType(product.option1);

    setCurrentProduct({
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock,
      category: product.type === 'tangible' ? 'products' : 'services',
      type: product.type,
      media: product.option1 ? {
        uri: product.option1,
        type: mediaType
      } : null,
      sellingPoints: product.sellingPoints || [],
      deliveryOptions: product.deliveryOptions || [],
      availability: product.availability || 'Not Available',
      isPosted: product.isPosted,
      unit: product.unit || 'piece',
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
    });
    setIsEditMode(true);
    setIsAddProductModalVisible(true);
  };

  // Save product (create new or update existing) - Mise à jour pour utiliser le contexte partagé
  const saveProduct = () => {
    const { name, description, price, category, media, sellingPoints, deliveryOptions, availability } = currentProduct;

    if (!name || !description || !price || !category) {
      Alert.alert('Incomplete Information', 'Please fill all required fields (name, description, price, category)');
      return;
    }

    const productData = {
      title: name,
      description: description,
      price: parseFloat(price),
      type: category === 'products' ? 'tangible' : 'intangible',
      option1: media ? media.uri : null,
      video: media ? media.uri : null,
      sellingPoints: sellingPoints || [],
      deliveryOptions: deliveryOptions || [],
      stock: category === 'products' ? currentProduct.stock : 0,
      availability: category === 'services' ? availability : 'Not Available',
      unit: currentProduct.unit || 'piece',
      rating: 4.8,
      quantity: 0,
      trips: category === 'products' ? 'All sizes' : 'New service',
      username: 'Current User',
      likes: '0',
      comments: '0',
      shares: '0',
      userImage: media ? media.uri : null,
      mediaType: media ? media.type : 'image'
    };

    if (currentProduct.id) {
      // Update existing product
      const updatedProduct = {
        ...productData,
        id: currentProduct.id,
        isPosted: false // Reset posting status when editing
      };
      updatePost(updatedProduct);
    } else {
      // Create new product
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        isPosted: false
      };
      addToCatalog(newProduct);
    }

    resetProductModal();
  };

  // Reset product modal
  const resetProductModal = () => {
    setCurrentProduct(emptyProduct);
    setIsAddProductModalVisible(false);
    setIsEditMode(false);
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsAddProductModalVisible(false);
    setCurrentProduct(emptyProduct);
    setIsEditMode(false);
  };

  return {
    editProduct,
    saveProduct,
    resetProductModal,
    handleCloseModal
  };
};