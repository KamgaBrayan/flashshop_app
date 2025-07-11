import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export const useMediaPermissions = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      setCameraPermission(cameraStatus.status === 'granted');
      setMediaLibraryPermission(mediaLibraryStatus.status === 'granted');
    })();
  }, []);

  return {
    cameraPermission,
    mediaLibraryPermission
  };
};