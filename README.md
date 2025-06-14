# 🌙 Gute-Nacht-Geschichten Generator 🚗

Eine Web-App die automatisch kinderfreundliche Gute-Nacht-Geschichten mit KI generiert, inklusive Bildern und Sprachausgabe.

**Live Demo**: https://phishman81.github.io/gute-nacht-geschichten (sobald deployed)

## 🚀 Features

- **KI-generierte Geschichten**: Personalisierte Gute-Nacht-Geschichten basierend auf Themen/Charakteren
- **Automatische Illustrationen**: 2-3 passende Bilder pro Geschichte
- **Sprachausgabe**: Die Geschichte wird vorgelesen
- **Synchronisierte Darstellung**: Bilder wechseln passend zur Erzählung
- **Fahrzeug-Thema**: Mit animierten Autos, LKWs und Baufahrzeugen 🚗🚚🚜

## 🏗️ Technologie-Stack

### Frontend
- React
- Tailwind CSS (warme Farben, kinderfreundliches Design)
- Framer Motion (sanfte Animationen)
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

## 🚀 Schnellstart für Nicht-Entwickler

### 1. Backend ist bereits online! ✅
Dein Backend läuft bereits auf: https://gute-nacht-geschichten.onrender.com

### 2. Frontend deployen

#### Option A: Automatisch über GitHub Actions (Empfohlen)
1. Gehe zu deinem Repository: https://github.com/Phishman81/gute-nacht-geschichten
2. Klicke auf "Actions" Tab
3. Klicke auf "Deploy Frontend to GitHub Pages"
4. Klicke auf "Run workflow" → "Run workflow"
5. Warte 5-10 Minuten
6. Deine App ist dann live auf: https://phishman81.github.io/gute-nacht-geschichten

#### Option B: Manuell (falls Actions nicht funktioniert)
1. Öffne ein Terminal/Kommandozeile
2. Führe diese Befehle aus:
```bash
git clone https://github.com/Phishman81/gute-nacht-geschichten.git
cd gute-nacht-geschichten/frontend
npm install
npm run deploy
```

### 3. GitHub Pages aktivieren
1. Gehe zu: https://github.com/Phishman81/gute-nacht-geschichten/settings/pages
2. Unter "Source" wähle: "Deploy from a branch"
3. Unter "Branch" wähle: "gh-pages" und "/ (root)"
4. Klicke "Save"

## 🛠️ Für Entwickler

### Backend lokal starten
```bash
cd backend
npm install
# .env Datei mit OPENAI_API_KEY erstellen
npm run dev
```

### Frontend lokal starten
```bash
cd frontend
npm install
npm start
```

## 🔑 Wichtige Hinweise

- **API Key Sicherheit**: Der OpenAI API Key ist sicher im Backend auf Render gespeichert
- **Rate Limiting**: 10 Requests pro 15 Minuten pro IP-Adresse
- **Kosten**: Jede Geschichte kostet etwa 0.10-0.20$ (OpenAI API Kosten)

## 📝 Lizenz

MIT

---

**Viel Spaß mit deinen KI-generierten Gute-Nacht-Geschichten! 🌙✨**
