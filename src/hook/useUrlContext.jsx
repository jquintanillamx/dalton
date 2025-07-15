import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const UrlContext = createContext();

// Proveedor del contexto
export const UrlProvider = ({ children }) => {
  const [urlOpened, setUrlOpened] = useState(false); // Estado para controlar si la URL está abierta
  const [openedWindow, setOpenedWindow] = useState(null); // Almacenar la referencia de la ventana

  return (
    <UrlContext.Provider value={{ urlOpened, setUrlOpened, openedWindow, setOpenedWindow }}>
      {children}
    </UrlContext.Provider>
  );
};

// Hook para usar el contexto
export const useUrlContext = () => useContext(UrlContext);
