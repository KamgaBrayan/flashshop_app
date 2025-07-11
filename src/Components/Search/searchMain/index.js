import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import AppHeader from '../../../reusableComponents/header';

const SearchScreen = () => {

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    'Blue Shirt',
    'CosmicChic Jacket',
    'EnchantedElegance Dress',
    'WhimsyWhirl Top',
    'Fluffernova Coat',
    'MirageMelody Cape',
    'BlossomBreeze Overalls',
    'EnchantedElegance Dress',
  ]);

  const handleClearAll = () => {
    setRecentSearches([]);
  };

  const handleRemoveItem = (index) => {
    const newSearches = [...recentSearches];
    newSearches.splice(index, 1);
    setRecentSearches(newSearches);
  };

  const renderSearchItem = ({ item, index }) => (
    <View style={styles.searchItemContainer}>
      <Text style={styles.searchItemText}>{item}</Text>
      <TouchableOpacity
        onPress={() => handleRemoveItem(index)}
        style={styles.removeButton}
      >
        <Icon name="close-circle" size={20} color="#8E8E93" />
      </TouchableOpacity>
    </View>
  );

  const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  }
  
  return (
    <SafeAreaView style={styles.container}>
      
      <AppHeader title="Search" onGoBack={handleGoBack} />

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#8E8E93"
        />
      </View>

      <View style={styles.recentContainer}>
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recent</Text>
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={recentSearches}
          renderItem={renderSearchItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;