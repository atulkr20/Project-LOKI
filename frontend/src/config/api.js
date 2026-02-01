// API Configuration - uses environment variable in production, localhost in development
// For Vercel deployment, set VITE_API_URL in Vercel environment variables

const getApiUrl = () => {
  // Check for environment variable (Vite uses VITE_ prefix)
  if (import.meta.env?.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:8000';
};

export const API_URL = getApiUrl();
export default API_URL;
