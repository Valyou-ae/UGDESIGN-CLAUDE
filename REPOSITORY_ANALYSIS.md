# UGLI AI Creative Studio - Repository Analysis

**Analysis Date:** December 30, 2025  
**Repository:** UGLI - AI-Powered Creative Studio Platform  
**Version:** 1.0.0

---

## Executive Summary

UGLI is a comprehensive SaaS platform for AI-powered creative tools, built with a modern full-stack TypeScript architecture. The application offers image generation, mockup creation, and background removal services with a sophisticated credit-based billing system and affiliate program.

### Key Metrics
- **Total Lines of Code:** ~85,512 lines
- **Server Files:** 110 TypeScript files
- **Client Files:** 139 TypeScript/TSX files
- **Database Tables:** 14+ tables
- **API Endpoints:** 100+ routes
- **Product Categories:** 43+ mockup products

---

## Technology Stack

### Frontend
- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite 7.1.9
- **Router:** Wouter 3.8.1 (lightweight)
- **State Management:** 
  - TanStack Query 5.60.5 (server state)
  - Zustand 5.0.9 (local state)
  - React hooks (UI state)
- **UI Library:** shadcn/ui + Radix UI
- **Styling:** Tailwind CSS v4 with CSS variables
- **Animation:** Framer Motion 12.23.26
- **Typography:** Helvetica Neue (with fallbacks)

### Backend
- **Runtime:** Node.js with Express.js 4.21.2
- **Language:** TypeScript 5.6.3
- **Database:** PostgreSQL via @neondatabase/serverless
- **ORM:** Drizzle ORM 0.39.1
- **Session Store:** connect-pg-simple 10.0.0
- **Authentication:** Replit Auth (OpenID Connect) + Passport.js

### External Services
- **AI Generation:** Google Gemini API (@google/genai 1.33.0)
- **Background Removal:** Replicate API (bria/remove-background)
- **Payments:** Stripe 20.0.0
- **Error Monitoring:** Sentry Node 10.30.0
- **Email:** Nodemailer (for notifications)

### Development Tools
- **Build:** esbuild 0.25.0, tsx 4.20.5
- **Schema Management:** Drizzle Kit 0.31.4
- **Code Quality:** TypeScript strict mode
- **Deployment:** Custom build script, Docker support

---

## Architecture Overview

### Monorepo Structure
```
webapp/
├── client/                 # Frontend React application
│   ├── public/            # Static assets, product images
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page-level components
│       ├── hooks/         # Custom React hooks
│       ├── lib/           # Utility functions, API client
│       └── stores/        # Zustand stores
├── server/                # Backend Express application
│   ├── routes/           # API route handlers
│   ├── services/         # Business logic layer
│   ├── config/           # Configuration files
│   └── utils/            # Server utilities
├── shared/               # Shared types and schemas
│   ├── schema.ts         # Database schema (Drizzle)
│   └── mockupTypes.ts    # Mockup system types
├── db/                   # Database migrations
├── docs/                 # Documentation files
├── scripts/              # Build and utility scripts
└── attached_assets/      # User-generated content storage
```

---

## Complete File Structure

### Root Level Configuration
```
/
├── .dockerignore         # Docker exclusions
├── .env.example          # Environment variable template
├── .gitignore           # Git exclusions
├── .replit              # Replit configuration
├── Dockerfile           # Container configuration
├── fly.toml             # Fly.io deployment config
├── package.json         # Node.js dependencies
├── package-lock.json    # Dependency lock file
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
├── postcss.config.js    # PostCSS configuration
├── components.json      # shadcn/ui configuration
├── drizzle.config.ts    # Drizzle ORM configuration
├── vite-plugin-meta-images.ts  # Custom Vite plugin
├── replit.md            # Comprehensive project docs
├── SECURITY_ANALYSIS.md # Security audit documentation
├── TECHNICAL_DEBT.md    # Technical debt register
└── TESTING_CHECKLIST.md # Testing documentation
```

