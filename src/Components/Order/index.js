import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, FlatList, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import AppHeader from '../../reusableComponents/header';
import { ordersDataTrack, ordersDataComment, ordersDataReorder } from '../../dummyData';

const OrdersScreen = () => {

  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Active');
  const [tabBarPosition] = useState(new Animated.Value(0));

  const tabs = ['Active', 'Completed', 'Cancelled'];

  const orderData = {
    Active: ordersDataTrack,
    Completed: ordersDataComment,
    Cancelled: ordersDataReorder,
  };

  const handleTabPress = (tab) => {
    const newPosition = (tabs.indexOf(tab) * (100 / 3));
    Animated.spring(tabBarPosition, {
      toValue: newPosition,
      useNativeDriver: false,
      tension: 50,
      friction: 7,
    }).start();
    setActiveTab(tab);
  };

  const handlePageDirection = (item) => {
    if (activeTab === 'Active') {
      navigation.navigate('TrackOrder');
    };

    if (activeTab === 'Completed') {
      navigation.navigate('Review');
    };

    if (activeTab === 'Cancelled') {
      navigation.navigate('ProductDetails', { productId: item.id, product: item });    
    };
  }

  const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  }

  const handleReOrder = (item) => {
    console.log('Trying to reorder a product or service');
    navigation.navigate('ProductDetails', { productId: item.id, product: item });
  }
  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderItem} onPress={() => handleReOrder(item)}>
      <Image
        source={item.video}
        style={styles.productImage}
      />
      <TouchableOpacity style={styles.orderDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productInfo}>Size : {item.size} | Qty : {item.qty}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[
          styles.actionButton,
          { backgroundColor: activeTab === 'Cancelled' ? '#8B4513' : '#6B4423' }
        ]}
        onPress={() => handlePageDirection(item)}
      >
        <Text style={styles.actionButtonText}>{item.action}</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="My Orders" onGoBack={handleGoBack} />

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => handleTabPress(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.tabIndicator,
            {
              left: tabBarPosition.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

      <FlatList
        data={orderData[activeTab]}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersList}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;