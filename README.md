# 🌙 Gute-Nacht-Geschichten Generator

Eine Web-App die automatisch kinderfreundliche Gute-Nacht-Geschichten mit KI generiert, inklusive Bildern und Sprachausgabe.

## 🚀 Features

- **KI-generierte Geschichten**: Personalisierte Gute-Nacht-Geschichten basierend auf Themen/Charakteren
- **Automatische Illustrationen**: 2-3 passende Bilder pro Geschichte
- **Sprachausgabe**: Die Geschichte wird vorgelesen
- **Synchronisierte Darstellung**: Bilder wechseln passend zur Erzählung

## 🏗️ Technologie-Stack

### Frontend
- React
- Tailwind CSS
- Framer Motion
- Gehostet auf GitHub Pages

### Backend
- Node.js + Express
- OpenAI API (GPT-4, DALL-E 3, TTS)
- Gehostet auf Render

## 📁 Projekt-Struktur

```
gute-nacht-geschichten/
├── backend/          # Express API Server
│   ├── src/
│   ├── package.json
│   └── ...
├── frontend/         # React App
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

## 🛠️ Installation

### Backend Setup

```bash
cd backend
npm install
```

Erstelle eine `.env` Datei:
```
OPENAI_API_KEY=dein-api-key
PORT=3001
```

Starte den Server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## 🚀 Deployment

### Backend auf Render
1. Erstelle einen neuen Web Service auf Render
2. Verbinde dein GitHub Repository
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Füge die Umgebungsvariable `OPENAI_API_KEY` hinzu

### Frontend auf GitHub Pages
1. Build das Frontend: `npm run build`
2. Deploy mit: `npm run deploy`

## 📝 Lizenz

MIT