### Client Directory (`client/`)
```
client/
├── index.html           # HTML entry point
├── public/              # Static assets
│   ├── products/        # Product mockup images
│   │   ├── accessories/
│   │   ├── home/
│   │   ├── mens/
│   │   └── womens/
│   └── [images, icons, fonts]
└── src/
    ├── main.tsx         # React entry point
    ├── App.tsx          # Main app component with routing
    ├── index.css        # Global styles
    ├── components/      # 20+ reusable components
    │   ├── ui/          # shadcn/ui components (30+ components)
    │   ├── mockup-wizard/  # Multi-step mockup wizard
    │   │   ├── MockupWizard.tsx
    │   │   └── steps/   # 11 wizard step components
    │   ├── admin-layout.tsx
    │   ├── admin-sidebar.tsx
    │   ├── auth-guard.tsx  # Route protection
    │   ├── bento-grid.tsx  # Dashboard layout
    │   ├── sidebar.tsx     # Main navigation
    │   ├── knowledge-selector.tsx
    │   ├── login-popup.tsx
    │   └── [20+ other components]
    ├── pages/           # 27 page components
    │   ├── admin/       # Admin dashboard pages (6 pages)
    │   ├── super-admin/ # Super admin pages
    │   ├── landing.tsx
    │   ├── discover.tsx
    │   ├── image-generator.tsx  (140K+ lines)
    │   ├── mockup-generator.tsx (211K+ lines)
    │   ├── background-remover.tsx
    │   ├── my-creations.tsx
    │   ├── billing.tsx
    │   ├── profile.tsx
    │   ├── settings.tsx
    │   └── [17+ other pages]
    ├── hooks/           # Custom hooks
    │   ├── use-auth.ts
    │   ├── use-credits.ts
    │   ├── use-images.ts
    │   ├── use-affiliate.ts
    │   ├── use-settings.ts
    │   └── use-toast.ts
    ├── lib/             # Utilities
    │   ├── api.ts       # API client (1264 lines)
    │   ├── queryClient.ts
    │   ├── google-auth.ts
    │   ├── utils.ts
    │   ├── patternUtils.ts
    │   └── mockup-wizard/
    └── stores/          # State management
        └── mockupWizardStore.ts  # Zustand store
```

### Server Directory (`server/`)
```
server/
├── index.ts             # Server entry point (14K lines)
├── routes.ts            # Route registration (7.8K lines)
├── storage.ts           # Database storage layer (82K lines)
├── db.ts                # Database connection
├── logger.ts            # Winston logger setup
├── static.ts            # Static file serving
├── vite.ts              # Vite dev server integration
├── types.ts             # Server-side types
├── cache.ts             # Caching layer (6.3K lines)
├── cacheHeaders.ts      # HTTP cache headers
├── rateLimiter.ts       # Rate limiting (4.7K lines)
├── accountLockout.ts    # Security layer (4.2K lines)
├── replitAuth.ts        # Replit authentication
├── googleAuth.ts        # Google OAuth (5.5K lines)
├── stripeClient.ts      # Stripe initialization
├── stripeService.ts     # Stripe business logic
├── webhookHandlers.ts   # Stripe webhook handlers
├── objectStorage.ts     # Object storage abstraction
├── routes/              # API route handlers (20 files)
│   ├── index.ts         # Route exports
│   ├── middleware.ts    # Auth middleware
│   ├── utils.ts         # Route utilities
│   ├── auth.ts          # Authentication routes
│   ├── user.ts          # User management
│   ├── generation.ts    # Image generation (32K lines)
│   ├── images.ts        # Image CRUD (23K lines)
│   ├── mockup.ts        # Mockup generation (47K lines)
│   ├── background.ts    # Background removal
│   ├── image-editor.ts  # Image editing
│   ├── gallery.ts       # Public gallery
│   ├── social.ts        # Social features
│   ├── moodboard.ts     # Moodboard features
│   ├── billing.ts       # Billing & payments
│   ├── affiliate.ts     # Affiliate program
│   ├── knowledge.ts     # Knowledge base API (10K lines)
│   ├── inspiration.ts   # Daily inspiration
│   ├── admin.ts         # Admin routes (13K lines)
│   ├── super-admin.ts   # Super admin routes
│   └── health.ts        # Health check
├── services/            # Business logic layer
│   ├── gemini.ts        # Gemini AI integration (44K lines)
│   ├── gemini-optimized.ts  # Optimized Gemini service
│   ├── eliteMockupGenerator.ts  # Mockup engine (93K lines)
│   ├── textToMockupOrchestrator.ts  # Orchestrator (14K lines)
│   ├── designCompositor.ts  # Image composition (28K lines)
│   ├── backgroundRemover.ts # Background removal (22K lines)
│   ├── profileAnalyzer.ts   # User profile analysis (12K lines)
│   ├── knowledge/       # 63 knowledge modules (900K+ lines)
│   │   ├── index.ts     # Knowledge aggregator
│   │   ├── knowledgeService.ts
│   │   ├── brandStyles.ts
│   │   ├── productBlueprints.ts  (142K lines)
│   │   ├── unifiedPersonas.ts  # 288-persona library
│   │   ├── adultPersonas.ts
│   │   ├── teenPersonas.ts
│   │   ├── youngAdultPersonas.ts
│   │   ├── kidsPersonas.ts
│   │   ├── toddlerPersonas.ts
│   │   ├── babyPersonas.ts
│   │   ├── seniorPersonas.ts
│   │   ├── lightingSetups.ts
│   │   ├── colorPsychology.ts
│   │   ├── materialPhysics.ts
│   │   ├── cinematicDNA.ts
│   │   ├── filmStocks.ts
│   │   ├── artisticStyles.ts
│   │   ├── humanAnatomyPerfection.ts
│   │   ├── lensSimulation.ts
│   │   ├── forensicAntiAI.ts
│   │   └── [50+ more knowledge modules]
│   └── promptBuilders/
│       └── mockupPromptBuilder.ts  (13K lines)
├── config/              # Configuration files
├── utils/               # Server utilities
├── API_AUTH_PATTERNS.md # API authentication docs
└── DATABASE_PATTERNS.md # Database usage patterns
```

