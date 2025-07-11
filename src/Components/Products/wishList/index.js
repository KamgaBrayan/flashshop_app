import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../../context/cartContext';
import { dummyData1 } from '../../../dummyData';
import AppHeader from '../../../reusableComponents/header';

const categories = ['All', 'Journeys', 'Drivers', 'Jacket', 'Shirt', 'Pant', 'T-Shirt', 'Books', 'Furnitures'];

const wishlistItems = dummyData1

const WishlistScreen = () => {

  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const flatListRef = React.useRef(null);
  const screenWidth = Dimensions.get('window').width;

  const handleProductDetails = (item) => {
    console.log('product details pressed');
    navigation.navigate('ProductDetails', { productId: item.id });
    // navigation.navigate('DriverService')
  }

  const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  }

  const handleHome = () => {
    console.log('home pressed');
    navigation.navigate('Home');
  }

  const handleCart = () => {
    console.log('cart pressed');
    navigation.navigate('Cart');
  }

  const handleProfile = () => {
    console.log('profile pressed');
    navigation.navigate('profile');
  }

  handleChat = () => {
    console.log('Chat pressed');
  }

  const handleCategoryChange = (category, index) => {
    setSelectedCategory(category);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5
    });
  };

  const getItemLayout = (data, index) => ({
    length: 100,
    offset: 100 * index,
    index,
  });

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setSelectedCategory(viewableItems[0].item);
    }
  }).current;

  const renderCategories = () => (
    <FlatList
      ref={flatListRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
      data={categories}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => handleCategoryChange(item, index)}
          style={[
            styles.categoryButton,
            selectedCategory === item && styles.categoryButtonActive,
          ]}
        >
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === item && styles.categoryButtonTextActive,
          ]}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item}
      getItemLayout={getItemLayout}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      pagingEnabled={false}
      decelerationRate="fast"
      snapToAlignment="center"
    />
  );

  const renderWishlistItem = (item) => (
    <View key={item.id} style={styles.itemContainer}>
      <TouchableOpacity style={styles.imageContainer} onPress={() => handleProductDetails(item)}>
        <Image
          source={item.video}
          style={styles.itemImage}
        />
        <TouchableOpacity style={styles.heartButton}>
          <Ionicons name="heart" size={20} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.itemBottom}>
          <Text style={styles.itemPrice}>{item.price.toFixed(2)} FCFA</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const {cartItems} = useCart();
  const renderBottomTabs = () => (
    <View style={styles.bottomTabs}>
      <TouchableOpacity style={styles.tabButton} onPress={handleHome}>
        <Ionicons name="home-outline" size={24} color="#8B4513" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={handleCart}>
          <View>
            <Ionicons name="cart-outline" size={24} color="#8B4513" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartItems.length}
                </Text>
              </View>
            )}
          </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.tabButton}>
        <Ionicons name="add-circle-outline" size={40} color="#8B4513" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleChat} style={styles.tabButton}>
          <Ionicons name="chatbubble-outline" size={24} color="#8B4513" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabButton} onPress={handleProfile}>
        <Ionicons name="person-outline" size={24} color="#8B4513" />
      </TouchableOpacity>
    </View>
  );

  
  return (
    <View style={styles.container}>
      <AppHeader title="My Wishlist" />
      {renderCategories()}
      <FlatList 
        contentContainerStyle={styles.wishlistContainer}
        showsVerticalScrollIndicator={false}
        data={wishlistItems}
        renderItem={({ item }) => renderWishlistItem(item)}
        keyExtractor={(item) => item.id.toString()}
      />
      {renderBottomTabs()}
    </View>
  );
};

export default WishlistScreen;