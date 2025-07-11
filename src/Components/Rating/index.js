import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppHeader from '../../reusableComponents/header';
import { StyleSheet } from 'react-native';

const RatingScreen = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    // Here you would typically send the rating and feedback to your backend
    Alert.alert(
      "Thank You!",
      "Your feedback has been submitted successfully.",
      [{ text: "OK" }]
    );
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
          >
            <Feather
              name={rating >= star ? "star" : "star"}
              size={40}
              color={rating >= star ? "#FFD700" : "#D3D3D3"}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader title="Rate FlashShop" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>How would you rate your experience?</Text>
          {renderStars()}
          
          <Text style={styles.feedbackLabel}>Share your thoughts with us</Text>
          <TextInput
            style={styles.feedbackInput}
            multiline
            numberOfLines={4}
            placeholder="Tell us what you think about FlashShop..."
            value={feedback}
            onChangeText={setFeedback}
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!rating || !feedback) && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!rating || !feedback}
          >
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  star: {
    marginHorizontal: 8,
  },
  feedbackLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    alignSelf: 'flex-start',
    color: '#8B4513',
  },
  feedbackInput: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: '#8B4513',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
  },
  submitButtonDisabled: {
    backgroundColor: 'gray',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RatingScreen;
