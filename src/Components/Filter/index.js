import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import styles from './style';
import AppHeader from '../../reusableComponents/header';

const Filter = () => {

    const navigation = useNavigation();
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [selectedGender, setSelectedGender] = useState('all');
    const [selectedSort, setSelectedSort] = useState('popular');
    const [priceRange, setPriceRange] = useState([7, 100]);
    const [selectedRating, setSelectedRating] = useState('4.5');

    const brands = [
        { id: 'all', name: 'All' },
        { id: 'driver', name: 'Driver' },
        { id: 'journey', name: 'Journey' },
        { id: 'nike', name: 'Nike' },
        { id: 'adidas', name: 'Adidas' },
        { id: 'puma', name: 'Puma' },
        { id: 'fila', name: 'Fila' },
        
    ];

    const genders = [
        { id: 'all', name: 'All' },
        { id: 'men', name: 'Men' },
        { id: 'women', name: 'Women' },
    ];

    const sortOptions = [
        { id: 'recent', name: 'Most Recent' },
        { id: 'popular', name: 'Popular' },
        { id: 'price', name: 'Price High' },
    ];

    const ratings = [
        { value: '4.5', label: '4.5 and above' },
        { value: '4.0', label: '4.0 - 4.5' },
        { value: '3.5', label: '3.5 - 4.0' },
        { value: '3.0', label: '3.0 - 3.5' },
        { value: '2.5', label: '2.5 - 3.0' },
    ];

    const renderFilterChips = (items, selectedItem, setSelected) => (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
            {items.map(item => (
                <TouchableOpacity
                    key={item.id}
                    style={[
                        styles.chip,
                        selectedItem === item.id && styles.chipSelected
                    ]}
                    onPress={() => setSelected(item.id)}
                >
                    <Text style={[
                        styles.chipText,
                        selectedItem === item.id && styles.chipTextSelected
                    ]}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );

    const renderStarRating = (count) => (
        <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
                <Ionicons
                    key={index}
                    name="star"
                    size={16}
                    color="#FFD700"
                />
            ))}
        </View>
    );

    const handleGoBack = () => {
    console.log('go back pressed');
    navigation.goBack();
  }

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                onGoBack={handleGoBack}
                title="Filter"
            />

            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Brands</Text>
                    {renderFilterChips(brands, selectedBrand, setSelectedBrand)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Gender</Text>
                    {renderFilterChips(genders, selectedGender, setSelectedGender)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Sort by</Text>
                    {renderFilterChips(sortOptions, selectedSort, setSelectedSort)}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pricing Range</Text>
                    <View style={styles.priceRangeContainer}>
                        <Slider
                            style={styles.slider}
                            minimumValue={2}
                            maximumValue={150}
                            values={priceRange}
                            onValuesChange={setPriceRange}
                            minimumTrackTintColor="#8B4513"
                            maximumTrackTintColor="#D3D3D3"
                            thumbTintColor="#8B4513"
                        />
                        <View style={styles.priceLabels}>
                            <Text style={styles.priceLabel}>2 FCFA</Text>
                            <Text style={styles.priceLabel}>150+ FCFA</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Reviews</Text>
                    {ratings.map(rating => (
                        <TouchableOpacity
                            key={rating.value}
                            style={styles.ratingRow}
                            onPress={() => setSelectedRating(rating.value)}
                        >
                            <View style={styles.ratingLeft}>
                                {renderStarRating(5)}
                                <Text style={styles.ratingText}>{rating.label}</Text>
                            </View>
                            <View style={[
                                styles.radioButton,
                                selectedRating === rating.value && styles.radioButtonSelected
                            ]} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.resetButton}
                    onPress={() => {
                        setSelectedBrand('all');
                        setSelectedGender('all');
                        setSelectedSort('popular');
                        setPriceRange([7, 100]);
                        setSelectedRating('4.5');
                    }}
                >
                    <Text style={styles.resetButtonText}>Reset Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Filter;