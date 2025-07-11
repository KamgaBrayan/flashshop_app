import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './style';
import AppHeader from '../../../reusableComponents/header';

const InviteFriends = () => {

  const navigation = useNavigation();
  const contacts = [
    {
      id: '1',
      name: 'Carla Schoen',
      phone: '207.555.0119',
      avatar: '/api/placeholder/48/48',
    },
    {
      id: '2',
      name: 'Esther Howard',
      phone: '702.555.0122',
      avatar: '/api/placeholder/48/48',
    },
    {
      id: '3',
      name: 'Robert Fox',
      phone: '239.555.0108',
      avatar: '/api/placeholder/48/48',
    },
    {
      id: '4',
      name: 'Jacob Jones',
      phone: '316.555.0116',
      avatar: '/api/placeholder/48/48',
    },
    {
      id: '5',
      name: 'Jacob Jones',
      phone: '629.555.0129',
      avatar: '/api/placeholder/48/48',
    },
    {
      id: '6',
      name: 'Darlene Robertson',
      phone: '629.555.0129',
      avatar: '/api/placeholder/48/48',
    },
    {
      id: '7',
      name: 'Ralph Edwards',
      phone: '203.555.0106',
      avatar: '/api/placeholder/48/48',
    },
    {
      id: '8',
      name: 'Ronald Richards',
      phone: '209.555.0104',
      avatar: '/api/placeholder/48/48',
    },
    {
      id: '9',
      name: 'Courtney Henry',
      phone: '629.555.0129',
      avatar: '/api/placeholder/48/48',
    },
  ];


  const handleInvite = (contact) => {
    // Handle invitation logic here
    console.log(`Inviting ${contact.name}`);
  };

  const renderContactItem = ({ item }) => (
    <View style={styles.contactItem}>
      <Image
        source={{ uri: item.avatar }}
        style={styles.avatar}
      />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
      <TouchableOpacity
        style={styles.inviteButton}
        onPress={() => handleInvite(item)}
      >
        <Text style={styles.inviteButtonText}>Invite</Text>
      </TouchableOpacity>
    </View>
  );

  const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Invite Friends" goBack={handleGoBack} />

      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default InviteFriends;