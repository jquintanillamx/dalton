import { useState, useEffect } from 'react';

export const useTimer = (initialSeconds) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer); // Limpia el intervalo al desmontar
    }
  }, [seconds]);

  return [seconds, setSeconds];
};
