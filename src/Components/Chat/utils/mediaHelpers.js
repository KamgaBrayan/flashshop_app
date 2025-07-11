import { Alert } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

export const selectImage = (type, onImageSelected) => {
  const options = {
    mediaType: 'mixed',
    quality: 1,
    includeBase64: true,
  };

  const openPicker = type === 'camera' ? 
    ImagePicker.launchCamera : 
    ImagePicker.launchImageLibrary;

  openPicker(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
      Alert.alert('Error', 'Failed to pick image');
    } else if (response.assets && response.assets[0]) {
      const source = { uri: response.assets[0].uri };
      onImageSelected(source);
    }
  });
};

export const showMediaSelectionDialog = (onCameraSelect, onGallerySelect) => {
  Alert.alert(
    'Upload Media',
    'Choose media source',
    [
      { 
        text: 'Take Photo/Video', 
        onPress: onCameraSelect
      },
      { 
        text: 'Choose from Gallery', 
        onPress: onGallerySelect
      },
      { 
        text: 'Cancel', 
        style: 'cancel' 
      },
    ]
  );
};