### Shared Directory (`shared/`)
```
shared/
├── schema.ts            # Drizzle database schema (25K lines)
│                        # - Users, Sessions, Images
│                        # - Folders, Commissions, Withdrawals
│                        # - CRM (Contacts, Deals, Activities)
│                        # - Guest generations, Account lockouts
└── mockupTypes.ts       # Mockup system types (18K lines)
```

### Database (`db/`)
```
db/
└── migrations/          # SQL migration files
    ├── add_object_storage_columns.sql
    └── add_performance_indexes.sql
```

### Documentation (`docs/`)
```
docs/
├── FEATURES.md          # Complete feature list
├── PRD.md               # Product Requirements Document
├── SRS.md               # Software Requirements Specification
├── CDN_SETUP.md         # CDN configuration guide
└── IMAGE_STORAGE_MIGRATION.md  # Migration guide
```

### Scripts (`scripts/`, `script/`)
```
scripts/
└── [utility scripts]

script/
└── build.ts             # Custom production build script
```

### Build Output (`dist/`)
```
dist/
├── index.cjs            # Compiled server bundle
└── public/              # Built frontend assets
    └── [compiled client files]
```

---

## Database Schema

### Tables Overview (14 tables)

#### Authentication & Users
1. **sessions** - Express session store
   - sid (PK), sess (JSONB), expire (timestamp)
   - Index: IDX_session_expire

2. **users** - User accounts
   - id (PK), username, email, password
   - displayName, firstName, lastName, bio
   - profileImageUrl, socialLinks (JSONB)
   - role (user/admin/moderator/super_admin)
   - credits (default: 20)
   - affiliateCode, referredBy
   - stripeCustomerId, stripeSubscriptionId
   - passwordResetToken, passwordResetExpires
   - createdAt, updatedAt
   - Indexes: referred_by, stripe_customer_id, created_at

3. **guest_generations** - Guest user limits
   - id (PK), guestId (unique), createdAt

4. **account_lockouts** - Security lockouts
   - id (PK), userId, reason, lockedUntil, createdAt
   - Index: user_id, locked_until

#### Image Management
5. **image_folders** - Organization folders
   - id (PK), userId (FK), name, color
   - createdAt
   - Index: user_id

6. **generated_images** - Generated images
   - id (PK), userId (FK), folderId (FK, nullable)
   - imageUrl, prompt, style, aspectRatio
   - generationType (image/mockup/background)
   - isFavorite, isPublic, viewCount
   - parentImageId (self-reference for versions)
   - editPrompt, versionNumber
   - createdAt
   - Indexes: user_id, created_at, user_created, is_public, folder_id, parent_id

