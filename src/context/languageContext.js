import React, { createContext, useContext } from 'react';
import { changeAppLanguage } from './translation/i18n';

// Le contexte n'a plus besoin de stocker la langue, juste la fonction pour la changer.
export const LanguageContext = createContext({
  changeLanguage: async (lang) => { console.warn("LanguageProvider not yet mounted"); },
});

// Hook personnalisé pour un accès facile
export const useLanguageActions = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // `i18next` gère l'état de la langue. Les composants utilisant `useTranslation`
  // se mettront à jour automatiquement. Ce provider ne sert qu'à exposer l'action.
  
  const contextValue = {
    changeLanguage: changeAppLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};