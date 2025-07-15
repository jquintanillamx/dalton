export const fetchCompletionCodeId = async (searchString) => {
  try {
    // Verificar si el searchString está vacío
    if (!searchString || searchString.trim() === '') {
      throw new Error('El valor de búsqueda no puede estar vacío.');
    }

    const url = new URL('https://pomapp1.onecloud.ar:35888/VP_POM_Service/v4/completioncodes');  // URL fija

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'rest',
        'Authorization': import.meta.env.VITE_AUTH_HEADER,  // Authorization básica en Base64
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      // Aquí manejamos la respuesta HTTP, mostrando el código de estado
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    

    // Buscamos que el string de búsqueda coincida exactamente con la parte antes del guion medio
    const result = data.find((item) => {
      const namePartBeforeDash = item.name.split('-')[0].trim(); // Parte antes del guion medio
      return namePartBeforeDash === searchString; // Verificar si es exactamente igual al searchString
    });

    // Si se encontró, devolvemos el id
    if (result) {
      return { id: result.id, name: result.name };
    } else {
      
      return 'No se encontró el string en el name.';
    }
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      // Esto maneja errores de red
      throw new Error('Error de red: no se pudo establecer conexión con el servidor. Verifica la URL o tu conexión.');
    } else {
      // Esto maneja errores de la respuesta HTTP o errores de red no detectados
      throw new Error(`Error en la petición: ${err.message}`);
    }
  }
};
