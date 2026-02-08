# 🚀 Setup & Deployment Guide

## Local Development

### Option 1: Open Directly
```bash
# Just open index.html in your browser
open index.html  # macOS
# or
xdg-open index.html  # Linux
# or
start index.html  # Windows
```

### Option 2: Simple HTTP Server
```bash
# Python (built into most systems)
python3 -m http.server 8000

# Node.js (if you have it)
npx http-server

# Then visit: http://localhost:8000
```

## Deploy to Vercel (Recommended)

### First Time Setup
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy from project directory
cd /data/workspace/slope-singles
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your personal account
# - Link to existing project? No
# - Project name? slope-singles (or your choice)
# - Directory? ./
# - Override settings? No

# 4. Your app is now live at: https://slope-singles.vercel.app
```

### Subsequent Deploys
```bash
# Just run:
vercel --prod

# Automatically deploys to production
```

### Custom Domain
```bash
# After initial deploy, add your domain:
vercel domains add slopesingles.com

# Follow DNS instructions in Vercel dashboard
```

## Set Up Supabase Backend

### 1. Create Project
1. Go to https://supabase.com
2. Click "New Project"
3. Enter:
   - Name: Slope Singles
   - Database Password: (generate strong password)
   - Region: West US (closest to Mammoth)
4. Wait ~2 minutes for provisioning

### 2. Create Tables
1. Go to SQL Editor in Supabase dashboard
2. Copy the entire contents of `DATABASE.md`
3. Paste and run all CREATE TABLE statements
4. Verify tables created in Table Editor

### 3. Set Up Storage
1. Go to Storage in Supabase dashboard
2. Create new bucket: `profile-photos`
3. Settings:
   - Public bucket: Yes (allow public read)
   - File size limit: 5MB
   - Allowed MIME types: image/jpeg, image/png, image/webp

### 4. Get API Keys
1. Go to Project Settings → API
2. Copy:
   - Project URL (e.g., https://xxx.supabase.co)
   - anon/public key
3. Create `.env` file in project root:

```bash
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Update Frontend (Next Step)
```javascript
// src/supabase.js (to be created)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

## Environment Variables on Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your anon key
3. Redeploy for changes to take effect

## Testing Checklist

Before launching publicly:

### Frontend
- [ ] Landing page loads on mobile
- [ ] Signup form validates correctly
- [ ] All views transition smoothly
- [ ] No console errors
- [ ] Images/icons load properly

### Backend (After Supabase Setup)
- [ ] User can sign up
- [ ] User can log in
- [ ] Profile data saves correctly
- [ ] Photo upload works
- [ ] Check-in creates record
- [ ] Browse shows other users

### Cross-Browser
- [ ] Chrome (desktop + mobile)
- [ ] Safari (iOS)
- [ ] Firefox
- [ ] Edge

## Monitoring

### Supabase Dashboard
- Database: Check for error logs
- Auth: Monitor signup/login attempts
- Storage: Track photo uploads

### Vercel Analytics (Optional)
```bash
# Enable analytics
vercel analytics enable
```

## Troubleshooting

### Supabase Connection Fails
- Check API keys in .env match dashboard
- Verify Project URL is correct (no trailing slash)
- Check browser console for CORS errors

### Deployment Fails
- Verify all files committed to git
- Check vercel.json config (if custom)
- Review Vercel deployment logs

### Photos Won't Upload
- Check storage bucket is public
- Verify file size < 5MB
- Check MIME type is allowed

## Next Steps

1. ✅ Deploy frontend to Vercel
2. ✅ Set up Supabase project
3. 🚧 Connect frontend to Supabase (Week 2)
4. 🚧 Implement auth flow
5. 🚧 Build browse/match features

---

**Need help?** Check Supabase docs or Vercel docs, or ask Michael!
