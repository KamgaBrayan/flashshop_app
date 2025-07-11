import React from 'react';
import { TouchableOpacity, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../style';

const CategoryButton = ({ item, selectedCategory, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.categoryButtonActive,
      ]}
      onPress={() => onPress(item.id)}
    >
      <Ionicons
        name={item.icon}
        size={24}
        color={selectedCategory === item.id ? '#8B4513' : '#666'}
      />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export const CategoryList = ({ categories, selectedCategory, onCategoryPress }) => {
  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <CategoryButton 
          item={item} 
          selectedCategory={selectedCategory} 
          onPress={onCategoryPress} 
        />
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesList}
    />
  );
};