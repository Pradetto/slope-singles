# 🏂 Slope Singles - MVP Project Plan

## 🎯 Vision

Make it dead simple to meet singles and make friends at ski resorts. Start with Mammoth Mountain, prove the concept, then expand.

## 💡 Core Value Proposition

**The Problem:**
- Hard to meet people at ski resorts when you're solo
- Dating apps don't know if matches are actually on the mountain
- Riding alone is less fun

**The Solution:**
- See who's on the mountain RIGHT NOW
- Shared passion = instant connection
- Natural first date (hit some runs together!)

## 📅 Timeline

### Week 1: Foundation ✅
**Goal:** Basic UI/UX + project structure

- [x] Project scaffolding (vanilla JS + Tailwind)
- [x] Landing page with value props
- [x] Signup form (name, age, skill, looking for, bio)
- [x] View management system
- [x] Mobile-first responsive design
- [x] Database schema documentation

### Week 2: Backend + Core Features 🚧
**Goal:** Functional auth + check-in + browse

- [ ] Set up Supabase project
- [ ] Implement user authentication (email + password)
- [ ] Create database tables + RLS policies
- [ ] Photo upload to Supabase Storage
- [ ] "I'm Here Now" check-in button
- [ ] Browse interface (cards showing active users)
- [ ] Basic filtering (skill level, looking for)

### Week 3: Matching + Chat 📅
**Goal:** Users can match and message

- [ ] Swipe/like interface
- [ ] Match detection (mutual likes)
- [ ] Match notification
- [ ] Basic chat UI (text only)
- [ ] Realtime message updates (Supabase subscriptions)
- [ ] Message read receipts

### Week 4: Safety + Polish 📅
**Goal:** Safe to launch publicly

- [ ] Report user functionality
- [ ] Block user functionality
- [ ] Photo verification flow (manual review for MVP)
- [ ] Profile editing
- [ ] Settings page
- [ ] Deploy to Vercel
- [ ] Domain setup (slopesingles.com or similar)
- [ ] Beta testing with 10-20 people

### Week 5: Launch & Iterate 📅
**Goal:** Real users, real feedback

- [ ] Soft launch at Mammoth (post in local Facebook groups, Reddit)
- [ ] Monitor usage & bug reports
- [ ] Iterate based on feedback
- [ ] Add features users request most

## 🛠 Tech Stack

### Frontend
- **HTML/CSS/JS** - Vanilla (no framework bloat)
- **Tailwind CSS** - Via CDN for rapid styling
- **Responsive** - Mobile-first design

### Backend
- **Supabase**
  - Auth (email + password, can add social later)
  - Postgres database
  - Realtime subscriptions (for chat)
  - Storage (for photos)
  - Row-Level Security (privacy built-in)

### Hosting
- **Vercel** - Frontend (free tier, auto-deploy from Git)
- **Supabase** - Backend (free tier: 500MB DB, 1GB storage)

### Domain
- **slopesingles.com** (preferred)
- Alternatives: meetonslopes.com, slopemeet.com

## 🎨 Design Philosophy

### Mobile-First
- Most users browse on lifts = on their phones
- Large touch targets (gloves!)
- Fast loading (spotty mountain WiFi)

### Simple & Obvious
- No hidden features or complex navigation
- Icons + labels (international users)
- Max 3 taps to any action

### Personality
- Fun but not childish
- Energetic but not aggressive
- Warm but not desperate

