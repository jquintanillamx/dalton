// src/mocks/MockDataEventProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";

const DataEventContext = createContext(null);

export const MockDataEventProvider = ({ children }) => {
  const [interactionData, setInteractionData] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInteractionData({
        state: "active",
        direction: "inbound",
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <DataEventContext.Provider value={interactionData}>
      {children}
    </DataEventContext.Provider>
  );
};

export const useDataEvent = () => useContext(DataEventContext);
