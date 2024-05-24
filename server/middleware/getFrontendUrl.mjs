// middleware/getFrontendUrl.js
import fs from 'fs'
import path from 'path'

const getFrontendUrl = () => {
    const filePath = path.resolve(__dirname, '../../.production_variables.json');
    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const config = JSON.parse(fileContent);
        return config.frontend_url || 'http://localhost:3000';
      } else {
        return 'http://localhost:3000';
      }
    } catch (err) {
      console.error('Error reading .production_variables.json:', err);
      return 'http://localhost:3000';
    }
  };

export default getFrontendUrl;