import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    
    shippingList: {
        flex: 1,
        padding: 16,
    },
    shippingCard: {
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    shippingContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    shippingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    shippingTextContainer: {
        marginLeft: 12,
        flex: 1,
    },
    shippingTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    shippingDetails: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#8B4513',
        marginLeft: 16,
    },
    radioButtonSelected: {
        backgroundColor: '#8B4513',
    },
    applyButton: {
        backgroundColor: '#8B4513',
        margin: 16,
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});