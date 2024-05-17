// src/utils/getBackendUrl.js

const getBackendUrl = () => {
    return process.env.BACKEND_ADDRESS || 'http://localhost:3001';
  };
  
export default getBackendUrl;