import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from '../style';

const Header = ({ onBackPress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Image
          source={require('../../../../assets/utilities/avatar.png')}
          style={styles.profilePic}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>Angie Brekke</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.menuButton}>
        <Icon name="more-vertical" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;