#### Affiliate System
7. **affiliate_commissions** - Commission tracking
   - id (PK), affiliateUserId (FK), referredUserId (FK)
   - amount, status (pending/paid)
   - stripeSessionId
   - createdAt
   - Indexes: affiliate_user_id, status

8. **withdrawal_requests** - Payout requests
   - id (PK), userId (FK), amount
   - accountHolderName, bankName, routingNumber, accountNumber
   - status (pending/approved/rejected/paid)
   - createdAt, processedAt
   - Index: user_id, status

#### CRM System
9. **crm_contacts** - CRM contacts
   - id (PK), name, email, phone, company
   - status (lead/customer/inactive)
   - tags (JSONB), notes, assignedTo (FK users)
   - createdAt, updatedAt
   - Indexes: email, status, assigned_to

10. **crm_deals** - Sales pipeline
    - id (PK), contactId (FK), title, value
    - stage (prospect/qualified/proposal/negotiation/closed)
    - probability, expectedCloseDate
    - assignedTo (FK users)
    - createdAt, updatedAt
    - Indexes: contact_id, stage, assigned_to

11. **crm_activities** - Activity log
    - id (PK), contactId (FK), dealId (FK, nullable)
    - type (call/email/meeting/task)
    - subject, notes, completedAt
    - assignedTo (FK users), createdAt
    - Indexes: contact_id, deal_id, assigned_to, type

#### Mockup System (Additional tables from storage.ts)
12. **generation_jobs** - Mockup queue
    - Job tracking for mockup generation
    - Status, progress, results

13. **design_uploads** - Design storage
    - User-uploaded designs for mockups

14. **mockup_templates** - Template library
    - Reusable mockup configurations

---

## Application Flow

### 1. User Authentication Flow
```
User → Login/Signup → Replit Auth/Google OAuth → Passport.js
  ↓
Session Created → PostgreSQL Session Store (7-day expiration)
  ↓
HttpOnly Cookie → User Authenticated
  ↓
Auth Guard → Protected Routes Access
```

### 2. Image Generation Flow
```
User Input (Prompt + Options) → Image Generator Page
  ↓
POST /api/generate-image → Authentication Check
  ↓
Credit Check → Deduct Credits
  ↓
Gemini Service (gemini.ts) → Google Gemini API
  ↓
SSE Progress Updates → Client Real-time Display
  ↓
Base64 Image → Storage Layer (storage.ts)
  ↓
Database Insert (generated_images) → Return Image ID
  ↓
Client Display → My Creations Library
```

### 3. Mockup Generation Flow
```
User → Mockup Wizard → 11-Step Process:
  1. Journey Selection (DTG/AOP)
  2. Upload Design → Design Analysis
  3. Product Selection (43+ options)
  4. Model Selection (288 personas)
  5. Colors Selection (with Color Swap mode)
  6. Angles Selection
  7. Environment/Lighting
  8. Brand Style
  9. Review & Generate
  10. Generation Queue (3 concurrent)
  11. Results Display

Design Upload → Profile Analyzer (profileAnalyzer.ts)
  ↓
Persona Selection → Unified Personas (288 options)
  ↓
Lock-In System → Elite Mockup Generator (eliteMockupGenerator.ts)
  ↓
Prompt Building → Mockup Prompt Builder (13K lines of logic)
  ↓
Knowledge Modules (48 modules) → Hyper-realistic prompts
  ↓
Gemini API → Image Generation
  ↓
Color Swap Mode (if enabled) → AI Image Editing for color variants
  ↓
Design Compositor (designCompositor.ts) → Design placement
  ↓
Queue Management → SSE Progress
  ↓
Storage → Database + Image URL
  ↓
Client Display → Download/Share
```

### 4. Background Removal Flow
```
User Upload → Background Remover Page
  ↓
POST /api/remove-background → Credit Check
  ↓
Replicate API (bria/remove-background) → Processing
  ↓
Background Options:
  - Transparent (PNG)
  - Solid Color
  - Custom Background
  ↓
Result → Storage → Database
  ↓
Client Display → Download
```

