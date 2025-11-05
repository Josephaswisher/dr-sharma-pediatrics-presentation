# Quick Supabase Setup
## Analytics for Dr. Sharma's Presentation

**Your Supabase Project**: https://oxfwjmtdehzmjogokbni.supabase.co

---

## Step 1: Get Your Anon Key

1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **anon/public** key (starts with `eyJ...`)

---

## Step 2: Add to Environment Variables

Update `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://oxfwjmtdehzmjogokbni.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste-your-key-here
```

---

## Step 3: Create Database Tables

In Supabase SQL Editor, paste and run:

```sql
-- Sessions table
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  started_at TIMESTAMP DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create sessions"
  ON sessions FOR INSERT
  WITH CHECK (true);

-- Slide views table
CREATE TABLE slide_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT REFERENCES sessions(session_id),
  slide_id INTEGER NOT NULL,
  viewed_at TIMESTAMP DEFAULT NOW(),
  duration_seconds INTEGER
);

ALTER TABLE slide_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create slide views"
  ON slide_views FOR INSERT
  WITH CHECK (true);

-- Quiz responses table
CREATE TABLE quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT REFERENCES sessions(session_id),
  slide_id INTEGER NOT NULL,
  question_number INTEGER,
  selected_option TEXT,
  correct BOOLEAN NOT NULL,
  answered_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create quiz responses"
  ON quiz_responses FOR INSERT
  WITH CHECK (true);

-- Analytics view
CREATE VIEW analytics_summary AS
SELECT 
  s.session_id,
  s.started_at,
  COUNT(DISTINCT sv.slide_id) as slides_viewed,
  SUM(CASE WHEN qr.correct THEN 1 ELSE 0 END)::FLOAT / NULLIF(COUNT(qr.id), 0) * 100 as quiz_accuracy
FROM sessions s
LEFT JOIN slide_views sv ON s.session_id = sv.session_id
LEFT JOIN quiz_responses qr ON s.session_id = qr.session_id
GROUP BY s.session_id, s.started_at;
```

---

## Step 4: Deploy to Vercel

Add environment variables in Vercel:
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://oxfwjmtdehzmjogokbni.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `your-anon-key`
4. Redeploy

---

## Step 5: View Analytics

Run these queries in Supabase SQL Editor:

### Total Sessions
```sql
SELECT COUNT(*) FROM sessions;
```

### Most Viewed Slides
```sql
SELECT 
  slide_id,
  COUNT(*) as views
FROM slide_views
GROUP BY slide_id
ORDER BY views DESC;
```

### Quiz Performance
```sql
SELECT 
  slide_id,
  SUM(CASE WHEN correct THEN 1 ELSE 0 END) as correct,
  COUNT(*) as total,
  ROUND(100.0 * SUM(CASE WHEN correct THEN 1 ELSE 0 END) / COUNT(*), 1) as accuracy
FROM quiz_responses
GROUP BY slide_id;
```

---

## ✅ Done!

Your presentation will now track:
- Session views
- Time spent on each slide
- Quiz performance
- Student engagement metrics

**Privacy**: No personal information is collected. All data is anonymous.

---

For more details, see [SUPABASE-SETUP.md](./SUPABASE-SETUP.md)
