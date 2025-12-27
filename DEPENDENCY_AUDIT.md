# Dependency Audit Report

**Date:** December 27, 2025
**Project:** UGDESIGN-CLAUDE

---

## Executive Summary

| Category | Status |
|----------|--------|
| Security Vulnerabilities | **0 found** |
| Outdated Packages (Major) | **9 packages** |
| Outdated Packages (Minor) | **15 packages** |
| Unused Dependencies | **11 packages** |
| Potentially Removable | **6+ UI component files** |

---

## 1. Security Vulnerabilities

**Status: No vulnerabilities detected**

```
npm audit: found 0 vulnerabilities
```

The project has no known security vulnerabilities in its dependency tree.

---

## 2. Outdated Packages

### Critical Updates (Major Version Changes)

These packages have major version updates available that may include breaking changes:

| Package | Current | Latest | Risk Level | Notes |
|---------|---------|--------|------------|-------|
| `@hookform/resolvers` | ^3.10.0 | 5.2.2 | Medium | Breaking API changes likely |
| `@neondatabase/serverless` | ^0.10.4 | 1.0.2 | High | Major release - review migration guide |
| `date-fns` | ^3.6.0 | 4.1.0 | Medium | Date library - verify date formatting |
| `drizzle-orm` | ^0.39.1 | 0.45.1 | Medium | ORM update - test DB operations |
| `express` | ^4.21.2 | 5.2.1 | High | Major Express release - significant changes |
| `react-resizable-panels` | ^2.1.9 | 4.0.15 | Medium | UI library - verify panel behavior |
| `recharts` | ^2.15.4 | 3.6.0 | Medium | Charting library - check chart rendering |
| `stripe-replit-sync` | ^0.0.12 | 1.0.0 | Medium | Stable release available |
| `zod` | ^3.25.76 | 4.2.1 | High | Schema validation - major API changes |
| `zod-validation-error` | ^3.4.0 | 5.0.0 | High | Must update with zod |

### Recommended Updates (Minor/Patch)

These are safe to update within the current major version:

| Package | Current | Latest | Priority |
|---------|---------|--------|----------|
| `@google/genai` | ^1.33.0 | 1.34.0 | Low |
| `@sentry/node` | ^10.30.0 | 10.32.1 | Medium |
| `@tanstack/react-query` | ^5.60.5 | 5.90.12 | Medium |
| `drizzle-zod` | ^0.7.0 | 0.8.3 | Low |
| `lucide-react` | ^0.561.0 | 0.562.0 | Low |
| `react-day-picker` | ^9.12.0 | 9.13.0 | Low |
| `react-hook-form` | ^7.68.0 | 7.69.0 | Low |
| `stripe` | ^20.0.0 | 20.1.0 | Medium |
| `wouter` | ^3.8.1 | 3.9.0 | Low |
| `bufferutil` | ^4.0.9 | 4.1.0 | Low |
| `drizzle-kit` | ^0.31.4 | (check latest) | Low |

---

## 3. Unused Dependencies (Bloat)

### Confirmed Unused Packages

These packages are listed in `package.json` but are never imported in the codebase:

| Package | Size Impact | Recommendation |
|---------|-------------|----------------|
| `@radix-ui/react-accordion` | ~50KB | **Remove** |
| `@radix-ui/react-alert-dialog` | ~60KB | **Remove** |
| `@radix-ui/react-aspect-ratio` | ~15KB | **Remove** |
| `@radix-ui/react-checkbox` | ~40KB | **Remove** |
| `@radix-ui/react-collapsible` | ~35KB | **Remove** |
| `@radix-ui/react-context-menu` | ~80KB | **Remove** |
| `@radix-ui/react-hover-card` | ~55KB | **Remove** |
| `@radix-ui/react-menubar` | ~85KB | **Remove** |
| `@radix-ui/react-navigation-menu` | ~70KB | **Remove** |
| `@radix-ui/react-radio-group` | ~45KB | **Remove** |
| `embla-carousel-react` | ~35KB | **Remove** |

**Estimated savings: ~570KB+ from node_modules**

### Unused UI Component Files

These component wrapper files exist but are never imported:

