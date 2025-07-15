export const apiConnection = async (url , data) => {
    try {
      const response = await fetch(url, {
        method: 'POST', // Método HTTP
        headers: {
          'Content-Type': 'application/json', // Tipo de contenido que se está enviando
          // Agrega otros encabezados si es necesario, como tokens de autenticación
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      const result = await response.json(); // Convierte la respuesta a JSON
      return result; // Retorna el resultado de la API
    } catch (error) {
      console.error('Error al hacer POST:', error);
      return null; // Manejo del error
    }
  };
  