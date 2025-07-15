// src/mocks/MockApiContext.jsx
import { createContext, useContext } from "react";

const MockApiContext = createContext(null);

export const MockApiProvider = ({ children }) => {
  const mockApi = {
    getInteractionData: () => ({
      intrinsics: {
        ENGAGEMENT_PARAMETERS: {
          serviceId: "21", // <-- Aquí ahora usamos serviceId en string
          userId:"5213334587191"
        },
      },
      participants: [{ id: 1 }, { id: 2 }],
    }),
  };

  return (
    <MockApiContext.Provider value={mockApi}>
      {children}
    </MockApiContext.Provider>
  );
};

export const useApi = () => useContext(MockApiContext);
