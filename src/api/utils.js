export const postURL = async (URL, objeto, timeout = 150000) => {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    );
  
    const fetchPromise = fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(objeto),
    });
  
    try {
      const response = await Promise.race([fetchPromise, timeoutPromise]);
  
      if (!response.ok) {
        console.log("Error en respuestaaaa")
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  