import React from 'react';
import { Truck, Moon } from 'lucide-react';

function Header({ onReset, showReset }) {
  return (
    <header className="bg-warm-orange/90 backdrop-blur-sm shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-warm-yellow/30 to-warm-red/30"></div>
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Truck className="w-10 h-10 text-white animate-bounce-slow" />
            <h1 className="text-2xl md:text-3xl font-kid font-bold text-white drop-shadow-lg">
              Gute-Nacht-Geschichten 🌙
            </h1>
          </div>
          
          {showReset && (
            <button
              onClick={onReset}
              className="bg-white/90 hover:bg-white text-warm-orange font-bold py-2 px-4 rounded-full
                       transform transition-all duration-200 hover:scale-105 active:scale-95
                       shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <Moon className="w-4 h-4" />
              <span>Neue Geschichte</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Kleine fahrende Autos am unteren Rand */}
      <div className="h-2 bg-warm-brown/20">
        <div className="h-full flex items-center">
          <span className="text-xs animate-drive">🚗</span>
          <span className="text-xs animate-drive" style={{animationDelay: '5s'}}>🚚</span>
          <span className="text-xs animate-drive" style={{animationDelay: '10s'}}>🚜</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
