import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { dummyData1, dummyData2 } from '../../../dummyData';

// Components
import AppHeader from '../../../reusableComponents/header';
import NotificationBar from './NotificationBar';
import ImageCarousel from './components/ImageCarousel';
import ImageThumbnails from './components/ImageThumbnails';
import NavigationMenu from './components/NavigationMenu';

// Tabs
import StandardTab from './components/tabs/StandardTab';
import SellingPriceTab from './components/tabs/SellingPriceTab';
import DeliveryOptionsTab from './components/tabs/DeliveryOptionsTab';
import SellingPointsTab from './components/tabs/SellingPointsTab';
import PaymentMethodsTab from './components/tabs/PaymentMethodsTab';

// Hooks
import { useProductDetails } from './hooks/useProductDetails';
import { useProductImages } from './hooks/useProductImages';
import { useProductTabs } from './hooks/useProductTabs';
import { useSellingPrice } from './hooks/useSellingPrice';
import { useDeliveryOptions } from './hooks/useDeliveryOptions';

// Styles
import styles from './style';

const ProductDetailsScreen = () => {
  // Initialize hooks
  const productDetailsHook = useProductDetails();
  const {
    productDetails,
    selectedSize,
    selectedColor,
    isFavorite,
    showNotification,
    sizes,
    colors,
    setSelectedSize,
    setSelectedColor,
    handleAddToCart,
    handleGoBack,
    handleIsFavorite,
    loadProductDetails,
    setShowNotification
  } = productDetailsHook;
  
  const productImagesHook = useProductImages();
  const {
    currentImageIndex,
    images,
    flatListRef,
    width,
    handleImageSelect,
    handleScroll,
    setProductImages
  } = productImagesHook;
  
  const tabsHook = useProductTabs();
  const {
    selectedTab,
    navigationOptions,
    handleTabChange
  } = tabsHook;
  
  // Load product details on component mount
  useEffect(() => {
    const productImages = loadProductDetails(dummyData1, dummyData2);
    setProductImages(productImages);
  }, []);
  
  // Initialize selling price hook after product details are loaded
  const sellingPriceHook = useSellingPrice(productDetails);
  
  // Initialize delivery options hook after product details are loaded
  const deliveryOptionsHook = useDeliveryOptions(productDetails);
  
  // Render the active tab content
  const renderContent = () => {
    switch (selectedTab) {
      case 'Standard':
        return (
          <StandardTab
            productDetails={productDetails}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            sizes={sizes}
            colors={colors}
            handleAddToCart={handleAddToCart}
          />
        );
      case 'Selling Price':
        return (
          <SellingPriceTab
            productDetails={productDetails}
            sellingPriceHook={sellingPriceHook}
            setShowNotification={setShowNotification}
          />
        );
      case 'Delivery Options':
        return (
          <DeliveryOptionsTab
            productDetails={productDetails}
            deliveryOptionsHook={deliveryOptionsHook}
            setShowNotification={setShowNotification}
          />
        );
      case 'Selling Points':
        return (
          <SellingPointsTab
            sellingPoints={dummyData1[0]}
            handleLocationPress={deliveryOptionsHook.handleLocationPress}
            handleCallPress={(phoneNumber) => deliveryOptionsHook.handleContactPress('phone', phoneNumber)}
          />
        );
      case 'Payment Methods':
        return <PaymentMethodsTab />;
      default:
        return (
          <StandardTab
            productDetails={productDetails}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            sizes={sizes}
            colors={colors}
            handleAddToCart={handleAddToCart}
          />
        );
    }
  };
  
  if (!productDetails) return null;
  
  return (
    <View style={styles.container}>
      <NotificationBar
        visible={showNotification}
        message="Item added to cart successfully!"
      />

      <AppHeader
        title={productDetails?.title || 'Product Details'}
        onBackPress={handleGoBack} 
        rightComponent={
          isFavorite 
            ? <Ionicons name="heart" size={24} color="red" onPress={handleIsFavorite}/> 
            : <Ionicons name="heart-outline" size={24} color='gray' onPress={handleIsFavorite}/>
        }
      />

      <FlatList
        ListHeaderComponent={() => (
          <>
            {/* Image Section */}
            <ImageCarousel
              images={images}
              flatListRef={flatListRef}
              handleScroll={handleScroll}
              width={width}
            />

            {/* Horizontal Thumbnail Gallery */}
            <ImageThumbnails
              images={images}
              currentImageIndex={currentImageIndex}
              handleImageSelect={handleImageSelect}
            />

            {/* Navigation Menu */}
            <NavigationMenu
              navigationOptions={navigationOptions}
              selectedTab={selectedTab}
              handleTabChange={handleTabChange}
            />
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.contentSection}>
            {renderContent()}
          </View>
        )}
        data={[{ key: 'content' }]}
        renderItem={null}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductDetailsScreen;