import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    
    addressList: {
        flex: 1,
        padding: 16,
    },
    addressCard: {
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
    addressContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    addressLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    addressTextContainer: {
        marginLeft: 12,
        flex: 1,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    addressText: {
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
    addNewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#8B4513',
        marginTop: 8,
    },
    addNewText: {
        color: '#8B4513',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
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