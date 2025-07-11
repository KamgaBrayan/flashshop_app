import { useState } from 'react';
import { Alert } from 'react-native';
import { pickImageFromLibrary, getDefaultVendorImage } from '../utils/imageHelpers';

export const useVendors = (initialVendors) => {
  const [vendors, setVendors] = useState(initialVendors);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [newVendor, setNewVendor] = useState({
    name: '',
    contact: '',
    address: '',
    photo: null,
  });

  // Pick image for the new vendor form
  const pickNewVendorImage = async () => {
    const photoUri = await pickImageFromLibrary();
    if (photoUri) {
      setNewVendor({ ...newVendor, photo: photoUri });
    }
  };

  // Pick image for the edit vendor form
  const pickEditVendorImage = async () => {
    const photoUri = await pickImageFromLibrary();
    if (photoUri && selectedVendor) {
      setSelectedVendor({ ...selectedVendor, photo: photoUri });
    }
  };

  // Reset new vendor form
  const resetNewVendorForm = () => {
    setNewVendor({ name: '', contact: '', address: '', photo: null });
  };

  // Add a new vendor
  const addVendor = () => {
    if (!newVendor.name || !newVendor.contact || !newVendor.address) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    setVendors([
      {
        id: Date.now(),
        photo: newVendor.photo || getDefaultVendorImage(),
        ...newVendor
      },
      ...vendors
    ]);
    resetNewVendorForm();
  };

  // Delete a vendor
  const deleteVendor = (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this vendor?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => setVendors(vendors.filter(vendor => vendor.id !== id)),
          style: 'destructive',
        },
      ]
    );
  };

  // Open edit modal
  const openEditModal = (vendor) => {
    setSelectedVendor(vendor);
    setModalVisible(true);
  };

  // Save edited vendor
  const saveEditedVendor = () => {
    if (!selectedVendor.name || !selectedVendor.contact || !selectedVendor.address) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }

    setVendors(vendors.map(v => 
      v.id === selectedVendor.id ? selectedVendor : v
    ));
    setModalVisible(false);
  };

  // Close edit modal
  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedVendor(null);
  };

  return {
    vendors,
    newVendor,
    setNewVendor,
    addVendor,
    deleteVendor,
    openEditModal,
    saveEditedVendor,
    closeEditModal,
    selectedVendor,
    setSelectedVendor,
    modalVisible,
    pickNewVendorImage,
    pickEditVendorImage
  };
};