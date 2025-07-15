
import { createRequest } from './requestUtils'; // Importar desde requestUtils
import { postURL } from './utils';


const urlToken = import.meta.env.VITE_URL_TOKEN
export const obtenerToken = async (compania) => {
    const tokenRequest = createRequest("consultToken", compania);
  try {
    const response = await postURL(urlToken, tokenRequest);
    return response.token; // Devuelve solo el token
  } catch (error) {
    throw new Error("Fallo en API Token: " + error.message);
  }
};
