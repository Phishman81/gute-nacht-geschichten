const express = require('express');
const router = express.Router();
const openai = require('../config/openai');

// POST /api/image/generate
router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ 
        error: 'Bitte gib eine Bildbeschreibung an.' 
      });
    }

    // Erweitere den Prompt für kinderfreundliche Bilder
    const enhancedPrompt = `${prompt}, niedlich, kinderfreundlich, Cartoon-Stil, bunte Farben, 
                           sanfte Beleuchtung, märchenhaft, digital art, illustration`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    res.json({
      success: true,
      imageUrl: response.data[0].url
    });

  } catch (error) {
    console.error('Image generation error:', error);
    res.status(500).json({ 
      error: 'Fehler beim Generieren des Bildes',
      details: error.message 
    });
  }
});

// POST /api/image/generate-batch
router.post('/generate-batch', async (req, res) => {
  try {
    const { prompts } = req.body;

    if (!prompts || !Array.isArray(prompts)) {
      return res.status(400).json({ 
        error: 'Bitte gib ein Array von Bildbeschreibungen an.' 
      });
    }

    // Generiere alle Bilder parallel
    const imagePromises = prompts.map(prompt => {
      const enhancedPrompt = `${prompt}, niedlich, kinderfreundlich, Cartoon-Stil, bunte Farben, 
                             sanfte Beleuchtung, märchenhaft, digital art, illustration`;
      
      return openai.images.generate({
        model: "dall-e-3",
        prompt: enhancedPrompt,
        size: "1024x1024",
        quality: "standard",
        n: 1,
      });
    });

    const responses = await Promise.all(imagePromises);
    const imageUrls = responses.map(response => response.data[0].url);

    res.json({
      success: true,
      imageUrls
    });

  } catch (error) {
    console.error('Batch image generation error:', error);
    res.status(500).json({ 
      error: 'Fehler beim Generieren der Bilder',
      details: error.message 
    });
  }
});

module.exports = router;
