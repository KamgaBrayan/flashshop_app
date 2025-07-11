import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style';

const categories = [
  { id: 'all', name: 'All Items', icon: 'apps' },
  { id: 'products', name: 'Products', icon: 'cube' },
  { id: 'services', name: 'Services', icon: 'briefcase' },
  { id: 'selling_points', name: 'Selling Points', icon: 'location' },
  { id: 'delivery', name: 'Delivery Options', icon: 'car' },
];

const CategorySelector = ({ selectedTab, onTabChange }) => {
  return (
    <View style={styles.categoriesContainer}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedTab === item.id && styles.categoryButtonActive,
            ]}
            onPress={() => onTabChange(item.id)}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={selectedTab === item.id ? '#8B4513' : '#666'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedTab === item.id && styles.categoryTextActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

export default CategorySelector;