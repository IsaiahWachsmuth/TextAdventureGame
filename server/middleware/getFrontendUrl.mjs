// middleware/getFrontendUrl.js

const getFrontendUrl = () => {
    return process.env.FRONTEND_ADDRESS || 'http://localhost:3000';
};

export default getFrontendUrl;