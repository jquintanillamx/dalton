export const getColor = (seconds) => {
    if (seconds <= 40 && seconds > 30) {
      return '#28a745'; // Verde
    } else if (seconds <= 30 && seconds > 20) {
      return '#FFBD0C'; // Amarillo
    } else if (seconds <= 20 && seconds > 10) {
      return 'orange'; // Naranja
    } else if (seconds <= 10) {
      return 'red'; // Rojo
    }
  };
  