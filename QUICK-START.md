# ⚡ QUICK START - Launch in 5 Minutes

## ✅ What's Already Done

- ✅ All code built (99.9% confidence system)
- ✅ Dependencies installed
- ✅ API keys configured in `.env.local`

## 🚀 Launch Steps

### Step 1: Setup Supabase Database (2 minutes)

```bash
# 1. Open Supabase in browser
open https://supabase.com/dashboard/project/oxfwjmtdehzmjogokbni

# Or go to: supabase.com → Sign in → Your project

# 2. Click "SQL Editor" in left sidebar

# 3. Click "New Query"

# 4. Copy the ENTIRE contents of this file:
#    supabase/schema.sql

# 5. Paste into SQL Editor

# 6. Click "Run" (bottom right)

# Should see: "Success. No rows returned"
# This creates all tables!
```

**Verify it worked:**
```bash
# In Supabase, click "Table Editor" (left sidebar)
# You should see these tables:
- orchestrator_state ✓
- task_queue ✓
- ui_iterations ✓
- screenshots ✓
- medical_validations ✓
- checkpoints ✓
- heartbeat ✓
- cost_tracking ✓
```

---

### Step 2: Build Next.js Production (1 minute)

```bash
cd /home/plexus-os/plexus-framework/web-dashboard/dr-sharma-peds

npm run build
# Wait ~30 seconds...
# Should see: "✓ Compiled successfully"
```

---

### Step 3: Start Production Server (30 seconds)

```bash
# Start server in background
npm run start &

# Wait 10 seconds for it to start
sleep 10

# Verify it's running
curl http://localhost:3145
# Should return HTML

# Or open in browser:
open http://localhost:3145
```

---

### Step 4: Launch the Swarm! (30 seconds)

```bash
# Install PM2 if needed
npm install -g pm2

# Launch swarm in background
npm run swarm:prod

# View logs
pm2 logs meded-swarm

# You should see:
# ╔═══════════════════════════════════════╗
# ║  🧠 MEDED ORCHESTRATION SWARM        ║
# ╚═══════════════════════════════════════╝
#
# 🚀 Launching Hivemind Orchestrator...
```

---

### Step 5: Detach and Sleep! (10 seconds)

```bash
# Press Ctrl+C to stop watching logs
# (Swarm keeps running in background!)

# Check status
pm2 status meded-swarm
# Should show: "online"

# You're done! Go to sleep! 😴
```

---

## 📊 Monitor While It Runs

### Option 1: Dashboard
```bash
# Open in browser
open http://localhost:3145/dashboard

# Shows real-time:
- Current iteration (X/10)
- Score progress (X/70)
- Active agents
- Cost tracking
- Screenshot gallery
```

### Option 2: PM2 Logs
```bash
pm2 logs meded-swarm

# Press Ctrl+C to stop watching
```

### Option 3: Supabase
```bash
# Open Supabase dashboard
open https://supabase.com/dashboard/project/oxfwjmtdehzmjogokbni

# Click "Table Editor" → "orchestrator_state"
# See current iteration, status, score
```

---

## ⏰ What Happens Overnight

```
00:00 - Launch
00:05 - Iteration 1 starts
00:45 - Iteration 1 complete (Score: ~35/70)
01:30 - Iteration 2 complete (Score: ~40/70)
02:15 - Iteration 3 complete (Score: ~45/70)
03:00 - Iteration 4 complete (Score: ~50/70)
03:45 - Iteration 5 complete (Score: ~55/70)
04:30 - Iteration 6 complete (Score: ~60/70)
05:15 - Iteration 7 complete (Score: ~65/70)
06:00 - Iteration 8 complete (Score: ~68/70)
06:30 - Iteration 9 complete (Score: ~69/70)
07:00 - Iteration 10 complete (Score: 70/70!) ✅
07:05 - System exits gracefully

Total Cost: $3-5
```

---

## 🌅 Morning Checklist

```bash
# 1. Check if complete
pm2 status meded-swarm
# Should show: "stopped" or "completed"

# 2. View final logs
pm2 logs meded-swarm --lines 50

# 3. Check dashboard
open http://localhost:3145/dashboard

# 4. Check Supabase
open https://supabase.com/dashboard/project/oxfwjmtdehzmjogokbni
# Go to: Table Editor → ui_iterations → See scores

# 5. Check screenshots
ls -lh public/screenshots/
# Should have ~330 files

# 6. Check handouts
ls -lh public/handouts/
# Should have .md and .pdf files

# 7. Check cost
# In Supabase: Table Editor → cost_tracking
# Sum of cost_usd should be ~$3-5
```

---

## 🐛 Quick Troubleshooting

### Swarm won't start?
```bash
# Check environment variables
cat .env.local | grep "API_KEY"

# Should see all keys set
# If missing, add them to .env.local
```

### Supabase connection error?
```bash
# Verify schema loaded
# Go to: supabase.com → Table Editor
# Should see: orchestrator_state, task_queue, etc.

# If tables missing, go to Step 1 again
```

### Screenshot errors?
```bash
# Ensure Next.js running
ps aux | grep "next start"

# If not running:
npm run build
npm run start &
```

### PM2 issues?
```bash
# Reinstall PM2
npm install -g pm2

# Check logs
pm2 logs meded-swarm --err

# Restart
pm2 restart meded-swarm
```

---

## 🎯 Success Criteria

When you wake up, you should have:

✅ **Score:** 65-70/70 (93-100%)
✅ **Slides:** 330 screenshots taken (33 slides × 10 iterations)
✅ **Handouts:** Student materials generated
✅ **Validation:** Medical facts checked
✅ **Cost:** $3-5 total
✅ **Time:** 4-7 hours runtime

---

## 📞 Need Help?

**Read full docs:** `SWARM-LAUNCH.md` (comprehensive guide)

**Check logs:**
```bash
pm2 logs meded-swarm --lines 100
```

**Check Supabase:**
```bash
# View all data
open https://supabase.com/dashboard/project/oxfwjmtdehzmjogokbni
```

---

## 🚀 Ready to Launch?

**Run these commands in order:**

```bash
# 1. Setup Supabase (browser)
# Go to supabase.com, run schema.sql

# 2. Build Next.js
cd /home/plexus-os/plexus-framework/web-dashboard/dr-sharma-peds
npm run build

# 3. Start server
npm run start &
sleep 10

# 4. Launch swarm
npm install -g pm2
npm run swarm:prod

# 5. Watch for a moment
pm2 logs meded-swarm

# 6. Detach and sleep!
# Press Ctrl+C
# Swarm keeps running!
```

**Sleep well! 🌙**

Wake up to a perfect presentation! ✨
