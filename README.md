# My Routine • My Purpose v3.0
### Full-Stack Daily Islamic & Fitness Tracker

## Quick Start

1. Install Python dependencies:
   ```
   pip install flask flask-cors openpyxl
   ```

2. Run the server:
   ```
   python3 server.py
   ```
   Or double-click `start.sh`

3. Open http://localhost:5000 in your browser

4. To access from your phone (same WiFi):
   - Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - Open http://YOUR_IP:5000 on your phone
   - Tap "Add to Home Screen" to install as app

## Features
- ✅ Real SQLite database — data never lost
- ⏰ Live real-time clock with prayer countdown
- 🕌 Prayer tracker with Qada tracking
- ✅ 14-habit tracker (7-day rolling grid)
- 📖 Quran tracker with Khatm progress
- 💪 Fitness: workout log, meals, weight, belly measurements
- 🧠 Pomodoro timer + study log
- 📋 Full wrapup: deen rating, study rate, energy, gratitude, journal
- 📊 Progress: heatmap, weekly scores, achievements, weight chart
- 📊 Export to Excel spreadsheet (formatted, color-coded)
- 💾 JSON backup & restore
- 🖨️ Print daily report
- 🌙 Dark / Light / Gold themes
- 🔔 Prayer notifications (browser)
- 🌐 Works offline after first load (PWA)

## Database
- Location: `routine.db` (SQLite, same folder as server.py)
- Back it up by copying that file

## Deployment (make it always available)
- Use ngrok: `ngrok http 5000` for a public URL
- Or deploy to Railway/Render (free) for permanent hosting
