
import { createRequest } from './requestUtils'; // Importar desde requestUtils
import { postURL } from './utils';

const urlGestionCobranza = import.meta.env.VITE_URL_GC

export const gestionarCobranza = async (compania, token, pan, tipoPanEncry) => {
  const request = createRequest("gestionCobranza", compania, token, pan, tipoPanEncry);

  try {
    const response = await postURL(urlGestionCobranza, request);
    if (response && response.codigo === "00") {
      return response;
    } else {
      throw new Error("Fallo en API Gestion Cobranza: Código incorrecto");
    }
  } catch (error) {
    throw new Error("Fallo en API Gestion Cobranza: " + error.message);
  }
};
