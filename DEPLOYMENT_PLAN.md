# UGDESIGN Fly.io Deployment Plan

## Overview

This document outlines the systematic steps to clean the codebase, upgrade security features, and deploy to Fly.io without issues.

**Estimated phases:** 5
**Risk level:** Low (no UI changes, backwards compatible)

---

## Pre-Deployment Checklist

Before starting, ensure you have:

- [ ] Fly.io CLI installed (`flyctl` or `fly`)
- [ ] Fly.io account authenticated (`fly auth login`)
- [ ] Access to Neon/PostgreSQL database
- [ ] All API keys ready (Gemini, Stripe, Replicate, Sentry)
- [ ] Local development environment working

---

## Phase 1: Code Cleanup (Remove Bloat)

### Step 1.1: Remove Unused Dependencies

Remove these 11 packages from `package.json`:

```bash
npm uninstall \
  @radix-ui/react-accordion \
  @radix-ui/react-alert-dialog \
  @radix-ui/react-aspect-ratio \
  @radix-ui/react-checkbox \
  @radix-ui/react-collapsible \
  @radix-ui/react-context-menu \
  @radix-ui/react-hover-card \
  @radix-ui/react-menubar \
  @radix-ui/react-navigation-menu \
  @radix-ui/react-radio-group \
  embla-carousel-react
```

### Step 1.2: Remove Unused UI Component Files

Delete these unused component wrapper files:

```bash
rm client/src/components/ui/accordion.tsx
rm client/src/components/ui/alert-dialog.tsx
rm client/src/components/ui/aspect-ratio.tsx
rm client/src/components/ui/breadcrumb.tsx
rm client/src/components/ui/carousel.tsx
rm client/src/components/ui/checkbox.tsx
rm client/src/components/ui/collapsible.tsx
rm client/src/components/ui/context-menu.tsx
rm client/src/components/ui/empty.tsx
rm client/src/components/ui/hover-card.tsx
rm client/src/components/ui/kbd.tsx
rm client/src/components/ui/menubar.tsx
rm client/src/components/ui/navigation-menu.tsx
rm client/src/components/ui/pagination.tsx
rm client/src/components/ui/radio-group.tsx
rm client/src/components/ui/skeleton.tsx
rm client/src/components/ui/table.tsx
```

### Step 1.3: Verify No Breaking Changes

```bash
# Reinstall dependencies
npm install

# Run TypeScript check
npm run check

# Run build to ensure everything compiles
npm run build
```

**Expected result:** Build succeeds with no errors.

---

## Phase 2: Update Dependencies (Safe Updates)

### Step 2.1: Update Minor/Patch Versions (Low Risk)

```bash
npm update \
  @google/genai \
  @sentry/node \
  @tanstack/react-query \
  drizzle-zod \
  lucide-react \
  react-day-picker \
  react-hook-form \
  stripe \
  wouter \
  bufferutil
```

### Step 2.2: Verify After Updates

```bash
npm run check
npm run build
```

### Step 2.3: (Optional) Major Version Updates

These require more testing - do after initial deployment:

| Package | Current | Target | Notes |
|---------|---------|--------|-------|
| drizzle-orm | 0.39.x | 0.45.x | Test DB operations |
| date-fns | 3.x | 4.x | Check date formatting |
| recharts | 2.x | 3.x | Verify chart rendering |

**Recommendation:** Deploy with current major versions first, then plan major updates.

---

## Phase 3: Security Configuration

### Step 3.1: Verify Security Headers (Already Configured)

Your `server/index.ts` already has:

- [x] Helmet with CSP
- [x] HSTS enabled in production
- [x] Trust proxy configured
- [x] CORS properly configured
- [x] Session security
- [x] Input validation with Zod
- [x] Rate limiting

### Step 3.2: Environment Variables for Production

Required secrets to set in Fly.io:

```bash
# Critical - App won't start without these
fly secrets set DATABASE_URL="postgresql://..."
fly secrets set SESSION_SECRET="$(openssl rand -base64 32)"

# Authentication
fly secrets set GOOGLE_CLIENT_ID="your-google-client-id"

# AI/Image Generation
fly secrets set GEMINI_API_KEY="your-gemini-api-key"
fly secrets set REPLICATE_API_TOKEN="your-replicate-token"

# Payments
fly secrets set STRIPE_SECRET_KEY="sk_live_..."
fly secrets set STRIPE_PUBLISHABLE_KEY="pk_live_..."
fly secrets set STRIPE_WEBHOOK_SECRET="whsec_..."

# Monitoring
fly secrets set SENTRY_DSN="https://...@sentry.io/..."

# CORS
fly secrets set ALLOWED_ORIGINS="https://your-domain.com"
```

### Step 3.3: Verify No Secrets in Code

```bash
# Search for potential hardcoded secrets
grep -r "sk_live\|pk_live\|password\|secret" --include="*.ts" --include="*.tsx" | grep -v ".env"
```

---

## Phase 4: Fly.io Configuration

