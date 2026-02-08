# ⛷️ Slope Singles

**Find your riding partner at Mammoth Mountain**

A dating & friend-finding app for snowboarders and skiers. MVP focused on Mammoth Mountain.

## 🚀 Quick Start

### Local Development
```bash
# Open index.html in your browser
# OR use a simple HTTP server:
python3 -m http.server 8000
# Visit: http://localhost:8000
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📋 Current Status

### ✅ Done (Week 1)
- [x] Project structure
- [x] Landing page with value props
- [x] Signup form with validation
- [x] Basic UI/UX (mobile-first, Tailwind)
- [x] View management (landing → signup → browse)

### 🚧 In Progress
- [ ] Supabase backend setup
- [ ] User authentication
- [ ] Database schema implementation

### 📅 Next Up (Week 2)
- [ ] Photo upload
- [ ] "I'm Here Now" check-in system
- [ ] Browse/swipe interface
- [ ] Match logic
- [ ] Basic chat

## 🏗 Architecture

### Frontend
- **Vanilla JS** - No framework bloat, fast loading
- **Tailwind CSS** - Via CDN for rapid prototyping
- **Static HTML** - Easy to deploy anywhere

### Backend (Coming Soon)
- **Supabase** - Auth, Postgres, Realtime, Storage
- **Row-Level Security** - Privacy built-in
- **Realtime subscriptions** - Live chat updates

### Hosting
- **Vercel** - Frontend (free tier)
- **Supabase** - Backend (free tier)

## 📁 Project Structure

```
slope-singles/
├── index.html          # Main app (landing, signup, browse views)
├── src/
│   └── app.js          # View logic, form handling
├── DATABASE.md         # Schema & Supabase setup
├── PROJECT.md          # Full project plan & roadmap
└── README.md           # This file
```

## 🎯 MVP Philosophy

**Keep it dead simple:**
- Mobile-first (people browse on lifts)
- Fast (cold fingers, gloves, impatient users)
- Obvious UX (no learning curve)
- One mountain only (Mammoth)

**Ship fast, learn faster:**
- Real users > perfect features
- Manual processes OK for MVP (photo verification, moderation)
- Add complexity only when needed

## 📊 Success Metrics

- 50+ signups in first month
- 10+ matches formed
- 3+ real-world meetups arranged
- Positive user feedback

## 🔒 Safety & Privacy

- Report/block functionality (coming soon)
- Photo verification (manual for MVP)
- No GPS tracking (just manual check-ins)
- Data stays in Supabase (encrypted, backed up)

## 🤝 Contributing

This is an MVP solo project by Michael. Feedback welcome!

## 📜 License

MIT (for now)

---

**Built with ❤️ and ☕ by Michael**  
*Let's make meeting people on the mountain easier!*
