import React, { useState } from 'react';
import { Sparkles, Car, Truck, Bus } from 'lucide-react';
import api from '../services/api';

function StoryGenerator({ onStoryGenerated, onError, setIsLoading }) {
  const [theme, setTheme] = useState('');
  const [characters, setCharacters] = useState('');
  const [age, setAge] = useState('5');

  const vehicleThemes = [
    '🚗 Der mutige kleine rote Flitzer',
    '🚚 Der freundliche Lastwagen',
    '🚜 Der flügge Traktor auf dem Bauernhof',
    '🚒 Das hilfsbereite Feuerwehrauto',
    '🚌 Der lustige Schulbus',
    '🚛 Der starke Kipplaster'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!theme.trim()) {
      onError('Bitte gib ein Thema für die Geschichte ein!');
      return;
    }

    setIsLoading(true);
    
    try {
      const storyData = await api.generateStory({
        theme: theme.trim(),
        characters: characters.trim(),
        age: parseInt(age)
      });

      if (storyData.success && storyData.story) {
        // Generiere Bilder für alle Abschnitte
        const imagePrompts = storyData.story.sections.map(section => section.imagePrompt);
        const imagesData = await api.generateBatchImages(imagePrompts);
        
        if (imagesData.success) {
          // Füge die Bild-URLs zu den Story-Abschnitten hinzu
          const storyWithImages = {
            ...storyData.story,
            sections: storyData.story.sections.map((section, index) => ({
              ...section,
              imageUrl: imagesData.imageUrls[index]
            }))
          };

          // Generiere Audio mit Timestamps
          const audioData = await api.generateAudioWithTimestamps(storyData.story.sections);
          
          if (audioData.success) {
            const completeStory = {
              ...storyWithImages,
              audio: audioData.audio,
              timestamps: audioData.timestamps,
              totalDuration: audioData.totalDuration
            };
            
            onStoryGenerated(completeStory);
          } else {
            throw new Error('Fehler beim Generieren der Sprachausgabe');
          }
        } else {
          throw new Error('Fehler beim Generieren der Bilder');
        }
      } else {
        throw new Error('Fehler beim Generieren der Geschichte');
      }
    } catch (error) {
      console.error('Generation error:', error);
      onError(error.message || 'Es ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="story-card">
        <h2 className="text-3xl font-kid font-bold text-warm-orange mb-6 text-center">
          Erstelle deine Traumgeschichte! 🌟
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2 text-warm-brown">
              Worüber soll die Geschichte sein? 🚗
            </label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="input-field"
              placeholder="z.B. Ein mutiges kleines Auto auf großer Reise"
              maxLength={100}
            />
            
            <div className="mt-3 flex flex-wrap gap-2">
              <p className="text-sm text-warm-brown/70 w-full">Oder wähle eine Idee:</p>
              {vehicleThemes.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setTheme(suggestion.substring(2))}
                  className="text-sm bg-soft-peach hover:bg-warm-yellow/30 px-3 py-1 rounded-full
                           transition-colors duration-200 text-warm-brown"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 text-warm-brown">
              Welche Charaktere sollen vorkommen? 🚙
            </label>
            <input
              type="text"
              value={characters}
              onChange={(e) => setCharacters(e.target.value)}
              className="input-field"
              placeholder="z.B. Flitzi das Auto, Brummi der LKW"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 text-warm-brown">
              Für welches Alter? 🎈
            </label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input-field cursor-pointer"
            >
              <option value="3">3 Jahre</option>
              <option value="4">4 Jahre</option>
              <option value="5">5 Jahre</option>
              <option value="6">6 Jahre</option>
              <option value="7">7 Jahre</option>
              <option value="8">8 Jahre</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center space-x-3 text-lg"
          >
            <Sparkles className="w-6 h-6" />
            <span>Geschichte zaubern!</span>
            <Car className="w-6 h-6 vehicle-float" />
          </button>
        </form>
      </div>
      
      {/* Dekorative Fahrzeuge */}
      <div className="mt-8 flex justify-center space-x-4">
        <Truck className="w-12 h-12 text-warm-orange/50 animate-wiggle" />
        <Bus className="w-12 h-12 text-warm-yellow/50 animate-bounce-slow" />
        <Car className="w-12 h-12 text-warm-red/50 animate-wiggle" style={{animationDelay: '0.5s'}} />
      </div>
    </div>
  );
}

export default StoryGenerator;
