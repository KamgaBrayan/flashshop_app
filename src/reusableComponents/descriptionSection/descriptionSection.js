import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../Components/home/style';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

const DescriptionComponent = ({ description, username }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Check if text needs "See More" button after layout
  const onTextLayout = ({ nativeEvent }) => {
    setShowSeeMore(nativeEvent.lines.length > 1);
  };

  const toggleExpanded = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  };

  const animatedStyle = {
    transform: [
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [WINDOW_HEIGHT, 0],
        }),
      },
    ],
  };

  return (
    <>
      <View style={styles.descriptionContainer}>
        <Text
          numberOfLines={isExpanded ? undefined : 2}
          onTextLayout={onTextLayout}
          style={styles.descriptionText}
        >
          {description}
        </Text>
        
        {showSeeMore && !isExpanded && (
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={toggleExpanded}
          >
            <Text style={styles.seeMoreText}>See more</Text>
            <Ionicons 
              name="chevron-down" 
              size={16} 
              color="rgba(255, 255, 255, 0.9)" 
              style={{ marginLeft: 4 }} 
            />
          </TouchableOpacity>
        )}
      </View>

      {isExpanded && (
        <Animated.View style={[styles.expandedDescription, animatedStyle]}>
          <View style={styles.descriptionHeader}>
            <Text style={styles.descriptionTitle}>@{username}'s Description</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleExpanded}
            >
              <Ionicons name="close" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.expandedDescriptionContent}>
            {description}
          </Text>
        </Animated.View>
      )}
    </>
  );
};

export default DescriptionComponent;