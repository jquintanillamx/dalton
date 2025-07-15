import React, { createContext, useContext } from 'react';

// Crear el contexto
const ApiContext = createContext(null);

// Hook para acceder al contexto
export const useApi = () => {
  return useContext(ApiContext);
};

// Proveedor del contexto que envolverá tus componentes
export const ApiProvider = ({ api, children }) => {
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
