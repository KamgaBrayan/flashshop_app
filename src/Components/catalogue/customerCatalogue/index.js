// src/Components/catalogue/customProductCatalogue/index.js
import React from 'react';
import { View, Text, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'; // << NOUVEL IMPORT
import styles from './style';

// Import custom hooks
import { useProductFilters } from './hooks/useProductFilters';
import { useMediaPermissions } from './components/permissions';

// Import components
import SearchBar from './components/SearchBar';
import { CategoryList } from './components/CategoryButton';
import ProductCard from './components/ProductCard';
import EmptyState from './components/EmptyState';
import { dummyData1 } from '../../../dummyData'; // Assure-toi que le chemin est correct

const CustomProductCatalogue = ({ navigation, route }) => {
  const { t } = useTranslation(); // << INITIALISER LE HOOK
  const { username } = route.params || { username: 'User' };
  
  // Media permissions (inchangé)
  const { cameraPermission, mediaLibraryPermission } = useMediaPermissions();
  
  // Product filtering (inchangé)
  const {
    productsList,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedMediaType,
    getFilteredProducts
  } = useProductFilters(dummyData1, username);

  // Définir les catégories avec des textes traduits
  const categories = [
    { id: 'all', name: t('catalogue.category_all'), icon: 'apps' },
    { id: 'tangible', name: t('catalogue.category_products'), icon: 'cube' },
    { id: 'intangible', name: t('catalogue.category_services'), icon: 'briefcase' },
  ];

  // Navigation handlers (inchangé)
  const handleProductDetails = (item) => {
    navigation.navigate('ProductDetails', { 
      productId: item.id,
      product: item 
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {/* Utilisation de l'interpolation pour le nom d'utilisateur */}
          {t('catalogue.headerTitle', { username: '' })}
          <Text style={styles.username}>@{username}</Text>
        </Text>
      </View> 

      {/* Search Bar - on passe `t` en prop */}
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        t={t}
      />

      {/* Categories - on passe `t` en prop si CategoryList en a besoin */}
      <View style={styles.categoriesContainer}>
        <CategoryList 
          categories={categories} // `categories` est déjà traduit
          selectedCategory={selectedCategory}
          onCategoryPress={setSelectedCategory}
        />
      </View>

      {/* Product List */}
      <FlatList
        data={getFilteredProducts()}
        renderItem={({ item }) => (
          // On passe `t` en prop à ProductCard
          <ProductCard item={item} onPress={handleProductDetails} t={t} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        // On passe `t` en prop à EmptyState
        ListEmptyComponent={<EmptyState t={t} />}
      />
    </View>
  );
};

export default CustomProductCatalogue;