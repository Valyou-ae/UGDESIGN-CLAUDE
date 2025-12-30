# Replit AI Agent Prompt

## Context
We've enhanced the mockup generator prompts to fix design integration issues (designs looking "pasted on" instead of part of the fabric). The changes have been committed and pushed to the main branch. We need Replit to deploy these changes to production.

## Task
Deploy the latest changes from the main branch to the production environment and restart the application to apply the new mockup generation prompts.

## Files Modified
1. `server/services/promptBuilders/mockupPromptBuilder.ts` - Enhanced AI prompts for better fabric integration

## Documentation Files Created (for reference)
- `IMPLEMENTATION_SUMMARY.md`
- `QUICK_REFERENCE.md`
- `MOCKUP_DESIGN_INTEGRATION_SOLUTION.md`
- `REPOSITORY_ANALYSIS.md`
- `FLOW_DIAGRAM.md`

## Steps Required

1. **Pull Latest Changes:**
   ```bash
   git pull origin main
   ```

2. **Verify Changes Were Pulled:**
   ```bash
   git log -1 --oneline
   # Should show: "Add comprehensive documentation for mockup design integration fix"
   ```

3. **Install/Update Dependencies (if needed):**
   ```bash
   npm install
   ```

4. **Build the Application:**
   ```bash
   npm run build
   ```

5. **Restart the Application:**
   - Stop current running process
   - Start production server:
   ```bash
   npm start
   ```
   OR if using dev mode:
   ```bash
   npm run dev
   ```

6. **Verify Deployment:**
   - Check that the server starts without errors
   - Test mockup generation endpoint is responding
   - Verify environment variables are loaded (especially GEMINI_API_KEY)

## Expected Behavior After Deployment

The mockup generator will now:
- ✅ Transfer designs exactly (no font/color changes)
- ✅ Make designs appear as part of the fabric (not pasted on)
- ✅ Show designs folding with fabric wrinkles (7+ visible folds)
- ✅ Use unified lighting across entire garment
- ✅ Display fabric texture through printed areas
- ✅ Show proper 3D body curvature

## Environment Variables to Check

Ensure these are set in Replit Secrets:
- `DATABASE_URL` - PostgreSQL connection (required)
- `GEMINI_API_KEY` or `AI_INTEGRATIONS_GEMINI_API_KEY` - For image generation (required)
- `SESSION_SECRET` - For sessions (required in production)
- `USE_STREAMLINED_PROMPT` - Should be `true` (or not set, defaults to true)
- `REPLICATE_API_TOKEN` - For background removal (optional)
- `STRIPE_SECRET_KEY` - For payments (optional)

## Testing After Deployment

1. Navigate to `/mockup-generator` or `/mockup-wizard`
2. Upload a simple text design (e.g., "HELLO" in a specific font)
3. Generate a mockup
4. Verify:
   - Text matches exact font from upload
   - Design shows folds and wrinkles
   - Lighting looks unified
   - Design looks integrated into fabric

## Rollback Plan (if issues occur)

If the new prompts cause problems:
```bash
# Revert to previous commit
git reset --hard HEAD~1
npm run build
npm start
```

Then investigate the issue before redeploying.

## Success Criteria

✅ Application starts without errors  
✅ Mockup generation endpoint responds  
✅ Generated mockups show improved fabric integration  
✅ No increase in error rates  
✅ No performance degradation  

## Notes

- This is a **prompt-only change** - no database migrations needed
- No API changes - all endpoints remain the same
- No dependency changes - just enhanced AI instructions
- Should see immediate improvement in mockup quality
- Monitor first 10-20 generations for quality improvements

## Priority: HIGH
This fix addresses the #1 user complaint about mockup quality.

## Questions?
Review these files for more details:
- `QUICK_REFERENCE.md` - Quick troubleshooting guide
- `IMPLEMENTATION_SUMMARY.md` - Full implementation details
- `MOCKUP_DESIGN_INTEGRATION_SOLUTION.md` - Complete solution documentation
