// utils.js



// Función que busca el code basado en las primeras letras del friendlyName
export const codigoAnalitycs = (objeto, letras) => {

  
   
    
    
    const resultado = objeto.find(item => item.friendlyName.startsWith(letras));
    return resultado ? resultado.code : '00107';
  };
  