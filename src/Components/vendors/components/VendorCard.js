import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../style';

const VendorCard = ({ vendor, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: vendor.photo }}
        style={styles.vendorPhoto}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{vendor.name}</Text>
        <Text style={styles.contact}>{vendor.contact}</Text>
        <Text style={styles.address}>{vendor.address}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => onEdit(vendor)}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={() => onDelete(vendor.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VendorCard;