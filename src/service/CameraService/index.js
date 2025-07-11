import * as ImagePicker from 'expo-image-picker';
import { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import React from 'react';
import { View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { CameraView } from 'expo-camera';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const useCameraService = (onMediaSelect) => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTimer, setRecordingTimer] = useState(0);
  const [mediaMode, setMediaMode] = useState('photo'); // 'photo' ou 'video'
  const [flashMode, setFlashMode] = useState('off'); // 'off', 'on', 'auto'
  const [videoDuration, setVideoDuration] = useState(15); // Durée sélectionnée: 15s, 60s, 3min
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const cameraRef = useRef(null);
  const timerRef = useRef(null);
  const progressRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const initializePermissions = async () => {
      try {
        await requestPermission();
      } catch (error) {
        console.error('Permission request error:', error);
      }
    };
    initializePermissions();
  }, [requestPermission]);

  // Timer et progress bar pour l'enregistrement vidéo
  useEffect(() => {
    if (isRecording) {
      const maxDuration = videoDuration;
      timerRef.current = setInterval(() => {
        setRecordingTimer(prev => {
          const newTime = prev + 1;
          const progress = newTime / maxDuration;
          setRecordingProgress(progress);

          // Animation de la progress bar
          Animated.timing(progressRef, {
            toValue: progress,
            duration: 100,
            useNativeDriver: false,
          }).start();

          // Arrêt automatique à la fin
          if (newTime >= maxDuration) {
            handleCapture();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordingTimer(0);
      setRecordingProgress(0);
      progressRef.setValue(0);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording, videoDuration]);

  const takeMedia = async () => {
    try {
      console.log('Checking camera permissions...');
      console.log('Current permission status:', permission);

      if (!permission?.granted) {
        console.log('Requesting camera permission...');
        const permissionResult = await requestPermission();
        console.log('Permission result:', permissionResult);

        if (!permissionResult?.granted) {
          Alert.alert('Permission Required', 'Camera permission is required to take photos/videos');
          return;
        }
      }

      console.log('Opening camera...');
      setShowCamera(true);
    } catch (error) {
      console.error('Error opening camera:', error);
      Alert.alert('Error', `Failed to open camera: ${error.message}`);
    }
  };

  const handleCapture = async () => {
    if (!cameraRef.current) {
      console.error('Camera ref is null');
      Alert.alert('Error', 'Camera not ready');
      return null;
    }

    try {
      if (mediaMode === 'video') {
        if (isRecording) {
          // Arrêter l'enregistrement
          console.log('Stopping video recording...');
          try {
            // Marquer comme non-recording immédiatement pour éviter les double-clics
            setIsRecording(false);

            const result = await cameraRef.current.stopRecording();
            console.log('Raw video result:', result);

            // Vérifier différents formats de résultat possibles
            let videoUri = null;
            if (result) {
              videoUri = result.uri || result.path || result;
            }

            if (videoUri && typeof videoUri === 'string') {
              console.log('Video recorded successfully:', videoUri);
              setShowCamera(false);
              if (onMediaSelect) {
                onMediaSelect({ uri: videoUri, type: 'video' });
              }
              return { uri: videoUri, type: 'video' };
            } else {
              console.log('Manual stop result was undefined, video might have auto-completed');
              // Ne pas montrer d'erreur car la vidéo pourrait être gérée par auto-stop
              return null;
            }
          } catch (stopError) {
            console.error('Stop recording error:', stopError);
            Alert.alert('Error', 'Failed to stop recording properly');
            return null;
          }
        } else {
          // Commencer l'enregistrement
          console.log('Starting video recording...');
          setIsRecording(true);

          try {
            // Démarrer l'enregistrement et gérer la completion automatique
            cameraRef.current.recordAsync({
              quality: '720p',
              maxDuration: videoDuration,
            }).then((result) => {
              // Cette callback sera appelée quand l'enregistrement se termine (auto ou manuel)
              console.log('Auto-stopped recording result:', result);

              if (isRecording) {
                setIsRecording(false);
              }

              if (result && (result.uri || result.path)) {
                const videoUri = result.uri || result.path;
                console.log('Video completed with URI:', videoUri);
                setShowCamera(false);
                if (onMediaSelect) {
                  onMediaSelect({ uri: videoUri, type: 'video' });
                }
              }
            }).catch((error) => {
              console.error('Recording promise error:', error);
              if (isRecording) {
                setIsRecording(false);
              }
            });

            return null; // On ne retourne rien pour le démarrage
          } catch (recordError) {
            console.error('Start recording error:', recordError);
            setIsRecording(false);
            Alert.alert('Error', 'Failed to start recording. Camera may not support video mode.');
            return null;
          }
        }
      } else {
        // Prendre une photo
        console.log('Taking photo...');
        try {
          const result = await cameraRef.current.takePictureAsync({
            quality: 0.8,
            base64: false,
            exif: false,
            skipProcessing: true,
          });

          console.log('Photo result:', result);

          if (result && result.uri) {
            console.log('Photo taken successfully:', result.uri);
            setShowCamera(false);
            if (onMediaSelect) {
              onMediaSelect({ uri: result.uri, type: 'image' });
            }
            return result;
          } else {
            console.error('Invalid photo result:', result);
            Alert.alert('Error', 'Photo was taken but file is invalid');
            return null;
          }
        } catch (photoError) {
          console.error('Take photo error:', photoError);
          Alert.alert('Error', 'Failed to take photo. Please try again or restart the camera.');
          return null;
        }
      }
    } catch (error) {
      console.error('General capture error:', error);
      Alert.alert('Error', 'Camera operation failed');
      setIsRecording(false);
      return null;
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    const modes = ['off', 'on', 'auto'];
    const currentIndex = modes.indexOf(flashMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setFlashMode(modes[nextIndex]);
    setIsFlashOn(modes[nextIndex] !== 'off');
  };

  const selectVideoDuration = (duration) => {
    if (!isRecording) {
      setVideoDuration(duration);
    }
  };

  const pickMedia = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Media library permission is required to select images/videos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
        videoMaxDuration: 180,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        if (onMediaSelect) {
          onMediaSelect({
            uri: asset.uri,
            type: asset.type === 'video' ? 'video' : 'image'
          });
        }
      }
    } catch (error) {
      console.error('Error picking media:', error);
      Alert.alert('Error', 'Failed to select media');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    facing,
    showCamera,
    setShowCamera,
    cameraRef,
    permission,
    requestPermission,
    takeMedia,
    handleCapture,
    toggleCameraFacing,
    pickMedia,
    isRecording,
    recordingTimer,
    mediaMode,
    setMediaMode,
    formatTime,
    flashMode,
    toggleFlash,
    isFlashOn,
    videoDuration,
    selectVideoDuration,
    recordingProgress,
    progressRef
  };
};

export const CameraModal = ({
                              showCamera,
                              setShowCamera,
                              facing,
                              cameraRef,
                              permission,
                              requestPermission,
                              handleCapture,
                              toggleCameraFacing,
                              isRecording,
                              recordingTimer,
                              mediaMode,
                              setMediaMode,
                              formatTime,
                              flashMode,
                              toggleFlash,
                              isFlashOn,
                              videoDuration,
                              selectVideoDuration,
                              progressRef,
                              pickMedia
                            }) => {
  if (!permission) {
    return <View style={styles.container}><Text>Requesting permission...</Text></View>;
  }

  if (!permission.granted) {
    return (
        <View style={styles.container}>
          <Text style={styles.message}>We need your permission to show the camera</Text>
          <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
    );
  }

  const getFlashIcon = () => {
    switch (flashMode) {
      case 'on': return 'flash-on';
      case 'auto': return 'flash-auto';
      default: return 'flash-off';
    }
  };

  return (
      <Modal
          visible={showCamera}
          animationType="slide"
          onRequestClose={() => !isRecording && setShowCamera(false)}
      >
        <View style={styles.cameraContainer}>
          <CameraView
              style={styles.camera}
              facing={facing}
              ref={cameraRef}
              mode={mediaMode}
              flash={flashMode}
          >
            {/* Progress bar en haut pour l'enregistrement */}
            {isRecording && progressRef && (
                <View style={styles.progressBarContainer}>
                  <Animated.View
                      style={[
                        styles.progressBar,
                        {
                          width: progressRef.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%'],
                            extrapolate: 'clamp',
                          }),
                        },
                      ]}
                  />
                </View>
            )}

            {/* Header avec contrôles */}
            <View style={styles.cameraHeader}>
              <TouchableOpacity
                  style={styles.headerButton}
                  onPress={() => !isRecording && setShowCamera(false)}
                  disabled={isRecording}
              >
                <Icon name="close" size={24} color="white" />
              </TouchableOpacity>

              {/* Indicateur d'enregistrement avec timer */}
              {isRecording && (
                  <View style={styles.recordingIndicator}>
                    <View style={styles.recordingDot} />
                    <Text style={styles.recordingTime}>{formatTime(recordingTimer)}</Text>
                  </View>
              )}

              {/* Contrôles de droite */}
              <View style={styles.rightControls}>
                <TouchableOpacity
                    style={[styles.headerButton, isFlashOn && styles.activeButton]}
                    onPress={toggleFlash}
                    disabled={isRecording}
                >
                  <Icon name={getFlashIcon()} size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Contrôles latéraux droits (comme TikTok) */}
            <View style={styles.sideControls}>
              <TouchableOpacity
                  style={styles.sideButton}
                  onPress={toggleCameraFacing}
                  disabled={isRecording}
              >
                <Icon name="flip-camera-ios" size={28} color="white" />
                <Text style={styles.sideButtonText}>Retourner</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.sideButton}
                  onPress={() => {/* Fonction vitesse à implémenter */}}
                  disabled={isRecording}
              >
                <Icon name="speed" size={28} color="white" />
                <Text style={styles.sideButtonText}>Vitesse</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.sideButton}
                  onPress={() => {/* Fonction beauté à implémenter */}}
                  disabled={isRecording}
              >
                <Icon name="face-retouching-natural" size={28} color="white" />
                <Text style={styles.sideButtonText}>Beauté</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.sideButton}
                  onPress={() => {/* Fonction filtres à implémenter */}}
                  disabled={isRecording}
              >
                <Icon name="filter" size={28} color="white" />
                <Text style={styles.sideButtonText}>Filtres</Text>
              </TouchableOpacity>
            </View>

            {/* Contrôles du bas */}
            <View style={styles.cameraBottomControls}>
              {/* Sélecteur de durée vidéo */}
              {mediaMode === 'video' && selectVideoDuration && (
                  <View style={styles.durationSelector}>
                    {[15, 60, 180].map((duration) => (
                        <TouchableOpacity
                            key={duration}
                            style={[
                              styles.durationButton,
                              videoDuration === duration && styles.activeDurationButton
                            ]}
                            onPress={() => selectVideoDuration(duration)}
                            disabled={isRecording}
                        >
                          <Text style={[
                            styles.durationText,
                            videoDuration === duration && styles.activeDurationText
                          ]}>
                            {duration < 60 ? `${duration}s` : `${Math.floor(duration / 60)}min`}
                          </Text>
                        </TouchableOpacity>
                    ))}
                  </View>
              )}

              {/* Contrôles principaux */}
              <View style={styles.mainControls}>
                {/* Bouton galerie */}
                <TouchableOpacity
                    style={styles.galleryButton}
                    onPress={pickMedia || (() => console.log('Gallery not available'))}
                    disabled={isRecording}
                >
                  <Icon name="photo-library" size={32} color="white" />
                  <Text style={styles.galleryButtonText}>Galerie</Text>
                </TouchableOpacity>

                {/* Bouton de capture */}
                <View style={styles.captureButtonContainer}>
                  <TouchableOpacity
                      style={[
                        styles.captureButton,
                        isRecording && styles.recordingCaptureButton
                      ]}
                      onPress={handleCapture}
                  >
                    <View style={[
                      styles.captureButtonInner,
                      isRecording && styles.recordingCaptureButtonInner
                    ]} />
                  </TouchableOpacity>
                </View>

                {/* Bouton effets */}
                <TouchableOpacity
                    style={styles.effectsButton}
                    onPress={() => {/* Fonction effets à implémenter */}}
                    disabled={isRecording}
                >
                  <Icon name="auto-fix-high" size={32} color="white" />
                  <Text style={styles.effectsButtonText}>Effets</Text>
                </TouchableOpacity>
              </View>

              {/* Sélecteur de mode en bas */}
              <View style={styles.modeSelector}>
                <TouchableOpacity
                    style={[styles.modeButton, mediaMode === 'photo' && styles.activeModeButton]}
                    onPress={() => !isRecording && setMediaMode('photo')}
                    disabled={isRecording}
                >
                  <Text style={[styles.modeText, mediaMode === 'photo' && styles.activeModeText]}>
                    Photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.modeButton, mediaMode === 'video' && styles.activeModeButton]}
                    onPress={() => !isRecording && setMediaMode('video')}
                    disabled={isRecording}
                >
                  <Text style={[styles.modeText, mediaMode === 'video' && styles.activeModeText]}>
                    Vidéo
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </CameraView>
        </View>
      </Modal>
  );
};