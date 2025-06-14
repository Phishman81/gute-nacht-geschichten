const express = require('express');
const router = express.Router();
const openai = require('../config/openai');

// POST /api/story/generate
router.post('/generate', async (req, res) => {
  try {
    const { theme, characters, age } = req.body;

    // Validierung
    if (!theme || !age) {
      return res.status(400).json({ 
        error: 'Bitte gib ein Thema und Alter an.' 
      });
    }

    // System-Prompt für kinderfreundliche Geschichten
    const systemPrompt = `Du bist ein kreativer Geschichtenerzähler für Kinder im Alter von ${age} Jahren.
    Erstelle eine beruhigende Gute-Nacht-Geschichte, die etwa 3-4 Minuten Vorlesezeit hat.
    Die Geschichte soll in 3 Abschnitte unterteilt sein, für die jeweils ein Bild generiert werden kann.
    
    Wichtig:
    - Verwende einfache, altersgerechte Sprache
    - Die Geschichte soll beruhigend und positiv sein
    - Kein gruseliger oder aufregender Inhalt
    - Ein sanftes, glückliches Ende
    
    Gib die Geschichte im folgenden JSON-Format zurück:
    {
      "title": "Titel der Geschichte",
      "sections": [
        {
          "text": "Text des ersten Abschnitts...",
          "imagePrompt": "Bildbeschreibung für DALL-E: freundlich, kindgerecht, Cartoon-Stil"
        },
        // 2 weitere Abschnitte
      ]
    }`;

    const userPrompt = `Erstelle eine Gute-Nacht-Geschichte zum Thema: ${theme}.
    ${characters ? `Hauptcharaktere: ${characters}` : ''}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 2000
    });

    const story = JSON.parse(completion.choices[0].message.content);
    
    res.json({
      success: true,
      story
    });

  } catch (error) {
    console.error('Story generation error:', error);
    res.status(500).json({ 
      error: 'Fehler beim Generieren der Geschichte',
      details: error.message 
    });
  }
});

module.exports = router;
