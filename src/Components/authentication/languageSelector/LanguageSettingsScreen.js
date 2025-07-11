// src/screens/Settings/LanguageSettingsScreen/index.js
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LanguageSelector from '.';
import AppHeader from '../../../reusableComponents/header';

const LanguageSettingsScreen = () => {
    const navigation = useNavigation();

    // Le callback 'onLanguageSelected' du composant LanguageSelector
    // n'est pas nécessaire ici, car on ne veut pas déclencher une navigation
    // automatique comme au premier lancement de l'app. L'utilisateur peut simplement
    // changer la langue et revenir en arrière.
    const handleLanguageSelection = () => {
        // Optionnel: on peut afficher une notification ou revenir en arrière automatiquement.
        // Pour l'instant, on laisse l'utilisateur revenir manuellement.
        console.log("Language has been changed from settings.");
    };

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader 
                title="Change Language" 
                onGoBack={() => navigation.goBack()} 
            />
            <View style={styles.content}>
                {/* On passe `showWelcomeMessage={false}` (ou on ne met rien, car false est la valeur par défaut) */}
                <LanguageSelector onLanguageSelected={handleLanguageSelection} showWelcomeMessage={false} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Correspond au fond de LanguageSelector
    },
    content: {
        flex: 1,
        justifyContent: 'center', // Pour centrer le contenu comme dans la version standalone
    }
});

export default LanguageSettingsScreen;