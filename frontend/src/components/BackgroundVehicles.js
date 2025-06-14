import React from 'react';

function BackgroundVehicles() {
  const vehicles = [
    { emoji: '🚗', size: 'text-4xl', top: '10%', animationDelay: '0s' },
    { emoji: '🚚', size: 'text-5xl', top: '25%', animationDelay: '7s' },
    { emoji: '🚒', size: 'text-3xl', top: '40%', animationDelay: '3s' },
    { emoji: '🚜', size: 'text-6xl', top: '60%', animationDelay: '10s' },
    { emoji: '🚌', size: 'text-4xl', top: '75%', animationDelay: '5s' },
    { emoji: '🚛', size: 'text-5xl', top: '85%', animationDelay: '15s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Fahrende Fahrzeuge */}
      {vehicles.map((vehicle, index) => (
        <div
          key={index}
          className={`absolute ${vehicle.size} opacity-20 animate-drive`}
          style={{
            top: vehicle.top,
            animationDelay: vehicle.animationDelay,
            animationDuration: '25s'
          }}
        >
          {vehicle.emoji}
        </div>
      ))}
      
      {/* Statische Wolken */}
      <div className="absolute top-10 left-20 text-6xl opacity-10 animate-float">☁️</div>
      <div className="absolute top-20 right-32 text-5xl opacity-10 animate-float" style={{animationDelay: '2s'}}>☁️</div>
      <div className="absolute top-32 left-1/2 text-7xl opacity-10 animate-float" style={{animationDelay: '4s'}}>☁️</div>
      
      {/* Straße am unteren Rand */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-warm-brown/10 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-warm-brown/20"></div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-around">
          <div className="w-16 h-1 bg-warm-yellow/40"></div>
          <div className="w-16 h-1 bg-warm-yellow/40"></div>
          <div className="w-16 h-1 bg-warm-yellow/40"></div>
          <div className="w-16 h-1 bg-warm-yellow/40"></div>
          <div className="w-16 h-1 bg-warm-yellow/40"></div>
          <div className="w-16 h-1 bg-warm-yellow/40"></div>
        </div>
      </div>
    </div>
  );
}

export default BackgroundVehicles;
