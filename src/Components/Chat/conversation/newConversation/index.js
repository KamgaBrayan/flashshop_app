// src/screens/Conversations/NewConversationScreen/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import snappyApiService from '../../../../service/snappyApiService/snappyApiService';
import { useAuth } from '../../../../context/authContext/authContext';
// Importe tes styles (à créer)
// import { styles } from './style'; 

const NewConversationScreen = () => {
  const navigation = useNavigation();
  const { user: yowyobUser, snappyUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await snappyApiService.findAllUsersInProject();
        // Filtrer l'utilisateur actuel de la liste
        const otherUsers = allUsers.filter(u => u.id !== snappyUser?.id);
        setUsers(otherUsers);
      } catch (error) {
        // L'erreur est déjà notifiée
      } finally {
        setIsLoading(false);
      }
    };

    if (snappyUser?.id) {
      fetchUsers();
    }
  }, [snappyUser]);

  const handleSelectUser = (selectedUser) => {
    // Naviguer vers l'écran de chat avec les infos de l'utilisateur sélectionné
    navigation.navigate('Chat', {
      interlocutorId: selectedUser.id,
      interlocutorName: selectedUser.displayName,
      interlocutorAvatar: selectedUser.avatar,
      currentSnappyUserId: snappyUser.id,
    });
  };

  if (isLoading) {
    return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 16 }}>Start a new chat</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => handleSelectUser(item)}
            style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}
          >
            <Text style={{ fontSize: 18 }}>{item.displayName}</Text>
            <Text style={{ color: 'gray' }}>{item.email}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No other users found.</Text>}
      />
    </SafeAreaView>
  );
};

export default NewConversationScreen;