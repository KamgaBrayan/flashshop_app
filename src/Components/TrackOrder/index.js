import React from 'react';
import { View, Text, Image, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import AppHeader from '../../reusableComponents/header';

const TrackOrderScreen = () => {

  const navigation = useNavigation();
  const orderSteps = [
    {
      id: 1,
      title: 'Order Placed',
      date: '23 Aug 2023, 04:25 PM',
      icon: 'file-text',
      completed: true,
    },
    {
      id: 2,
      title: 'In Progress',
      date: '23 Aug 2023, 03:54 PM',
      icon: 'package',
      completed: true,
    },
    {
      id: 3,
      title: 'Shipped',
      date: 'Expected 02 Sep 2023',
      icon: 'truck',
      completed: false,
    },
    {
      id: 4,
      title: 'Delivered',
      date: '23 Aug 2023, 2023',
      icon: 'box',
      completed: false,
    },
  ];

  const renderOrderStep = (step, index) => (
    <View key={step.id} style={styles.stepContainer}>
      <View style={styles.stepLeft}>
        <View style={[
          styles.stepIndicator,
          step.completed ? styles.completedIndicator : styles.pendingIndicator
        ]}>
          {step.completed && <Icon name="check" size={16} color="#FFFFFF" />}
        </View>
        {index < orderSteps.length - 1 && (
          <View style={[
            styles.stepLine,
            step.completed ? styles.completedLine : styles.pendingLine
          ]} />
        )}
      </View>
      
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepDate}>{step.date}</Text>
      </View>
      
      <View style={styles.stepIcon}>
        <Icon name={step.icon} size={24} color="#8B4513" />
      </View>
    </View>
  );

  const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <AppHeader title="Track Order" onGoBack={handleGoBack} />

      {/* Product Info */}
      <View style={styles.productContainer}>
        <Image
          source={require('../../../assets/products/novel/cyber.jpg')}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>Brown Suite</Text>
          <Text style={styles.productDetails}>Size : XL | Qty : 10pcs</Text>
          <Text style={styles.productPrice}>120 FCFA</Text>
        </View>
      </View>

      {/* Order Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Expected Delivery Date</Text>
          <Text style={styles.detailValue}>03 Sep 2023</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tracking ID</Text>
          <Text style={styles.detailValue}>TRK452126542</Text>
        </View>
      </View>

      {/* Order Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.sectionTitle}>Order Status</Text>
        <View style={styles.stepsContainer}>
          {orderSteps.map((step, index) => renderOrderStep(step, index))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TrackOrderScreen;