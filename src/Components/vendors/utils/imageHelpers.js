import * as ImagePicker from 'expo-image-picker';

/**
 * Opens the image library and picks an image
 * 
 * @returns {Promise<string|null>} Image URI or null if canceled
 */
export const pickImageFromLibrary = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      return result.assets[0].uri;
    }
    
    return null;
  } catch (error) {
    console.error('Error picking image:', error);
    return null;
  }
};

/**
 * Gets a default image when no vendor image is provided
 * 
 * @returns {string} Default image URL
 */
export const getDefaultVendorImage = () => {
  return 'https://randomuser.me/api/portraits/men/1.jpg';
};