### Color Palette
- **Primary:** Slope Blue (#1E40AF) - Trust, winter vibes
- **Background:** Slope Snow (#F8FAFC) - Clean, minimal
- **Accent:** Slope Ice (#E0F2FE) - Subtle highlights

## ✂️ What We're NOT Building (V1)

These are explicitly out of scope for MVP:

- ❌ Native mobile apps (web works on mobile)
- ❌ Multiple mountains (Mammoth only)
- ❌ Advanced matching algorithms (random order is fine)
- ❌ Payment/premium features (free for everyone)
- ❌ GPS tracking (manual check-in is enough)
- ❌ Group rides/events (focus on 1-on-1)
- ❌ Video profiles (photos only)
- ❌ Social features (posts, stories, etc.)

## 📊 Success Metrics

### MVP Success (Month 1)
- 50+ signups
- 10+ matches formed
- 3+ real-world meetups arranged
- <5 spam/fake accounts
- Positive feedback from users

### Product-Market Fit Indicators
- Users check in multiple times per trip
- Matches lead to real conversations (>5 messages)
- Word-of-mouth growth (users tell friends)
- Repeat usage (same users multiple weekends)

## 🚀 Launch Strategy

### Beta Testing (Week 4)
- Recruit 10-20 early testers
- Friends + local Mammoth groups
- Gather feedback, fix bugs
- Refine messaging

### Soft Launch (Week 5)
- Post in Mammoth-specific groups:
  - Facebook: "Mammoth Mountain Ski & Snowboard"
  - Reddit: r/mammothmountain
  - Instagram: #mammothmountain hashtag
- Offer to help people connect
- Monitor usage closely

### Guerrilla Marketing (Ongoing)
- QR code stickers at Mammoth (if allowed)
- Flyers at coffee shops in Mammoth Lakes
- Post in ski/snowboard dating subreddits
- Organic social media (authentic, not spammy)

## 🔐 Safety & Moderation

### Automated Safety
- Email verification required
- Max 1 account per email
- Report button on every profile
- Block button (hide from each other)

### Manual Moderation (MVP)
- Photo verification: manual review before going live
- Report review: Michael checks daily
- Ban hammer: permanent removal for bad actors

### V2 Safety Features
- AI photo moderation (detect inappropriate content)
- Real ID verification (optional, for verified badge)
- Community guidelines page
- Appeal process for false reports

## 💰 Business Model (Future)

MVP is free for everyone. Potential revenue later:

### Freemium Model
- **Free:** Basic matching, 5 likes/day, text chat
- **Premium ($9.99/mo):** Unlimited likes, see who liked you, priority in browse, photo verification badge

### Mountain Partnerships
- Partner with Mammoth (and other resorts)
- Include Slope Singles in season pass perks
- Cross-promotion: they promote us, we promote them

### Events
- Organized group rides (sponsored by brands)
- Apres ski meetups (partner with bars/restaurants)
- Singles ski weekends (travel packages)

**Note:** Monetization is V2+. Focus on product-market fit first.

## 🎯 Expansion Plan (Post-MVP)

### Phase 2: More Mountains
Once Mammoth works, expand to:
1. Big Bear (CA) - close to LA
2. Tahoe resorts (CA/NV) - huge market
3. Park City (UT) - massive resort
4. Whistler (BC) - international appeal

### Phase 3: Winter Sports Everywhere
- Add cross-country skiing
- Add snowshoeing
- Add ice skating (outdoor rinks)
- Become "the" winter sports dating app

### Phase 4: Summer Activities?
- Mountain biking
- Hiking
- Rock climbing
- Trail running

**Philosophy:** Start narrow, expand carefully. Nail one thing before adding more.

## 🤔 Open Questions

1. **Photo verification:** Manual review scales to ~100 users. What then?
   - Option A: Hire moderators (Fiverr, TaskRabbit)
   - Option B: Automated AI moderation (Hive, Clarifai)
   - Option C: Community verification (users vote)

2. **Check-in fraud:** What if people check in but aren't actually there?
   - Option A: Don't care - honor system for MVP
   - Option B: Geofence (require GPS near mountain)
   - Option C: Lift ticket verification (upload photo of ticket)

3. **Matching algorithm:** Random order or optimize for compatibility?
   - MVP: Random (simple, unbiased)
   - V2: Boost similar skill levels
   - V3: Machine learning compatibility scoring

4. **Multi-mountain expansion:** All resorts at once, or gradual rollout?
   - Gradual = better control, localized marketing
   - All at once = faster growth, network effects

## 📚 Resources

### Inspiration (Apps to Study)
- **Tinder** - Swipe UI, matching flow
- **Bumble BFF** - Friend-finding mode
- **The League** - Verification, exclusivity
- **Strava** - Activity-based social

### Supabase Resources
- Docs: https://supabase.com/docs
- Auth: https://supabase.com/docs/guides/auth
- Storage: https://supabase.com/docs/guides/storage
- Realtime: https://supabase.com/docs/guides/realtime

### Deployment
- Vercel Docs: https://vercel.com/docs
- Custom domain setup: https://vercel.com/docs/concepts/projects/domains

## 🐛 Known Issues / Debt

_(Will populate as we build)_

## 📝 Changelog

### 2026-02-08
- Initial project setup
- Landing page created
- Signup form completed
- Database schema designed
- Project plan documented

---

**Let's build something people actually want to use!** 🏂❤️
