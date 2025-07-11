// src/Components/catalogue/customProductCatalogue/components/SearchBar.js
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style';

// On passe `t` en prop
const SearchBar = ({ searchQuery, setSearchQuery, selectedCategory, t }) => {
  
  // Fonction pour obtenir le placeholder traduit
  const getPlaceholder = () => {
    if (selectedCategory === 'tangible') {
      return t('catalogue.search_products');
    }
    if (selectedCategory === 'intangible') {
      return t('catalogue.search_services');
    }
    return t('catalogue.search_items');
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder={getPlaceholder()}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery !== '' && (
        <TouchableOpacity
          onPress={() => setSearchQuery('')}
          style={styles.clearButton}
        >
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;