```
client/src/components/ui/accordion.tsx
client/src/components/ui/alert-dialog.tsx
client/src/components/ui/aspect-ratio.tsx
client/src/components/ui/breadcrumb.tsx
client/src/components/ui/carousel.tsx
client/src/components/ui/checkbox.tsx
client/src/components/ui/collapsible.tsx
client/src/components/ui/context-menu.tsx
client/src/components/ui/empty.tsx
client/src/components/ui/hover-card.tsx
client/src/components/ui/kbd.tsx
client/src/components/ui/menubar.tsx
client/src/components/ui/navigation-menu.tsx
client/src/components/ui/pagination.tsx
client/src/components/ui/radio-group.tsx
client/src/components/ui/skeleton.tsx
client/src/components/ui/table.tsx
```

---

## 4. Minimally Used Dependencies

These packages are used in only 1-2 locations. Consider if they're truly necessary:

| Package | Usage Count | Location | Keep/Review |
|---------|-------------|----------|-------------|
| `memoizee` | 1 | server/replitAuth.ts | Review - could use native caching |
| `replicate` | 1 | server/services/backgroundRemover.ts | **Keep** - core feature |
| `next-themes` | 1 | sonner.tsx | **Keep** - theme detection |
| `stripe-replit-sync` | 2 | server files | Review - is this needed? |

---

## 5. Recommended Actions

### Immediate Actions (Low Risk)

1. **Remove unused Radix UI packages** - Update package.json:
```bash
npm uninstall @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-aspect-ratio @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-context-menu @radix-ui/react-hover-card @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-radio-group embla-carousel-react
```

2. **Delete unused UI component files:**
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

3. **Update minor versions** (safe):
```bash
npm update @google/genai @sentry/node @tanstack/react-query lucide-react react-day-picker react-hook-form stripe wouter
```

### Medium-Term Actions (Requires Testing)

1. **Update drizzle-orm** to 0.45.x with drizzle-zod 0.8.x
   - Test all database operations
   - Review migration guide

2. **Update date-fns** to 4.x
   - Check all date formatting code
   - Review breaking changes

3. **Update recharts** to 3.x
   - Verify all charts render correctly
   - May need component updates

### Long-Term Actions (Breaking Changes)

1. **Express 4.x → 5.x migration**
   - Significant API changes
   - Requires thorough testing
   - Consider when planning major updates

2. **Zod 3.x → 4.x migration**
   - Breaking changes in schema definitions
   - Must update zod-validation-error together
   - Test all validation logic

3. **@neondatabase/serverless 0.x → 1.x**
   - Review migration documentation
   - Test database connectivity

---

## 6. Package.json Optimization

### Current State
- **Dependencies:** 74
- **DevDependencies:** 18
- **Total:** 92 packages

### After Cleanup
- **Dependencies:** 63 (-11)
- **DevDependencies:** 18
- **Total:** 81 packages

### Updated package.json (dependencies section)

Remove these lines from dependencies:
```json
"@radix-ui/react-accordion": "^1.2.12",
"@radix-ui/react-alert-dialog": "^1.1.15",
"@radix-ui/react-aspect-ratio": "^1.1.8",
"@radix-ui/react-checkbox": "^1.3.3",
"@radix-ui/react-collapsible": "^1.1.12",
"@radix-ui/react-context-menu": "^2.2.16",
"@radix-ui/react-hover-card": "^1.1.15",
"@radix-ui/react-menubar": "^1.1.16",
"@radix-ui/react-navigation-menu": "^1.2.14",
"@radix-ui/react-radio-group": "^1.3.8",
"embla-carousel-react": "^8.6.0",
```

---

## 7. Actively Used Dependencies (Keep)

These are core to the application and actively used:

| Category | Packages |
|----------|----------|
| **React Core** | react, react-dom, react-hook-form |
| **Routing** | wouter (26+ imports) |
| **Styling** | framer-motion (23+ imports), lucide-react (41+ imports), tailwindcss, class-variance-authority |
| **Data** | @tanstack/react-query, drizzle-orm, zod |
| **UI Components** | 18 Radix UI packages (actively used) |
| **Backend** | express, passport, helmet, cors, multer |
| **Services** | stripe, @google/genai, replicate, sharp |
| **Monitoring** | @sentry/node |

---

## Conclusion

The project has **no security vulnerabilities** but contains significant bloat from unused Radix UI components and their wrapper files. Removing the 11 unused packages and 17 component files would:

1. Reduce bundle size
2. Speed up npm install
3. Reduce maintenance burden
4. Improve tree-shaking effectiveness

Priority should be given to:
1. Removing unused packages (immediate, no risk)
2. Updating minor versions (low risk)
3. Planning major version updates for Q1 (requires testing)
