import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function StoryDisplay({ story }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressInterval = useRef(null);

  useEffect(() => {
    // Erstelle Audio-Element
    if (story.audio) {
      const audio = new Audio(`data:${story.audio.mimeType};base64,${story.audio.data}`);
      audioRef.current = audio;
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
      });

      return () => {
        audio.pause();
        audio.removeEventListener('ended', () => {});
      };
    }
  }, [story]);

  useEffect(() => {
    // Update der Bilder basierend auf Audio-Fortschritt
    if (isPlaying && progressInterval.current === null) {
      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          const currentTime = audioRef.current.currentTime;
          const duration = audioRef.current.duration;
          
          if (duration) {
            setProgress((currentTime / duration) * 100);
            
            // Finde den aktuellen Abschnitt basierend auf Timestamps
            const section = story.timestamps.findIndex(ts => 
              currentTime >= ts.startTime && currentTime < ts.endTime
            );
            
            if (section !== -1 && section !== currentSection) {
              setCurrentSection(section);
            }
          }
        }
      }, 100);
    } else if (!isPlaying && progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, currentSection, story.timestamps]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const navigateSection = (direction) => {
    const newSection = currentSection + direction;
    if (newSection >= 0 && newSection < story.sections.length) {
      setCurrentSection(newSection);
      
      // Springe zur entsprechenden Audio-Position
      if (audioRef.current && story.timestamps[newSection]) {
        audioRef.current.currentTime = story.timestamps[newSection].startTime;
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Titel */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-kid font-bold text-warm-orange text-center mb-8 drop-shadow-lg"
      >
        {story.title} 🚗✨
      </motion.h1>

      {/* Bild-Anzeige */}
      <div className="story-card mb-6 relative">
        <div className="relative h-96 rounded-xl overflow-hidden bg-soft-peach">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSection}
              src={story.sections[currentSection].imageUrl}
              alt={`Bild ${currentSection + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          
          {/* Navigation Buttons */}
          <button
            onClick={() => navigateSection(-1)}
            disabled={currentSection === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white
                     rounded-full p-2 shadow-lg transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6 text-warm-orange" />
          </button>
          
          <button
            onClick={() => navigateSection(1)}
            disabled={currentSection === story.sections.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white
                     rounded-full p-2 shadow-lg transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6 text-warm-orange" />
          </button>
        </div>
        
        {/* Bild-Indikator */}
        <div className="flex justify-center mt-4 space-x-2">
          {story.sections.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSection 
                  ? 'w-8 bg-warm-orange' 
                  : 'w-2 bg-warm-orange/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Audio Player */}
      <div className="story-card mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={togglePlayPause}
            className="btn-primary flex items-center space-x-2"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isPlaying ? 'Pause' : 'Anhören'}</span>
          </button>
          
          <Volume2 className="w-6 h-6 text-warm-orange animate-pulse" />
          
          <div className="flex-1">
            <div className="bg-soft-peach rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-warm-orange h-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>
        
        <p className="text-sm text-warm-brown/70 text-center">
          🎙️ Höre dir die Geschichte an, während die Bilder automatisch wechseln!
        </p>
      </div>

      {/* Text-Anzeige */}
      <div className="story-card">
        <h2 className="text-2xl font-kid font-bold text-warm-orange mb-4">
          Teil {currentSection + 1} von {story.sections.length}
        </h2>
        
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-warm-brown leading-relaxed text-lg">
            {story.sections[currentSection].text}
          </p>
        </motion.div>
        
        {/* Fahrzeug-Dekoration */}
        <div className="mt-6 text-center text-2xl space-x-2">
          <span className="inline-block animate-bounce-slow">🚗</span>
          <span className="inline-block animate-bounce-slow" style={{animationDelay: '0.5s'}}>🚚</span>
          <span className="inline-block animate-bounce-slow" style={{animationDelay: '1s'}}>🚜</span>
        </div>
      </div>
    </div>
  );
}

export default StoryDisplay;
