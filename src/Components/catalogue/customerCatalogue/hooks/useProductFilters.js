import { useState, useEffect } from 'react';

export const useProductFilters = (initialProducts, username) => {
  const [productsList, setProductsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMediaType, setSelectedMediaType] = useState('all');

  // Initialize products list
  useEffect(() => {
    const filteredProducts = initialProducts.filter(item => item.username === username);
    setProductsList(filteredProducts);
  }, [initialProducts, username]);

  // Filter products based on current criteria
  const getFilteredProducts = () => {
    let filteredItems = [...productsList];
    
    // Filter by category (tangible/intangible)
    if (selectedCategory === 'tangible') {
      filteredItems = filteredItems.filter(item => item.type === 'tangible');
    } else if (selectedCategory === 'intangible') {
      filteredItems = filteredItems.filter(item => item.type === 'intangible');
    }
    
    // Filter by media type
    if (selectedMediaType !== 'all') {
      filteredItems = filteredItems.filter(item => item.mediaType === selectedMediaType);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.price?.toString().includes(query)
      );
    }
    
    return filteredItems;
  };

  return {
    productsList,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedMediaType,
    setSelectedMediaType,
    getFilteredProducts
  };
};