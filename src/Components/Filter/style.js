import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    
    content: {
        flex: 1,
        padding: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#000000',
    },
    chipsContainer: {
        flexDirection: 'row',
        marginHorizontal: -4,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        marginHorizontal: 4,
    },
    chipSelected: {
        backgroundColor: '#8B4513',
    },
    chipText: {
        fontSize: 14,
        color: '#666666',
    },
    chipTextSelected: {
        color: '#FFFFFF',
    },
    priceRangeContainer: {
        marginTop: 8,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    priceLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
    },
    priceLabel: {
        fontSize: 12,
        color: '#666666',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    ratingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        marginRight: 8,
    },
    ratingText: {
        fontSize: 14,
        color: '#666666',
        marginLeft: 8,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#8B4513',
    },
    radioButtonSelected: {
        backgroundColor: '#8B4513',
    },
    footer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    resetButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        marginRight: 8,
    },
    resetButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666666',
    },
    applyButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: '#8B4513',
        alignItems: 'center',
        marginLeft: 8,
    },
    applyButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});