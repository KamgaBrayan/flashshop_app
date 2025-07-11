import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../style';

const Header = ({ currentUsername, onSearchPress, navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <Image 
            source={require('../../../../assets/flashshop_logo.png')} 
            style={styles.logoImage}
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onSearchPress}>
          <Feather name="search" size={30} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.userNameContainer}>
        <View style={styles.userNameBackground}>
          <Text style={styles.currentUserName}>
            Shop of {currentUsername}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;