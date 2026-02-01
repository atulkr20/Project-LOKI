// src/config/api.js

const getApiUrl = () => {
  // 1. Check if the browser is currently running on localhost (Your PC)
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:8000';
  }
  
  // 2. If NOT on localhost (meaning you are on Vercel), use the live Render Backend
  return 'https://project-loki.onrender.com';
};

export const API_URL = getApiUrl();
export default API_URL;