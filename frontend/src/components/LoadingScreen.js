import React from 'react';
import { motion } from 'framer-motion';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-warm-orange/90 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl mb-6"
        >
          🚗
        </motion.div>
        
        <div className="bg-white/90 rounded-2xl p-6 shadow-2xl max-w-sm mx-auto">
          <h2 className="text-2xl font-kid font-bold text-warm-orange mb-3">
            Deine Geschichte wird gezaubert! ✨
          </h2>
          
          <div className="space-y-2 text-warm-brown">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center space-x-2"
            >
              <span className="spinner"></span>
              <span>Geschichte wird geschrieben...</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex items-center justify-center space-x-2"
            >
              <span>🎨</span>
              <span>Bilder werden gemalt...</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
              className="flex items-center justify-center space-x-2"
            >
              <span>🎙️</span>
              <span>Stimme wird vorbereitet...</span>
            </motion.p>
          </div>
          
          <motion.div
            className="mt-4 text-3xl"
            animate={{ x: [-50, 50, -50] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            🚚
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
