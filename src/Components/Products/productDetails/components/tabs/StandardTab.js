import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../../style';

const StandardTab = ({ 
  productDetails, 
  selectedSize, 
  setSelectedSize, 
  selectedColor, 
  setSelectedColor, 
  sizes, 
  colors, 
  handleAddToCart 
}) => {
  const renderProductOptions = () => {
    if (!productDetails || productDetails.type !== 'tangible') return null;

    return (
      <>
        <Text style={styles.sectionTitle}>Select Size</Text>
        <View style={styles.sizeContainer}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSizeButton
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.selectedSizeText
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Select Color</Text>
        <View style={styles.colorContainer}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color.hex}
              style={[
                styles.colorButton,
                { backgroundColor: color.hex },
                selectedColor === color.hex && styles.selectedColorButton
              ]}
              onPress={() => setSelectedColor(color.hex)}
            />
          ))}
        </View>
      </>
    );
  };

  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.category}>
        {productDetails.type === 'tangible' ? "Product" : "Service"}
      </Text>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{productDetails.title}</Text>

        <View style={styles.ratingContainer}>
          <Feather name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{productDetails.rating}</Text>
        </View>
      </View>

      <Text style={styles.description}>
        {productDetails.description}
        <Text style={styles.readMore}> Read more</Text>
      </Text>

      {/* Conditionally render product-specific options */}
      {renderProductOptions()}

      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Standard Price : </Text>
        <Text style={styles.price}>{productDetails.price.toFixed(2)} FCFA</Text>
      </View>

      <View style={styles.addToCartContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Feather name="shopping-bag" size={20} color="#FFF" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StandardTab;