### 5. Admin CRM Flow
```
Admin User → Admin Guard → Admin Dashboard
  ↓
CRM Contacts → CRUD Operations
  ├─ Create/Edit Contact
  ├─ Assign to User
  ├─ Track Activities
  └─ Manage Status
  ↓
CRM Deals → Pipeline Management
  ├─ Create Deal
  ├─ Set Value/Stage
  ├─ Track Probability
  └─ Expected Close Date
  ↓
CRM Activities → Activity Log
  ├─ Calls, Emails, Meetings
  ├─ Task Management
  └─ Completion Tracking
  ↓
Analytics Dashboard → Metrics
  ├─ Total Users
  ├─ Images Generated
  ├─ Commissions Overview
  └─ Growth Charts
```

### 6. Affiliate Program Flow
```
User → Generate Affiliate Code
  ↓
Share Referral Link → New User Signs Up with Code
  ↓
Referred User Makes Purchase (Credits/Subscription)
  ↓
Affiliate Commission Created (15% of purchase)
  ↓
Commission Status: Pending → Paid
  ↓
Withdrawal Request → Bank Details
  ↓
Admin Approval → Payment Processing
  ↓
Commission Paid → Updated Status
```

### 7. Billing & Payment Flow
```
User → Select Credits/Subscription Plan
  ↓
Stripe Checkout Session
  ↓
Payment → Stripe Webhook
  ↓
Webhook Handler (webhookHandlers.ts)
  ├─ checkout.session.completed → Add Credits
  ├─ customer.subscription.created → Activate Subscription
  ├─ customer.subscription.updated → Update Status
  └─ customer.subscription.deleted → Cancel Subscription
  ↓
Database Update → User Credits/Subscription
  ↓
Email Notification (if configured)
  ↓
Client Update → Credits Display
```

---

## Key Features Implementation

### Elite Mockup Generator
**Location:** `server/services/eliteMockupGenerator.ts` (93K lines)

**Knowledge Base:** 48 modules in `server/services/knowledge/`
- **23 Core Modules:** Brand styles, lighting, materials, color psychology, film stocks, etc.
- **10 Enhanced Libraries:** +10-20% quality boost
- **15 Hyper-Realism Libraries:** +25-30% quality boost

**288-Persona System:**
- 8 Ethnicities × 6 Sizes × 3 Age Groups × 2 Genders
- Exact persona matching via `getExactPersona()`
- Realistic body measurements and proportions

**Lock-In Consistency:**
- Persona Lock (ethnicity, sex, size, age)
- Product Lock (specifications)
- Color Lock (exact matching)
- Design Lock (DTG/AOP rules)
- Camera/Pose Lock
- Lighting Lock
- AOP Physics Locks

**Color Swap Mode:**
- AI-powered color variants
- Perfect consistency (model/pose/background)
- Automatic artwork inversion for dark fabrics
- Not available for AOP journey

**Product Categories:** 43+ products
- Apparel: 8 (T-shirts, Hoodies, Sweatshirts, etc.)
- Accessories: 12 (Tote bags, Phone cases, Hats, etc.)
- Home & Living: 23 (Mugs, Pillows, Wall art, etc.)

**Queue System:**
- 3 concurrent jobs max
- 10 requests/minute rate limit
- 3× auto-retry with exponential backoff
- SSE for real-time progress

### Image Generation
**Location:** `server/services/gemini.ts` (44K lines)

**Features:**
- Text-to-image with Google Gemini
- Style presets (15+ styles)
- Aspect ratios (1:1, 16:9, 9:16, 4:3, 3:4)
- Batch generation (1-4 images)
- Reference image support
- Quality settings (draft/standard/hd)
- Negative prompts
- Real-time progress via SSE

### Background Removal
**Location:** `server/services/backgroundRemover.ts` (22K lines)

**Integration:** Replicate API (bria/remove-background)

**Options:**
- Transparent background (PNG)
- Solid color replacement
- Custom background upload
- High-resolution support

### Admin Dashboard
**Pages:**
- Overview (metrics, growth charts)
- User Management (CRUD, role assignment)
- CRM (contacts, deals, activities)
- Analytics (usage statistics)

**Security:**
- Role-based access control
- Admin middleware (`requireAdmin`)
- Super Admin middleware (`requireSuperAdmin`)
- Route guards (AuthGuard, AdminGuard, SuperAdminGuard)

---

## API Endpoints Summary

