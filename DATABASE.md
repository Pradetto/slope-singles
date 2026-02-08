# 🗄 Database Schema - Slope Singles MVP

## Overview
Using Supabase (Postgres + Auth + Storage + Realtime)

## Tables

### 👤 users
Core user profile data

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18),
  bio TEXT CHECK (LENGTH(bio) <= 200),
  skill_level TEXT NOT NULL CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  looking_for TEXT NOT NULL CHECK (looking_for IN ('friends', 'dating', 'both')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile + others' public data
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

### 📸 photos
User profile photos (stored in Supabase Storage)

```sql
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view photos"
  ON photos FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own photos"
  ON photos FOR ALL
  USING (auth.uid() = user_id);
```

### 📍 check_ins
Track who's on the mountain RIGHT NOW

```sql
CREATE TABLE check_ins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  mountain TEXT DEFAULT 'mammoth',
  checked_in_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '12 hours'),
  active BOOLEAN DEFAULT true,
  UNIQUE(user_id, mountain, active)
);

-- Auto-expire check-ins at midnight
-- TODO: Add a cron job to set active=false when NOW() > expires_at

ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active check-ins"
  ON check_ins FOR SELECT
  USING (active = true);

CREATE POLICY "Users can manage own check-ins"
  ON check_ins FOR ALL
  USING (auth.uid() = user_id);
```

### 👍 likes
Track who liked whom (one-directional)

```sql
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id),
  CHECK (from_user_id != to_user_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own likes"
  ON likes FOR SELECT
  USING (auth.uid() = from_user_id);

CREATE POLICY "Users can create likes"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);
```

### 💕 matches
Created when two users mutually like each other

```sql
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  matched_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (user1_id < user2_id) -- Ensure consistent ordering
);

-- Unique constraint to prevent duplicate matches
CREATE UNIQUE INDEX unique_match ON matches(LEAST(user1_id, user2_id), GREATEST(user1_id, user2_id));

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own matches"
  ON matches FOR SELECT
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);
```

### 💬 messages
Chat messages between matched users

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  from_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (LENGTH(content) > 0 AND LENGTH(content) <= 1000),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their matches"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM matches
      WHERE matches.id = messages.match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their matches"
  ON messages FOR INSERT
  WITH CHECK (
    from_user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM matches
      WHERE matches.id = match_id
      AND (matches.user1_id = auth.uid() OR matches.user2_id = auth.uid())
    )
  );
```

### 🚨 reports
Safety - report inappropriate users

```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (reporter_id != reported_user_id)
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create reports"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

-- Admin-only read access (no public policy)
```

## 🔧 Setup Instructions

### 1. Create Supabase Project
```bash
# Visit: https://supabase.com
# Create new project
# Note: Project URL and anon key
```

### 2. Run Migrations
```sql
-- Copy/paste the CREATE TABLE statements above
-- Run in Supabase SQL Editor
```

### 3. Enable Storage
```bash
# Create a bucket called 'profile-photos'
# Set to public read, authenticated write
```

### 4. Set Up Realtime
```sql
-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

## 🔐 Security Notes

- All tables have Row-Level Security enabled
- Users can only modify their own data
- Messages only accessible to matched users
- Reports are admin-only read
- Photos stored in Supabase Storage (with upload limits)

## 📊 Indexes (for performance)

```sql
-- Speed up check-in lookups
CREATE INDEX idx_check_ins_active ON check_ins(active, mountain) WHERE active = true;

-- Speed up match lookups
CREATE INDEX idx_matches_user1 ON matches(user1_id);
CREATE INDEX idx_matches_user2 ON matches(user2_id);

-- Speed up message lookups
CREATE INDEX idx_messages_match ON messages(match_id, created_at DESC);
```

## 🚀 Future Enhancements (V2+)

- Block list (users can block others)
- Read receipts (track when messages are read)
- Photo reports (flag inappropriate photos)
- Multi-mountain support (add mountain column to check_ins)
- Favorites/bookmarks (save profiles to view later)

---

**Next:** Set up Supabase project and run these migrations!
