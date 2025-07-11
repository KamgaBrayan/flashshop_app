import React from 'react';
import {
  FlatList,
  SafeAreaView,
} from 'react-native';
import AppHeader from '../../reusableComponents/header';
import styles from './style';
import dummyVendors from './dummyVendors';

// Import components
import VendorCard from './components/VendorCard';
import AddVendorForm from './components/AddVendorForm';
import EditVendorModal from './components/EditVendorModal';

// Import custom hooks
import { useVendors } from './hooks/useVendors';

const VendorManagement = ({ navigation }) => {
  // Initialize vendor management hook
  const {
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
  } = useVendors(dummyVendors);

  // Render a vendor card
  const renderVendor = ({ item }) => (
    <VendorCard 
      vendor={item} 
      onEdit={openEditModal} 
      onDelete={deleteVendor} 
    />
  );

  // List header component with the add vendor form
  const ListHeader = () => (
    <AddVendorForm 
      newVendor={newVendor}
      onChangeVendor={setNewVendor}
      onAddVendor={addVendor}
      onPickImage={pickNewVendorImage}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="My Vendors" onGoBack={() => navigation.goBack()} />
      
      <FlatList
        data={vendors}
        renderItem={renderVendor}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        stickyHeaderIndices={[0]}
      />

      <EditVendorModal 
        visible={modalVisible}
        vendor={selectedVendor}
        onChangeVendor={setSelectedVendor}
        onSave={saveEditedVendor}
        onCancel={closeEditModal}
        onPickImage={pickEditVendorImage}
      />
    </SafeAreaView>
  );
};

export default VendorManagement;