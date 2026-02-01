// src/config/api.js

const getApiUrl = () => {
  // Check if the browser is currently running on localhost (Your PC)
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:8000';
  }
  
  // If NOT on localhost (meaning you are on Vercel), use the live Render Backend
  // Make sure this is your EXACT Render URL without a trailing slash
  return 'https://project-loki-api.onrender.com';
};

export const API_URL = getApiUrl();
export default API_URL;