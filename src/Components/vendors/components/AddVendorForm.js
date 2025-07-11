import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from '../style';

const AddVendorForm = ({ 
  newVendor, 
  onChangeVendor, 
  onAddVendor, 
  onPickImage 
}) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Add New Vendor</Text>
      
      <TouchableOpacity style={styles.photoContainer} onPress={onPickImage}>
        {newVendor.photo ? (
          <Image source={{ uri: newVendor.photo }} style={styles.photoPreview} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Text style={styles.photoText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Vendor Name"
        value={newVendor.name}
        onChangeText={(text) => onChangeVendor({ ...newVendor, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={newVendor.contact}
        onChangeText={(text) => onChangeVendor({ ...newVendor, contact: text })}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={newVendor.address}
        onChangeText={(text) => onChangeVendor({ ...newVendor, address: text })}
        multiline
      />
      <TouchableOpacity 
        style={styles.addButton}
        onPress={onAddVendor}
      >
        <Text style={styles.addButtonText}>Add Vendor</Text>
      </TouchableOpacity>
      
      <Text style={styles.listTitle}>Vendors List</Text>
    </View>
  );
};

export default AddVendorForm;