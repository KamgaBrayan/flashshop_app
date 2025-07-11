import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    formContainer: {
      backgroundColor: '#fff',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    photoContainer: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginBottom: 15,
    },
    photoPreview: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
    },
    photoPlaceholder: {
      width: '100%',
      height: '100%',
      borderRadius: 50,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#8B4513',
      borderStyle: 'dashed',
    },
    photoText: {
      color: '#8B4513',
      fontSize: 14,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#8B4513',
      marginBottom: 15,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
      backgroundColor: '#f9f9f9',
    },
    addButton: {
      backgroundColor: '#8B4513',
      padding: 15,
      borderRadius: 8,
      marginVertical: 15,
    },
    addButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    listTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#8B4513',
      marginTop: 20,
      marginBottom: 10,
    },
    listContent: {
      paddingBottom: 20,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginHorizontal: 15,
      marginVertical: 8,
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    vendorPhoto: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#8B4513',
      marginBottom: 5,
    },
    contact: {
      fontSize: 14,
      color: '#666',
      marginBottom: 3,
    },
    address: {
      fontSize: 12,
      color: '#888',
    },
    buttonsContainer: {
      justifyContent: 'space-around',
      paddingLeft: 10,
    },
    button: {
      padding: 8,
      borderRadius: 5,
      marginBottom: 5,
      width: 80,
    },
    editButton: {
      backgroundColor: '#8B4513',
    },
    deleteButton: {
      backgroundColor: '#FF0000',
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 12,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 20,
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#8B4513',
      marginBottom: 15,
      textAlign: 'center',
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    modalButton: {
      flex: 0.47,
      padding: 12,
      borderRadius: 8,
    },
    cancelButton: {
      backgroundColor: '#D2691E',
    },
    saveButton: {
      backgroundColor: '#8B4513',
    },
  });
  


export default styles;