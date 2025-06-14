import axios from 'axios';

// Backend URL - in Produktion wird das deine Render URL sein
const API_URL = process.env.REACT_APP_API_URL || 'https://gute-nacht-geschichten.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Funktionen
const apiService = {
  // Story generieren
  generateStory: async (data) => {
    try {
      const response = await api.post('/api/story/generate', data);
      return response.data;
    } catch (error) {
      console.error('Story generation error:', error);
      throw error.response?.data?.error || error.message;
    }
  },

  // Einzelnes Bild generieren
  generateImage: async (prompt) => {
    try {
      const response = await api.post('/api/image/generate', { prompt });
      return response.data;
    } catch (error) {
      console.error('Image generation error:', error);
      throw error.response?.data?.error || error.message;
    }
  },

  // Mehrere Bilder generieren
  generateBatchImages: async (prompts) => {
    try {
      const response = await api.post('/api/image/generate-batch', { prompts });
      return response.data;
    } catch (error) {
      console.error('Batch image generation error:', error);
      throw error.response?.data?.error || error.message;
    }
  },

  // Audio generieren
  generateAudio: async (text, voice = 'nova') => {
    try {
      const response = await api.post('/api/audio/generate', { text, voice }, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Audio generation error:', error);
      throw error.response?.data?.error || error.message;
    }
  },

  // Audio mit Timestamps generieren
  generateAudioWithTimestamps: async (sections, voice = 'nova') => {
    try {
      const response = await api.post('/api/audio/generate-with-timestamps', { 
        sections, 
        voice 
      });
      return response.data;
    } catch (error) {
      console.error('Audio with timestamps generation error:', error);
      throw error.response?.data?.error || error.message;
    }
  },

  // Health Check
  checkHealth: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  }
};

export default apiService;
