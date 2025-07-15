import { useState, useEffect } from 'react';

export const useWidgetAPI = () => {
  const [api, setApi] = useState(null);

  useEffect(() => {
    const widgetAPI = window.WS.widgetAPI;
    const workRequestId = window.workRequestId;
    const interactionId = window.interactionId;

    const apiInstance = workRequestId == null ? widgetAPI() : widgetAPI(interactionId);
    setApi(apiInstance);
  }, []);

  return api;
};

