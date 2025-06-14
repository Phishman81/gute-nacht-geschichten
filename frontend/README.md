# Frontend - Gute-Nacht-Geschichten 🚗✨

React Frontend für die Gute-Nacht-Geschichten Web-App mit Fahrzeug-Thema.

## 🎨 Features

- **Warme Farben**: Orange, Gelb und Pfirsich-Töne für eine gemütliche Atmosphäre
- **Fahrzeug-Thema**: Animierte Autos, LKWs und Baufahrzeuge
- **Kinderfreundliche Schrift**: Comic Neue und Quicksand für gute Lesbarkeit
- **Responsive Design**: Funktioniert auf Desktop, Tablet und Handy
- **Animationen**: Sanfte Übergänge und lustige Fahrzeug-Animationen

## 🚀 Installation

1. Installiere die Dependencies:
```bash
npm install
```

2. Starte die Entwicklungsumgebung:
```bash
npm start
```

Die App läuft dann auf `http://localhost:3000`

## 🌐 Deployment auf GitHub Pages

1. Stelle sicher, dass in `package.json` die richtige Homepage eingetragen ist:
```json
"homepage": "https://phishman81.github.io/gute-nacht-geschichten"
```

2. Baue und deploye die App:
```bash
npm run deploy
```

Die App ist dann erreichbar unter:
https://phishman81.github.io/gute-nacht-geschichten

## 🎨 Design-System

### Farben
- **Warm Orange**: #FF6B35 (Primärfarbe)
- **Warm Yellow**: #F7931E (Akzentfarbe)
- **Warm Red**: #E74C3C (Hover-Effekte)
- **Soft Pink**: #FFB6C1 (Hintergründe)
- **Soft Peach**: #FFDAB9 (Sekundäre Hintergründe)
- **Cream**: #FFF8DC (Haupthintergrund)

### Schriftarten
- **Überschriften**: Comic Neue (spielerisch)
- **Fließtext**: Quicksand (gut lesbar)

### Animationen
- Fahrende Fahrzeuge im Hintergrund
- Schwebende Wolken
- Wackelnde Icons
- Sanfte Übergänge zwischen Bildern

## 📁 Komponenten

- **App.js**: Hauptkomponente mit State-Management
- **Header**: Navigation mit animiertem LKW-Icon
- **StoryGenerator**: Formular zur Geschichtenerstellung
- **StoryDisplay**: Anzeige der generierten Geschichte mit Bildern und Audio
- **BackgroundVehicles**: Animierte Fahrzeuge im Hintergrund
- **LoadingScreen**: Ladebildschirm mit fahrendem Auto

## 🔧 Umgebungsvariablen

Für lokale Entwicklung erstelle eine `.env` Datei:
```
REACT_APP_API_URL=http://localhost:3001
```

Für Produktion wird automatisch die Render URL verwendet.