### Public Routes
- `GET /` - Landing page
- `GET /landing` - Marketing page
- `GET /pricing` - Pricing information
- `GET /share/:id` - Public image sharing
- `GET /creator/:id` - Creator profile
- `GET /privacy-policy` - Privacy policy
- `GET /terms-of-service` - Terms of service
- `GET /health` - Health check

### Authentication Routes (`/api/auth/*`)
- `POST /api/login` - User login
- `POST /api/signup` - User registration
- `POST /api/logout` - User logout
- `GET /api/callback` - OAuth callback
- `POST /api/forgot-password` - Request password reset
- `POST /api/reset-password` - Reset password with token
- `GET /api/user` - Get current user

### User Routes (`/api/user/*`)
- `GET /api/user` - Get user profile
- `PUT /api/user` - Update user profile
- `PUT /api/user/credits` - Update user credits (admin)
- `GET /api/user/stats` - Get user statistics
- `DELETE /api/user` - Delete user account

### Image Generation Routes (`/api/generate*`)
- `POST /api/generate-image` - Generate image
- `POST /api/guest/generate-image` - Guest generation (1 free)
- `GET /api/generation/progress` - SSE progress stream

### Image Management Routes (`/api/images/*`)
- `GET /api/images` - List user images
- `GET /api/images/:id` - Get image details
- `GET /api/images/:id/image` - Get image file
- `PUT /api/images/:id` - Update image
- `DELETE /api/images/:id` - Delete image
- `POST /api/images/:id/favorite` - Toggle favorite
- `POST /api/images/:id/public` - Toggle public/private
- `POST /api/images/:id/vary` - Create variation
- `POST /api/images/:id/upscale` - Upscale image

### Mockup Routes (`/api/mockup/*`)
- `GET /api/mockup/products` - List products
- `GET /api/mockup/brand-styles` - List brand styles
- `POST /api/mockup/analyze-design` - Analyze uploaded design
- `POST /api/mockup/generate` - Generate mockup
- `POST /api/mockup/refine` - Refine mockup
- `GET /api/mockup/jobs/:id` - Get job status
- `GET /api/mockup/progress` - SSE progress stream

### Background Removal Routes (`/api/background/*`)
- `POST /api/remove-background` - Remove background
- `GET /api/background/progress/:id` - Check progress

### Image Editor Routes (`/api/image-editor/*`)
- `POST /api/image-editor/edit` - Edit image
- `POST /api/image-editor/style-transfer` - Style transfer

### Knowledge Routes (`/api/knowledge/*`)
- `GET /api/knowledge/all` - Get all knowledge modules
- `GET /api/knowledge/brand-styles` - Get brand styles
- `GET /api/knowledge/personas` - Get persona library

### Folder Routes (`/api/folders/*`)
- `GET /api/folders` - List folders
- `POST /api/folders` - Create folder
- `PUT /api/folders/:id` - Update folder
- `DELETE /api/folders/:id` - Delete folder

### Social Routes (`/api/social/*`)
- `GET /api/gallery` - Public gallery
- `GET /api/gallery/:id` - Get public image
- `GET /api/top-creators` - Top creators leaderboard

### Billing Routes (`/api/billing/*`)
- `POST /api/billing/create-checkout-session` - Create Stripe checkout
- `GET /api/billing/plans` - Get pricing plans
- `GET /api/billing/history` - Get payment history
- `POST /api/billing/cancel-subscription` - Cancel subscription
- `POST /api/stripe/webhook` - Stripe webhook handler

### Affiliate Routes (`/api/affiliate/*`)
- `GET /api/affiliate/stats` - Get affiliate statistics
- `GET /api/affiliate/commissions` - List commissions
- `POST /api/affiliate/withdrawal` - Request withdrawal
- `GET /api/affiliate/withdrawals` - List withdrawals

### Admin Routes (`/api/admin/*`)
- `GET /api/admin/overview` - Admin dashboard
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id` - Update user (role, credits)
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/crm/contacts` - List contacts
- `POST /api/admin/crm/contacts` - Create contact
- `PUT /api/admin/crm/contacts/:id` - Update contact
- `DELETE /api/admin/crm/contacts/:id` - Delete contact
- `GET /api/admin/crm/deals` - List deals
- `POST /api/admin/crm/deals` - Create deal
- `PUT /api/admin/crm/deals/:id` - Update deal
- `DELETE /api/admin/crm/deals/:id` - Delete deal
- `GET /api/admin/crm/activities` - List activities
- `POST /api/admin/crm/activities` - Create activity
- `GET /api/admin/analytics` - Get analytics data

