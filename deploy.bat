@echo off
echo 🚗 Starte Deployment der Gute-Nacht-Geschichten App...

REM In Frontend-Ordner wechseln
cd frontend

REM Dependencies installieren
echo 📦 Installiere Dependencies...
call npm install

REM Build erstellen
echo 🔨 Erstelle Production Build...
set REACT_APP_API_URL=https://gute-nacht-geschichten.onrender.com
call npm run build

REM Deployment
echo 🚀 Deploye zu GitHub Pages...
call npm run deploy

echo.
echo ✅ Fertig! Deine App sollte in wenigen Minuten live sein unter:
echo 👉 https://phishman81.github.io/gute-nacht-geschichten
echo.
pause
