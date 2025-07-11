import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './style';
import AppHeader from '../header';

const NotificationScreen = () => {

  const navigation = useNavigation();
  const notifications = {
    today: [
      {
        id: 1,
        title: 'Order Shipped',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '1h',
        icon: 'truck',
      },
      {
        id: 2,
        title: 'Flash Sale Alert',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '1h',
        icon: 'zap',
      },
      {
        id: 3,
        title: 'Product Review Request',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis',
        time: '1h',
        icon: 'star',
      },
    ],
    yesterday: [
      {
        id: 4,
        title: 'Order Shipped',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '1d',
        icon: 'truck',
      },
      {
        id: 5,
        title: 'New Paypal Added',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '1d',
        icon: 'credit-card',
      },
      {
        id: 6,
        title: 'Flash Sale Alert',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '1d',
        icon: 'zap',
      },
      {
        id: 7,
        title: 'Flash Sale Alert',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        time: '1d',
        icon: 'zap',
      },
    ],
  };

  const NotificationItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={24} color="#8B4513" />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <AppHeader
        title="Notifications"
        onGoBack={handleGoBack}
        rightComponent={
          <TouchableOpacity>
           <Text style={styles.newBadgeText}>2 NEW</Text>
          </TouchableOpacity>
        }
      />
      

      <ScrollView style={styles.content}>
        {/* Today's Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TODAY</Text>
            <TouchableOpacity>
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          </View>
          {notifications.today.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </View>

        {/* Yesterday's Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>YESTERDAY</Text>
            <TouchableOpacity>
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          </View>
          {notifications.yesterday.map((item) => (
            <NotificationItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;