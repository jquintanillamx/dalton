// Formatea la fecha en formato DD/MM/YYYY
export const formatearFecha = (date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };
  
  // Formatea la hora en formato HH:MM:SS
  export const formatearHora = (date) => {
    const horas = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");
    const segundos = String(date.getSeconds()).padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  };
  
  // Crea una solicitud genérica para las API según el servicio y parámetros
  export const createRequest = (nombreServicio, tipoCompania, token = "", pan = "", tipoPan = "") => {
    return {
      fechaTransaccion: formatearFecha(new Date()),
      horaTransaccion: formatearHora(new Date()),
      nombreServicio,
      tipoCompania,
      ipOrigen: "20.75.61.25",
      solicitadoPor: "5", // Este valor podría ser dinámico si lo necesitas
      pan,
      tipoPan,
      token,
    };
  };
  