### Step 4.1: Fix Port Configuration

**Issue Found:** `fly.toml` uses port 3000, but app defaults to 5000.

Update `fly.toml`:

```toml
app = 'uglidesign-production-21dec'
primary_region = 'bom'

[build]

[env]
  PORT = "3000"
  NODE_ENV = "production"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = 'stop'
  auto_start_machines = true
  min_machines_running = 1  # Keep at least 1 running for availability
  processes = ['app']

[checks]
  [checks.health]
    type = "http"
    port = 3000
    path = "/api/health"
    interval = "30s"
    timeout = "5s"
    grace_period = "10s"

[[vm]]
  memory = '1gb'
  cpu_kind = 'shared'
  cpus = 1
```

### Step 4.2: Optimize Dockerfile

The current Dockerfile is good, but add a health check:

```dockerfile
# Add after EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/ping', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"
```

### Step 4.3: Create/Update fly.io App

```bash
# If app doesn't exist yet
fly apps create uglidesign-production-21dec --org your-org

# Set the region (Mumbai - bom)
fly regions set bom
```

---

## Phase 5: Deployment

### Step 5.1: Pre-Deployment Build Test

```bash
# Clean install
rm -rf node_modules
npm ci

# Full build
npm run build

# Test production start locally (optional)
NODE_ENV=production npm run start
```

### Step 5.2: Set All Secrets

```bash
# Set all secrets (do this before first deploy)
fly secrets set \
  DATABASE_URL="your-database-url" \
  SESSION_SECRET="your-session-secret" \
  GOOGLE_CLIENT_ID="your-google-client-id" \
  GEMINI_API_KEY="your-gemini-api-key" \
  REPLICATE_API_TOKEN="your-replicate-token" \
  STRIPE_SECRET_KEY="your-stripe-secret" \
  STRIPE_PUBLISHABLE_KEY="your-stripe-publishable" \
  STRIPE_WEBHOOK_SECRET="your-webhook-secret" \
  SENTRY_DSN="your-sentry-dsn" \
  ALLOWED_ORIGINS="https://your-domain.com"
```

### Step 5.3: Deploy

```bash
# Deploy to Fly.io
fly deploy

# Watch the deployment logs
fly logs
```

### Step 5.4: Verify Deployment

```bash
# Check app status
fly status

# Check health endpoint
curl https://uglidesign-production-21dec.fly.dev/api/health

# Check logs for errors
fly logs --app uglidesign-production-21dec
```

---

## Phase 6: Post-Deployment Verification

### Step 6.1: Functional Testing Checklist

Test these features manually:

- [ ] Homepage loads correctly
- [ ] User login works (Google OAuth)
- [ ] Image generation works
- [ ] Background removal works
- [ ] Stripe payments work
- [ ] All UI components render correctly
- [ ] Mobile responsiveness

### Step 6.2: Performance Checks

```bash
# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://your-app.fly.dev/api/health

# Monitor memory usage
fly ssh console -C "cat /proc/meminfo | head -5"
```

### Step 6.3: Set Up Monitoring

1. **Sentry:** Verify errors are being captured
2. **Fly.io Metrics:** Check dashboard at https://fly.io/apps/uglidesign-production-21dec/monitoring
3. **Uptime Monitoring:** Set up external monitoring (e.g., UptimeRobot) for `/api/health`

---

## Rollback Plan

If something goes wrong:

```bash
# List recent deployments
fly releases

# Rollback to previous version
fly deploy --image registry.fly.io/uglidesign-production-21dec:previous-version

# Or scale down to 0 while investigating
fly scale count 0
```

---

## Quick Reference Commands

```bash
# View logs
fly logs

# SSH into container
fly ssh console

# Check app status
fly status

# View secrets (names only)
fly secrets list

# Scale machines
fly scale count 2

# Restart app
fly apps restart

# View metrics
fly dashboard
```

---

## Summary: Execute These Steps in Order

| Step | Action | Risk | Time |
|------|--------|------|------|
| 1.1 | Remove unused npm packages | None | 2 min |
| 1.2 | Delete unused UI files | None | 2 min |
| 1.3 | Verify build works | None | 3 min |
| 2.1 | Update safe dependencies | Low | 2 min |
| 2.2 | Verify after updates | Low | 3 min |
| 3.2 | Prepare env vars | None | 5 min |
| 4.1 | Fix fly.toml port config | Low | 2 min |
| 5.1 | Pre-deploy build test | None | 5 min |
| 5.2 | Set Fly.io secrets | None | 5 min |
| 5.3 | Deploy | Medium | 10 min |
| 5.4 | Verify deployment | None | 5 min |
| 6.1 | Functional testing | None | 15 min |

**Total estimated time: ~60 minutes**

---

## Next Steps After Successful Deployment

1. Set up custom domain
2. Configure SSL certificate (automatic with Fly.io)
3. Set up CI/CD pipeline
4. Plan major dependency updates (drizzle-orm, zod, express)
5. Configure auto-scaling rules
