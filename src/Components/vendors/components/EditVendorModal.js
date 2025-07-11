import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import styles from '../style';

const EditVendorModal = ({ 
  visible, 
  vendor, 
  onChangeVendor, 
  onSave, 
  onCancel,
  onPickImage
}) => {
  if (!vendor) return null;
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Vendor</Text>

          <TouchableOpacity style={styles.photoContainer} onPress={onPickImage}>
            {vendor.photo ? (
              <Image source={{ uri: vendor.photo }} style={styles.photoPreview} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoText}>Change Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Vendor Name"
            value={vendor.name}
            onChangeText={(text) => onChangeVendor({ ...vendor, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact"
            value={vendor.contact}
            onChangeText={(text) => onChangeVendor({ ...vendor, contact: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={vendor.address}
            onChangeText={(text) => onChangeVendor({ ...vendor, address: text })}
            multiline
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.saveButton]}
              onPress={onSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditVendorModal;