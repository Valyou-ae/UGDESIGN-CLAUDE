# Files to Send to Replit AI

## 📋 Required Files (Send These)

### 1. DEPLOYMENT PROMPT (Most Important)
**File:** `REPLIT_PROMPT_SHORT.md`
**Purpose:** Concise instructions for Replit AI to deploy changes
**Action:** Copy and paste this entire file content into Replit AI chat

---

### 2. REFERENCE FILES (Optional - For Context)

If Replit AI needs more details, send these:

#### A. Quick Reference Guide
**File:** `QUICK_REFERENCE.md`
**Purpose:** Quick troubleshooting and testing guide
**When:** If deployment has issues or needs clarification

#### B. Implementation Summary
**File:** `IMPLEMENTATION_SUMMARY.md`
**Purpose:** Complete details of what was changed and why
**When:** If Replit AI asks for more context about the changes

#### C. Full Deployment Instructions
**File:** `REPLIT_DEPLOYMENT_PROMPT.md`
**Purpose:** Detailed deployment steps with rollback plan
**When:** If the short prompt isn't enough

---

## 🎯 Recommended Approach

### Step 1: Send Short Prompt First
```
1. Open Replit AI chat
2. Copy contents of: REPLIT_PROMPT_SHORT.md
3. Paste into chat
4. Let Replit AI execute the commands
```

### Step 2: Monitor Progress
Watch for:
- ✅ Git pull successful
- ✅ Build completes without errors
- ✅ Server starts successfully
- ✅ No environment variable errors

### Step 3: Test
After deployment:
- Navigate to mockup generator
- Upload a simple design
- Generate mockup
- Verify improved quality

---

## 📂 File Locations

All files are in the root directory (`/home/user/webapp/`):

```
/home/user/webapp/
├── REPLIT_PROMPT_SHORT.md          ← START HERE (send this)
├── REPLIT_DEPLOYMENT_PROMPT.md     ← Detailed version (if needed)
├── QUICK_REFERENCE.md              ← Troubleshooting guide (if needed)
├── IMPLEMENTATION_SUMMARY.md       ← Full details (if needed)
├── MOCKUP_DESIGN_INTEGRATION_SOLUTION.md  ← Technical solution (reference)
├── REPOSITORY_ANALYSIS.md          ← System architecture (reference)
└── FLOW_DIAGRAM.md                 ← Visual flows (reference)
```

---

## 🔍 What Changed (For Your Reference)

**Modified File:**
- `server/services/promptBuilders/mockupPromptBuilder.ts`

**Changes:**
- Enhanced AI prompts to prevent design reinterpretation
- Added explicit fabric integration rules
- Improved fold behavior instructions
- Added comprehensive quality control section

**No Changes To:**
- Database schema (no migrations needed)
- API endpoints (all remain the same)
- Dependencies (no new packages)
- Environment variables (no new secrets needed)

---

## ⚡ Quick Deployment Checklist

Send to Replit AI:
- [ ] `REPLIT_PROMPT_SHORT.md` content (paste in chat)

Wait for Replit AI to:
- [ ] Pull latest code from git
- [ ] Build application
- [ ] Restart server

Verify:
- [ ] Server running without errors
- [ ] Test mockup generation
- [ ] Quality improved

Optional (if issues):
- [ ] Send `QUICK_REFERENCE.md` for troubleshooting
- [ ] Send `REPLIT_DEPLOYMENT_PROMPT.md` for detailed steps

---

## 🎬 Example Replit AI Interaction

**You send:**
```
[Paste entire content of REPLIT_PROMPT_SHORT.md]
```

**Replit AI should:**
1. Acknowledge the deployment request
2. Run git pull origin main
3. Verify commit is correct
4. Run npm install (if needed)
5. Run npm run build
6. Restart the server
7. Confirm deployment successful

**You verify:**
```
Test the mockup generator and confirm designs look integrated into fabric
```

---

## 🆘 If Deployment Fails

**Send this follow-up:**
```
The deployment had issues. Please:
1. Check the error logs
2. Verify all environment variables are set correctly
3. Try the rollback command: git reset --hard HEAD~1 && npm run build && npm start
4. Share the error message so we can troubleshoot
```

**Then send:** `REPLIT_DEPLOYMENT_PROMPT.md` for detailed instructions

---

## ✅ Success Indicators

After deployment, you should see:
- ✅ Server logs show "Server started on port..."
- ✅ No error messages about missing environment variables
- ✅ Mockup generation endpoint responding
- ✅ Generated mockups show improved fabric integration
- ✅ Designs no longer look "pasted on"

---

## 📞 Summary

**Primary File:** `REPLIT_PROMPT_SHORT.md` (send this first)  
**Backup Files:** Other .md files (if needed for context)  
**Action:** Copy-paste prompt content into Replit AI chat  
**Expected Time:** 2-5 minutes for deployment  
**Risk Level:** LOW (prompt-only change, easy rollback)  

---

**Ready?** Copy `REPLIT_PROMPT_SHORT.md` and send to Replit AI! 🚀
