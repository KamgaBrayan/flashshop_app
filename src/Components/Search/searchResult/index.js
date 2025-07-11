// index.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  FlatList,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

const SearchScreenResult = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('Jacket');
  const [favorites, setFavorites] = useState(new Set());

  const products = [
    {
      id: '1',
      name: 'Brown Jacket',
      price: 83.97,
      rating: 4.9,
      image: require('../../../../assets/products/novel/cyber.jpg')
    },
    {
      id: '2',
      name: 'Brown Suite',
      price: 120.00,
      rating: 5.0,
      image: require('../../../../assets/products/novel/cyber.jpg')
    },
    {
      id: '3',
      name: 'Brown Jacket',
      price: 83.97,
      rating: 4.9,
      image: require('../../../../assets/products/novel/cyber.jpg')
    },
    {
      id: '4',
      name: 'Yellow Shirt',
      price: 120.00,
      rating: 5.0,
      image: require('../../../../assets/products/novel/cyber.jpg')
    },
    {
      id: '5',
      name: 'Beige Jacket',
      price: 95.00,
      rating: 4.8,
      image: require('../../../../assets/products/novel/cyber.jpg')
    },
    {
      id: '6',
      name: 'Light Jacket',
      price: 89.99,
      rating: 4.7,
      image: require('../../../../assets/products/novel/cyber.jpg')
    }
  ];

  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={item.image} 
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons 
            name={favorites.has(item.id) ? "heart" : "heart-outline"} 
            size={24} 
            color={favorites.has(item.id) ? "#FF4B4B" : "#000"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <View style={styles.productHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products..."
          />
        </View>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          Result for "{searchQuery}"
        </Text>
        <Text style={styles.resultsCount}>
          6,245 founds
        </Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
};

export default SearchScreenResult;