import { useState, useEffect } from "react";

export const useCallState = (testData) => {
  const [stateCall, setStateCall] = useState(testData.state); // Inicializa con el valor de testData
  const [isOnAWC, setIsOnAWC] = useState(testData.state === "ACW");
  const [direction, setDirection] = useState(testData.direction);

  useEffect(() => {
    const handleInteractionEvent = (data) => {
      setDirection(data.direction);
      if (data.state && data.state !== stateCall) {
        setStateCall(data.state);
        setIsOnAWC(data.state === "ACW");
      }
    };

    // Simula la llamada al evento con los datos de testData
    handleInteractionEvent(testData);

  }, [testData, stateCall]); // Añade testData como dependencia para re-renderizar cuando cambie

  return {
    isOnAWC,
    direction,
    stateCall,
  };
};
