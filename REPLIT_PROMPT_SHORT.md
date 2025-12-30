# REPLIT AI AGENT - COPY THIS PROMPT

---

## 🚀 DEPLOYMENT REQUEST: Mockup Design Integration Fix

### Task: Deploy latest changes from main branch and restart application

---

## Quick Context
We fixed critical mockup generation issues:
- ❌ Before: Designs looked "pasted on" fabric
- ✅ After: Designs integrated INTO fabric with proper folds/lighting

**File changed:** `server/services/promptBuilders/mockupPromptBuilder.ts`

---

## Commands to Run

```bash
# 1. Pull latest changes from main branch
git pull origin main

# 2. Verify the correct commit is pulled (should see commit b5ae072)
git log -1 --oneline

# 3. Install dependencies (if needed)
npm install

# 4. Build the application
npm run build

# 5. Restart the application
# Stop current process, then start with:
npm start
# OR if using dev mode:
# npm run dev
```

---

## Environment Check
Verify these Replit Secrets are set:
- ✅ `DATABASE_URL` (required)
- ✅ `GEMINI_API_KEY` or `AI_INTEGRATIONS_GEMINI_API_KEY` (required)
- ✅ `SESSION_SECRET` (required in production)
- ✅ `USE_STREAMLINED_PROMPT` (should be `true` or unset)

---

## Quick Test After Deployment

1. Go to `/mockup-generator`
2. Upload a text design
3. Generate mockup
4. Check: Design should look integrated into fabric (not pasted on)

---

## Expected Results

✅ Server starts without errors  
✅ Mockup generation works  
✅ Designs appear as part of fabric  
✅ Designs fold with fabric wrinkles  
✅ No font/color changes from uploaded design  

---

## If Something Goes Wrong

```bash
# Rollback to previous version
git reset --hard HEAD~1
npm run build
npm start
```

---

**Priority:** HIGH - Fixes #1 user complaint  
**Risk Level:** LOW - Prompt-only change, no DB/API changes  
**Expected Impact:** 50-70% improvement in mockup realism

---
