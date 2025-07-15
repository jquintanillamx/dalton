export const fetchSetCompletionCodeId = async (code, PIM) => {
  try {
    const url = new URL(`https://pomapp1.onecloud.ar:35888/VP_POM_Service/v4/completioncodes/${code}/pimsessions/${PIM}`);  // URL fija

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'rest',
        'Authorization': import.meta.env.VITE_AUTH_HEADER,  // Authorization básica en Base64
        'Content-Type': 'application/json',
      },
    });

    // Comprobar si la respuesta HTTP fue exitosa
    if (!res.ok) {
      // Aquí manejamos la respuesta HTTP, mostrando el código de estado
      throw new Error(`Request failed with status ${res.status}`);
    }

    const result = await res.json();

    // Si la respuesta contiene "result": true, devolvemos true
    if (result.result === true) {
      return true; // Éxito
    }

    // Si existe un código de error, devolvemos false y lanzamos un error
    if (result.errorCode) {
      console.error(`Error ${result.errorCode}: ${result.errorMessage}`);
      return false; // Falla por error en la respuesta
    }

    // Manejo por si la respuesta es inesperada
    console.warn('La operación se completó, pero la respuesta fue inesperada.');
    return false; // Falla por respuesta inesperada

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
