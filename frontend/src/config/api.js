// src/config/api.js

const getApiUrl = () => {
  if (import.meta.env?.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:8000';
};

export const API_URL = getApiUrl();
export default API_URL;