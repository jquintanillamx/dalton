import { useEffect, useState } from 'react';
import { useApi } from '../context/ApiContext'; // Usamos el contexto de la API

export const useDataEvent = (eventName) => {
  const api = useApi(); // Obtener la instancia de la API desde el contexto
  const [eventData, setEventData] = useState(null); // Estado para almacenar los datos del evento

  useEffect(() => {
    if (api && eventName) {
      // Suscribirse al evento usando el nombre del evento pasado como parámetro
      api.onDataEvent(eventName, (data) => {
        
        setEventData(data); // Actualizar el estado con los datos del evento
      });

      // Limpieza: eliminar la suscripción al evento al desmontar
      return () => {
        if (api && eventName) {
          api.removeDataEvent(eventName); // Desuscribirse del evento usando removeDataEvent
          
        }
      };
    }
  }, [api, eventName]); // Dependencia de la API y del nombre del evento

  return eventData; // Retornar los datos del evento
};