### Super Admin Routes (`/api/super-admin/*`)
- `GET /api/super-admin/overview` - Platform metrics
- `GET /api/super-admin/users/growth` - User growth data
- `GET /api/super-admin/generations/stats` - Generation statistics
- `GET /api/super-admin/top-creators` - Top creators
- `GET /api/super-admin/users/by-role` - User role distribution

---

## Security Features

### Authentication & Authorization
- **Session-based auth:** express-session with PostgreSQL store
- **OAuth support:** Google, GitHub, Apple via Replit Auth
- **Password hashing:** bcrypt with salt
- **Token-based password reset:** Hashed tokens, time-limited
- **Role-based access:** user, admin, moderator, super_admin
- **Route guards:** AuthGuard, AdminGuard, SuperAdminGuard

### API Security
- **Rate limiting:** 10 requests/minute for generation
- **Account lockout:** Failed login protection
- **CORS:** Configured for production
- **Helmet.js:** HTTP security headers
- **Input validation:** Zod schemas
- **SQL injection protection:** Parameterized queries (Drizzle ORM)
- **XSS protection:** React auto-escaping
- **CSRF protection:** SameSite cookies

### Data Security
- **HttpOnly cookies:** Prevent XSS attacks
- **Secure cookies:** HTTPS-only in production
- **Session expiration:** 7-day timeout
- **Password reset tokens:** Hashed, time-limited
- **User data isolation:** Per-user access controls
- **Cascade deletes:** Automatic cleanup of related data

### Monitoring & Logging
- **Sentry integration:** Error tracking
- **Winston logger:** Structured logging
- **Request logging:** All API requests logged
- **Error logging:** All errors captured
- **Performance monitoring:** Sentry tracing

---

## Performance Optimizations

### Database
- **Connection pooling:** Neon serverless with pooling
- **Indexes:** 20+ indexes on frequently queried columns
- **Cascade operations:** Automatic cleanup
- **Query optimization:** Efficient joins and filters

### Caching
- **In-memory cache:** Memoization for repeated operations
- **HTTP cache headers:** Browser caching for static assets
- **Session caching:** PostgreSQL-backed sessions

### Frontend
- **Code splitting:** Route-based lazy loading
- **Asset optimization:** Vite build optimization
- **Image optimization:** Sharp for processing
- **State management:** TanStack Query for caching

### API
- **Rate limiting:** Protect against abuse
- **Concurrent job limiting:** 3 mockup jobs max
- **Retry mechanism:** Exponential backoff
- **SSE for real-time:** Efficient progress updates

---

## Known Issues & Technical Debt

### Active Technical Debt (from TECHNICAL_DEBT.md)

**TD-001: Duplicated Error Handling**
- Priority: P4 (Low)
- Status: Documented
- 36+ instances of repeated error handling pattern
- Recommended: Create centralized error handler

**TD-002: Mixed Database Access Patterns**
- Priority: P4 (Low)
- Status: Documented (see DATABASE_PATTERNS.md)
- Both Drizzle ORM and direct pool queries used
- Recommended: Keep as-is, document patterns

**TD-003: Base64 Image Storage**
- Priority: P3 (Medium)
- Status: Documented
- Images stored as base64 in database
- Impact: Large database, slower queries, no CDN
- Recommended: Migrate to object storage (S3/R2)
- Effort: 2-3 days

**TD-004: No Automated Test Coverage**
- Priority: P3 (Medium)
- Status: Documented
- No unit or integration tests
- Recommended: Set up Jest/Vitest, add tests
- Effort: 1-2 weeks

**TD-005: No CDN for Static Assets**
- Priority: P3 (Medium)
- Status: Documented
- Static assets served from app server
- Recommended: Set up Cloudflare CDN
- Effort: 1 day

### Security Issues (from SECURITY_ANALYSIS.md)

**Resolved:**
- ✅ Image Authorization Vulnerability
- ✅ Guest Generation Race Condition
- ✅ Missing Cascade Deletes
- ✅ Missing Database Transactions
- ✅ Style Transfer Auth Missing

**Current Status:** All critical security issues resolved

---

