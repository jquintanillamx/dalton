/* import { postURL } from './utils';
import { createRequest } from './utils/requestUtils'; // Importar desde requestUtils
 */

import { createRequest } from "./requestUtils";
import { postURL } from "./utils";

const urlEncriptaPan = import.meta.env.VITE_URL_EPAN;

export const encriptaPan = async (compania, token, cuenta, numeroTarjeta) => {
  let tipoPanEncry = "1";

  
  const cuentaRef = validarNumeroCuenta(cuenta.trim());
  const tarjetaRef = validarNumeroTarjeta(numeroTarjeta.trim());

  try {
    const encryPANResponse = await postURL(
      urlEncriptaPan,
      createRequest("encriptaPan", compania, token, cuentaRef, tipoPanEncry)
    );
    return verificarRespuesta(encryPANResponse, compania, token, tipoPanEncry);
  } catch (error) {
    tipoPanEncry = "2"; // Cambia el tipoPanEncry
    try {
      const encryPANResponse = await postURL(
        urlEncriptaPan,
        createRequest("encriptaPan", compania, token, tarjetaRef, tipoPanEncry)
      );
      return verificarRespuesta(
        encryPANResponse,
        compania,
        token,
        tipoPanEncry
      );
    } catch (error) {
      throw new Error("Fallo en EncriptaPan: " + error.message);
    }
  }
};

// Implementación de verificarRespuesta
function verificarRespuesta(encryPANResponse, compania, token, tipoPanEncry) {
  if (encryPANResponse && encryPANResponse.codigo === "00") {
    return {
      ...encryPANResponse,
      tipoCompania: compania,
      token,
      tipoPan: tipoPanEncry,
    };
  } else {
    throw new Error(
      `Fallo en API EncriptaPan: Código incorrecto (${encryPANResponse.codigo})`
    );
  }
}

function validarNumeroCuenta(numero) {
  // Convertir el valor a string si no lo es
  
  const numeroStr = String(numero);

  // Validar que el número tiene solo dígitos
  if (!/^\d+$/.test(numeroStr)) {
    throw new Error("El número debe contener solo dígitos.");
  }

  // Si la longitud es mayor a 10, es inválido
  if (numeroStr.length > 10) {
    throw new Error("El número no puede tener más de 10 dígitos.");
  }

  // Anteponer ceros si tiene menos de 10 dígitos
  return numeroStr.padStart(10, "0");
}

function validarNumeroTarjeta(numeroTarjeta) {
  // Convertir el valor a string si no lo es
  const numeroStr = String(numeroTarjeta);

  // Validar que el número tiene solo dígitos
  if (!/^\d+$/.test(numeroStr)) {
    throw new Error("El número debe contener solo dígitos.");
  }

  // Si la longitud es mayor a 10, es inválido
  if (numeroStr.length > 16) {
    throw new Error("El número no puede tener más de 10 dígitos.");
  }

  // Anteponer ceros si tiene menos de 10 dígitos
  return numeroStr.padStart(16, "0");
}
