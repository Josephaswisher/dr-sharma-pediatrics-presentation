# Supabase Analytics Setup
## Optional: Track Presentation Usage

**Note**: Supabase integration is **optional**. The presentation works perfectly without it. Add analytics only if you want to track:
- How many times the presentation is viewed
- Which slides are viewed most frequently
- Quiz response accuracy
- Session duration

---

## Quick Setup

### 1. Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub/Email
3. Create new project

### 2. Create Database Schema

In Supabase SQL Editor, run:

```sql
-- Sessions table (tracks each presentation viewing session)
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  started_at TIMESTAMP DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT
);

-- Enable Row Level Security
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert sessions
CREATE POLICY "Anyone can create sessions"
  ON sessions FOR INSERT
  WITH CHECK (true);

-- Slide views table (tracks individual slide views)
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

-- Quiz responses table (tracks quiz answers)
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

-- Optional: Analytics view
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

### 3. Get API Credentials

In Supabase Dashboard:
1. Go to Settings → API
2. Copy:
   - **Project URL** (e.g., `https://abcdef123456.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

### 4. Add to Project

Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Deploy to Vercel

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add both variables
3. Redeploy

---

## Analytics Queries

### Most Viewed Slides
```sql
SELECT 
  slide_id,
  COUNT(*) as view_count
FROM slide_views
GROUP BY slide_id
ORDER BY view_count DESC;
```

### Average Quiz Performance by Slide
```sql
SELECT 
  slide_id,
  COUNT(*) as total_responses,
  SUM(CASE WHEN correct THEN 1 ELSE 0 END) as correct_responses,
  ROUND(SUM(CASE WHEN correct THEN 1 ELSE 0 END)::NUMERIC / COUNT(*) * 100, 2) as accuracy_percentage
FROM quiz_responses
GROUP BY slide_id
ORDER BY slide_id;
```

### Session Statistics
```sql
SELECT 
  DATE(started_at) as date,
  COUNT(DISTINCT session_id) as unique_sessions,
  COUNT(*) as total_sessions
FROM sessions
GROUP BY DATE(started_at)
ORDER BY date DESC;
```

### Average Time per Slide
```sql
SELECT 
  slide_id,
  AVG(duration_seconds) as avg_duration_seconds,
  ROUND(AVG(duration_seconds) / 60.0, 2) as avg_duration_minutes
FROM slide_views
WHERE duration_seconds IS NOT NULL
GROUP BY slide_id
ORDER BY slide_id;
```

---

## Privacy Considerations

**Data Collected**:
- Session IDs (randomly generated)
- Slide view timestamps
- Quiz responses (anonymous)
- Optional: User agent, IP address

**HIPAA Compliance**:
- No PHI (Protected Health Information) is collected
- No student names or identifying information
- Purely anonymous usage statistics

**FERPA Compliance**:
- No educational records linking to specific students
- Anonymous usage only

**Best Practices**:
- Use only for improving educational content
- Don't share individual session data
- Review retention policies (delete old data)

---

## Optional: Dashboard

Create a simple analytics dashboard using Supabase + Next.js:

```typescript
// pages/analytics.tsx (password-protected)
export default function Analytics() {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    async function fetchStats() {
      const { data } = await supabase
        .from('analytics_summary')
        .select('*');
      setStats(data);
    }
    fetchStats();
  }, []);
  
  return (
    <div>
      <h1>Presentation Analytics</h1>
      <div>Total Sessions: {stats?.length}</div>
      {/* Add charts/graphs */}
    </div>
  );
}
```

**Recommended Tools**:
- Recharts (charting library)
- React Query (data fetching)
- Password protection (Vercel edge middleware)

---

## Troubleshooting

### Not Tracking Views?
1. Check browser console for errors
2. Verify environment variables in Vercel
3. Check Supabase RLS policies (ensure "INSERT" allowed)

### Database Connection Error?
1. Verify Project URL and Anon Key
2. Check network connectivity
3. Review Supabase project status

### Slow Performance?
1. Add indexes on frequently queried columns:
   ```sql
   CREATE INDEX idx_slide_views_session ON slide_views(session_id);
   CREATE INDEX idx_slide_views_slide ON slide_views(slide_id);
   ```

---

## Cost

**Supabase Free Tier**:
- 500 MB database
- 50,000 monthly active users
- 2 GB file storage
- **Sufficient for educational use** (thousands of sessions)

**Paid Tier** (if needed):
- $25/month Pro plan
- 8 GB database, 100,000 MAU

For a single medical student presentation: **Free tier is plenty!**

---

**Summary**: Supabase adds valuable analytics but is completely optional. The presentation works great without it!

Generated with PLEXUS Framework
For: Dr. Shiksha Sharma, MD | Inova Children's Hospital
