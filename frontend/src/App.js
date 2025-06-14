import React, { useState } from 'react';
import StoryGenerator from './components/StoryGenerator';
import StoryDisplay from './components/StoryDisplay';
import BackgroundVehicles from './components/BackgroundVehicles';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [currentStory, setCurrentStory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStoryGenerated = (story) => {
    setCurrentStory(story);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setIsLoading(false);
  };

  const handleReset = () => {
    setCurrentStory(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-peach to-cream relative overflow-hidden">
      <BackgroundVehicles />
      
      <div className="relative z-10">
        <Header onReset={handleReset} showReset={currentStory !== null} />
        
        <main className="container mx-auto px-4 py-8">
          {error && (
            <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-lg text-red-700">
              <p className="font-bold">Oops! 🚗</p>
              <p>{error}</p>
            </div>
          )}

          {!currentStory ? (
            <StoryGenerator 
              onStoryGenerated={handleStoryGenerated}
              onError={handleError}
              setIsLoading={setIsLoading}
            />
          ) : (
            <StoryDisplay story={currentStory} />
          )}
        </main>
      </div>

      {isLoading && <LoadingScreen />}
    </div>
  );
}

export default App;
