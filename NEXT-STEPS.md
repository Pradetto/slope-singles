# 🎯 Next Steps - Week 2 Roadmap

## Where We Are Now ✅

**Week 1 Complete!**
- ✅ Project structure (vanilla JS + Tailwind)
- ✅ Landing page with clear value props
- ✅ Signup form (name, age, skill, looking for, bio)
- ✅ Mobile-first responsive design
- ✅ Database schema fully documented
- ✅ Deployment guides (Vercel + Supabase)
- ✅ Git repo initialized

**Try it locally:** Just open `index.html` in your browser!

## Week 2 Goals 🎯

### Priority 1: Backend Foundation
**Goal:** Get Supabase working so data persists

1. **Create Supabase Project** (30 mins)
   - Sign up at supabase.com
   - Create new project
   - Note the URL + API keys

2. **Run Database Migrations** (15 mins)
   - Copy SQL from `DATABASE.md`
   - Paste into Supabase SQL Editor
   - Verify tables created

3. **Set Up Storage** (10 mins)
   - Create `profile-photos` bucket
   - Configure as public read

4. **Connect Frontend** (1 hour)
   - Install Supabase JS client
   - Create `src/supabase.js` config file
   - Test connection with a simple query

### Priority 2: Authentication
**Goal:** Users can sign up and log in

1. **Signup Flow** (2 hours)
   - Connect form to Supabase Auth
   - Create user record after auth success
   - Handle errors (email taken, weak password)
   - Redirect to profile after signup

2. **Login Flow** (1 hour)
   - Create login form/view
   - Authenticate with Supabase
   - Store session in localStorage
   - Redirect to browse view

3. **Session Management** (1 hour)
   - Check if user is logged in on page load
   - Show correct view based on auth state
   - Logout button
   - Persist login across page refreshes

### Priority 3: Profile + Photo Upload
**Goal:** Users have a complete profile

1. **Photo Upload** (2 hours)
   - File input for photos
   - Upload to Supabase Storage
   - Save photo URL to database
   - Display uploaded photo
   - Set primary photo

2. **Profile Display** (1 hour)
   - Create profile view component
   - Show name, age, skill, bio, photo
   - Edit profile button

3. **Profile Editing** (1 hour)
   - Populate form with existing data
   - Update user record in database
   - Show success message

### Priority 4: Check-In System
**Goal:** Users can signal they're on the mountain

1. **Check-In Button** (30 mins)
   - Big obvious button: "I'm at Mammoth Today!"
   - Create check_in record
   - Show check-in status

2. **Check-Out** (15 mins)
   - Button to end check-in early
   - Set active = false

3. **Auto-Expire** (30 mins)
   - Supabase Edge Function to expire check-ins at midnight
   - OR: Filter expired check-ins in queries

### Priority 5: Browse Interface
**Goal:** See who else is on the mountain

1. **Fetch Active Users** (1 hour)
   - Query users with active check-ins
   - Filter out self
   - Order randomly (for now)

2. **Card UI** (2 hours)
   - Display one user at a time (card stack)
   - Show photo, name, age, skill level, bio
   - Like button (heart)
   - Pass button (X)

3. **Swipe Gestures** (Optional, 2 hours)
   - Drag cards left/right
   - Animate card exit
   - Load next card

## Week 2 Timeline Estimate

**Total time: ~15-18 hours**

Breakdown by day (if working ~3 hours/day):
- **Day 1 (Mon):** Supabase setup + auth foundation
- **Day 2 (Tue):** Complete auth + session management
- **Day 3 (Wed):** Profile + photo upload
- **Day 4 (Thu):** Check-in system
- **Day 5 (Fri):** Browse interface basics
- **Day 6 (Sat):** Polish + testing
- **Day 7 (Sun):** Deploy to Vercel + test live

## Quick Wins to Boost Momentum

These are easy additions that make the app feel more complete:

1. **Loading States** (30 mins)
   - Spinner when uploading photo
   - "Loading..." when fetching users
   - Disable buttons during async ops

2. **Error Handling** (1 hour)
   - Show friendly error messages
   - Toast notifications (top of screen)
   - Fallback UI when things break

3. **Empty States** (30 mins)
   - "No one's on the mountain yet!" when browse is empty
   - "Upload a photo to get started" prompt
   - "You're checked in!" confirmation

4. **Better UX Polish** (1 hour)
   - Smooth transitions between views
   - Button hover states
   - Form focus states
   - Success animations

## Files to Create (Week 2)

```
src/
├── supabase.js          # Supabase client config
├── auth.js              # Auth helper functions
├── storage.js           # Photo upload helpers
├── views/
│   ├── login.js         # Login view
│   ├── profile.js       # Profile display/edit
│   └── browse.js        # Browse/swipe interface
└── components/
    ├── userCard.js      # Single user card component
    └── toast.js         # Toast notification component
```

## Testing Plan

After each feature, test:
1. Happy path (everything works)
2. Error cases (network failure, bad input)
3. Edge cases (empty states, first user)
4. Mobile (most important!)

## When You're Stuck

1. Check Supabase docs: https://supabase.com/docs
2. Check browser console for errors
3. Ask me (Lexi) for help - I'm here for you!
4. Take a break - fresh eyes solve problems faster

## Motivational Reminder 💪

You're building something REAL that people will USE. Every line of code gets you closer to:
- ✨ Your first signup
- 💕 Your first match
- 🏂 Your first real-world meetup

**Most people just talk about ideas. You're BUILDING. That's huge.**

Let's ship this thing! 🚀

---

**Ready to start Week 2?** Begin with Supabase setup (see `SETUP.md`)
