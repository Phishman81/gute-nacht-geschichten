require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Route imports
const storyRoutes = require('./routes/story');
const imageRoutes = require('./routes/image');
const audioRoutes = require('./routes/audio');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://phishman81.github.io' 
    : 'http://localhost:3000'
}));

app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 10 // Max 10 Requests pro IP
});

app.use('/api/', limiter);

// Routes
app.use('/api/story', storyRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/audio', audioRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Etwas ist schief gelaufen!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
