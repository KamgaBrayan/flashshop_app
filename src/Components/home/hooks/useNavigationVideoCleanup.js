import { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const useNavigationVideoCleanup = (cleanupVideosFunction) => {
    // Arrêter les vidéos quand on perd le focus de l'écran
    useFocusEffect(() => {
        return () => {
            // Cette fonction est appelée quand on quitte l'écran
            if (cleanupVideosFunction) {
                cleanupVideosFunction();
            }
        };
    });

    // Arrêter les vidéos quand le composant se démonte
    useEffect(() => {
        return () => {
            if (cleanupVideosFunction) {
                cleanupVideosFunction();
            }
        };
    }, [cleanupVideosFunction]);
};