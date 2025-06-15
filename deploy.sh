#!/bin/bash
# Deploy script für Windows/Mac/Linux

echo "🚗 Starte Deployment der Gute-Nacht-Geschichten App..."

# In Frontend-Ordner wechseln
cd frontend

# Dependencies installieren
echo "📦 Installiere Dependencies..."
npm install

# Build erstellen
echo "🔨 Erstelle Production Build..."
REACT_APP_API_URL=https://gute-nacht-geschichten.onrender.com npm run build

# Deployment
echo "🚀 Deploye zu GitHub Pages..."
npm run deploy

echo "✅ Fertig! Deine App sollte in wenigen Minuten live sein unter:"
echo "👉 https://phishman81.github.io/gute-nacht-geschichten"
