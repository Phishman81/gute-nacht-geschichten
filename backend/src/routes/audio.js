const express = require('express');
const router = express.Router();
const openai = require('../config/openai');

// POST /api/audio/generate
router.post('/generate', async (req, res) => {
  try {
    const { text, voice = 'nova' } = req.body;

    if (!text) {
      return res.status(400).json({ 
        error: 'Bitte gib einen Text an.' 
      });
    }

    // Generiere Audio mit OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice, // nova, alloy, echo, fable, onyx, shimmer
      input: text,
      speed: 0.9 // Etwas langsamer für Kinder
    });

    // Konvertiere Response zu Buffer
    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Sende Audio als Response
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': buffer.length
    });
    
    res.send(buffer);

  } catch (error) {
    console.error('Audio generation error:', error);
    res.status(500).json({ 
      error: 'Fehler beim Generieren der Sprachausgabe',
      details: error.message 
    });
  }
});

// POST /api/audio/generate-with-timestamps
router.post('/generate-with-timestamps', async (req, res) => {
  try {
    const { sections, voice = 'nova' } = req.body;

    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({ 
        error: 'Bitte gib die Story-Abschnitte an.' 
      });
    }

    // Kombiniere alle Texte mit Pausen-Markern
    const fullText = sections.map(section => section.text).join(' ... ');
    
    // Generiere Audio
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: fullText,
      speed: 0.9
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Berechne geschätzte Zeitstempel basierend auf Textlänge
    // (Durchschnittlich ~150 Wörter pro Minute bei Speed 0.9)
    const wordsPerSecond = 2.25;
    let currentTime = 0;
    const timestamps = [];

    sections.forEach((section, index) => {
      const wordCount = section.text.split(' ').length;
      const duration = wordCount / wordsPerSecond;
      
      timestamps.push({
        sectionIndex: index,
        startTime: currentTime,
        endTime: currentTime + duration
      });
      
      currentTime += duration + 2; // +2 Sekunden Pause zwischen Abschnitten
    });

    // Sende Audio-URL und Timestamps
    // In Produktion würdest du das Audio in einen Cloud Storage hochladen
    // und die URL zurückgeben. Für jetzt Base64:
    const audioBase64 = buffer.toString('base64');
    
    res.json({
      success: true,
      audio: {
        data: audioBase64,
        mimeType: 'audio/mpeg'
      },
      timestamps,
      totalDuration: currentTime
    });

  } catch (error) {
    console.error('Audio generation with timestamps error:', error);
    res.status(500).json({ 
      error: 'Fehler beim Generieren der Sprachausgabe',
      details: error.message 
    });
  }
});

module.exports = router;
