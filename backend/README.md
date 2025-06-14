# Backend - Gute-Nacht-Geschichten API

Express.js Backend für die Gute-Nacht-Geschichten Web-App.

## 🚀 Features

- **Story Generation**: Generiert kinderfreundliche Geschichten mit GPT-4
- **Image Generation**: Erstellt passende Illustrationen mit DALL-E 3
- **Text-to-Speech**: Konvertiert Geschichten in Sprachausgabe
- **Rate Limiting**: Schützt vor Missbrauch
- **CORS**: Konfiguriert für Frontend-Zugriff

## 📋 Voraussetzungen

- Node.js 18+
- OpenAI API Key

## 🛠️ Installation

1. Installiere die Dependencies:
```bash
npm install
```

2. Erstelle eine `.env` Datei basierend auf `.env.example`:
```bash
cp .env.example .env
```

3. Füge deinen OpenAI API Key in die `.env` ein:
```
OPENAI_API_KEY=sk-...
```

## 🏃‍♂️ Entwicklung

Starte den Server im Development-Modus:
```bash
npm run dev
```

Der Server läuft dann auf `http://localhost:3001`

## 📚 API Endpoints

### Story Generation
```
POST /api/story/generate
{
  "theme": "Ein mutiger kleiner Drache",
  "characters": "Drache Funki, Prinzessin Luna",
  "age": 5
}
```

### Image Generation
```
POST /api/image/generate
{
  "prompt": "Kleiner freundlicher Drache im Mondschein"
}
```

### Batch Image Generation
```
POST /api/image/generate-batch
{
  "prompts": ["Prompt 1", "Prompt 2", "Prompt 3"]
}
```

### Audio Generation
```
POST /api/audio/generate
{
  "text": "Es war einmal...",
  "voice": "nova"
}
```

### Audio mit Timestamps
```
POST /api/audio/generate-with-timestamps
{
  "sections": [
    { "text": "Abschnitt 1..." },
    { "text": "Abschnitt 2..." }
  ],
  "voice": "nova"
}
```

## 🚀 Deployment auf Render

1. Erstelle einen neuen Web Service auf [Render](https://render.com)
2. Verbinde dein GitHub Repository
3. Konfiguriere:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
4. Füge Environment Variable hinzu:
   - `OPENAI_API_KEY`: Dein OpenAI API Key
   - `NODE_ENV`: `production`

## 🔒 Sicherheit

- API Keys werden nur als Umgebungsvariablen gespeichert
- Rate Limiting: 10 Requests pro 15 Minuten pro IP
- CORS ist auf die Frontend-Domain beschränkt

## 📝 Verfügbare Stimmen

- `nova` - Weiblich, warm (empfohlen)
- `alloy` - Neutral
- `echo` - Männlich
- `fable` - Britisch
- `onyx` - Männlich, tief
- `shimmer` - Weiblich, sanft