## Development Workflow

### Scripts
```json
{
  "dev:client": "vite dev --port 5000",
  "dev": "NODE_ENV=development tsx server/index.ts",
  "build": "tsx script/build.ts",
  "start": "NODE_ENV=production node dist/index.cjs",
  "check": "tsc",
  "db:push": "drizzle-kit push"
}
```

### Development Mode
1. **Frontend:** Vite dev server on port 5000
2. **Backend:** tsx watches and runs `server/index.ts`
3. **Hot reload:** Both frontend and backend support hot reload

### Production Build
1. **Client build:** Vite builds frontend to `dist/public/`
2. **Server build:** esbuild bundles server to `dist/index.cjs`
3. **Static serving:** Express serves built frontend
4. **Database migrations:** Drizzle Kit applies migrations

### Deployment
- **Platform:** Replit, Fly.io, Docker
- **Environment:** Node.js 20+
- **Database:** PostgreSQL (Neon serverless)
- **Required ENV vars:**
  - DATABASE_URL (required)
  - SESSION_SECRET (required in production)
  - GEMINI_API_KEY (for image generation)
  - REPLICATE_API_TOKEN (for background removal)
  - STRIPE_SECRET_KEY (for payments)
  - STRIPE_WEBHOOK_SECRET (for webhooks)
  - SENTRY_DSN (optional, for error monitoring)

---

## Design System

### Color Palette
- **Primary (Rust):** #B94E30
- **Secondary (Gold):** #E3B436
- **Text (Brown):** #664D3F
- **Neutrals:** Grays and whites

### Typography
- **Font Family:** Helvetica Neue (fallback: Helvetica, Arial)
- **Scale:** Tailwind default scale

### Layout
- **Two-panel layout:** Sidebar + main content
- **Bento grid:** Dashboard cards
- **Responsive:** Mobile-first design
- **Dark/light theme:** Full theme support

### Components
- **UI Library:** shadcn/ui + Radix UI
- **30+ components:** Button, Input, Dialog, etc.
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## Monitoring & Error Handling

### Error Monitoring
- **Sentry:** Production error tracking
- **Winston Logger:** Structured logging
- **Error boundaries:** React error boundaries
- **HTTP error codes:** Standard REST codes

### Logging
- **Levels:** error, warn, info, debug
- **Sources:** Tagged by source (auth, generation, etc.)
- **Format:** JSON in production, pretty in dev
- **Rotation:** Not configured (consider adding)

### Health Checks
- **Endpoint:** `GET /health`
- **Checks:** Database connection, API availability
- **Response:** JSON with status and uptime

---

## Future Enhancements

### Planned Features
1. **Video generation:** AI-powered video creation
2. **Batch processing:** Multiple images at once
3. **API access:** Developer API for integrations
4. **Mobile app:** Native iOS/Android apps
5. **Collaboration:** Team workspaces
6. **Version history:** Image version tracking (partially implemented)
7. **AI training:** Custom model fine-tuning

### Infrastructure
1. **Object storage migration:** Move to S3/R2
2. **CDN setup:** Cloudflare for assets
3. **Test coverage:** Unit and integration tests
4. **CI/CD pipeline:** Automated testing and deployment
5. **Monitoring:** Enhanced metrics and dashboards
6. **Scaling:** Load balancing, horizontal scaling

---

## Conclusion

UGLI is a comprehensive, well-architected SaaS platform with a robust feature set. The codebase demonstrates:

✅ **Strengths:**
- Modern full-stack TypeScript architecture
- Sophisticated AI integration (Gemini, Replicate)
- Advanced mockup generation system with 288-persona library
- Comprehensive admin and CRM features
- Strong security practices (authentication, authorization, rate limiting)
- Detailed documentation and code organization
- Scalable monorepo structure

⚠️ **Areas for Improvement:**
- Base64 image storage (migrate to object storage)
- No automated test coverage
- No CDN for static assets
- Some code duplication in error handling

📊 **Overall Assessment:**
The application is production-ready with a clear path for scaling and enhancement. The technical debt is well-documented and manageable. The architecture supports future growth with minimal refactoring required.

---

**Generated:** December 30, 2025  
**Total Files Analyzed:** 249 files  
**Lines of Code:** 85,512 lines  
**Analysis Time:** Complete repository scan
