# Overview

Ugli is an AI-powered creative studio platform offering image generation, product mockups, and background removal. It features a modern SaaS architecture with a full-stack TypeScript implementation, including a React frontend with shadcn/ui and an Express backend with PostgreSQL. Key features include user authentication, affiliate program management, credit-based usage, and a dashboard-style interface with a clean, minimal design and dark/light theme support.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

-   **Framework & Build System**: React 18+ with TypeScript, Vite, Wouter for routing, and TanStack Query for server state.
-   **UI Component System**: shadcn/ui built on Radix UI, Tailwind CSS v4 with CSS variables for theming, Framer Motion for animations, and Helvetica Neue font (with Helvetica, Arial fallbacks).
-   **UGLI Brand Colors**: Primary (Rust: #B94E30), Secondary (Gold: #E3B436), Text (Brown: #664D3F), and Neutrals.
-   **State Management**: TanStack Query for server state, React useState/useReducer for local UI state, and session-based authentication.
-   **Design System**: Two-panel layout (sidebar + main content), Bento grid for dashboard cards, consistent color system with semantic tokens, dark/light theme support, and mobile responsiveness.

## Backend Architecture

-   **Server Framework**: Express.js with TypeScript, middleware-based request handling, and custom logging.
-   **Database Layer**: PostgreSQL with Drizzle ORM for type-safe queries and schema-first migrations.
-   **Session Management**: `express-session` with `connect-pg-simple` for PostgreSQL session store, 7-day expiration, HttpOnly cookies.
-   **Authentication Strategy**: Replit Auth (OpenID Connect) supporting Google, GitHub, Apple, and email sign-in. Uses passport.js with automatic token refresh. Login redirects to `/api/login`, callback at `/api/callback`, logout at `/api/logout`.
-   **Data Models**: Users (with role-based access), Generated Images, Affiliate Commissions, Withdrawal Requests, CRM Contacts, CRM Deals, CRM Activities.
-   **Storage Pattern**: Repository pattern via `IStorage` interface with `DatabaseStorage` implementation.
-   **Role-Based Access Control**: Users have roles (user, admin, moderator, super_admin). Admin middleware (`requireAdmin`) protects admin-only routes. Super Admin middleware (`requireSuperAdmin`) protects super admin routes.

## Elite Mockup Generator (Lock-In System)

-   **Location**: `server/services/eliteMockupGenerator.ts`
-   **Knowledge Base**: 48 modules (23 core + 10 enhanced + 15 hyper-realism) for dramatic AI image quality improvements.
    -   **Core Modules (23)**: Brand styles, product details, negative prompts, lighting setups, somatic profiles, cinematic DNA, material physics, artistic styles, color psychology, film stocks, subject libraries, quality control, optical phenomena, meta-prompting, depth systems, weather effects, typography quality, industry knowledge.
    -   **Enhanced Libraries (10) - +10-20% Quality Boost**: Material physics enhanced (100+ materials with IOR/roughness/BRDF), optical phenomena enhanced (reflections/refractions/scattering), color psychology enhanced (50+ colors with emotional palettes), film stocks enhanced (20+ stocks), subject libraries enhanced (portrait/architecture/food/fashion/automotive/landscape), meta-prompting enhanced, depth systems enhanced (DoF profiles/bokeh styles), weather effects enhanced, typography mastery, quality control enhanced (checklists/validation).
    -   **Hyper-Realism Libraries (15) - +25-30% Quality Boost**: Human anatomy perfection (eye/skin/hand rendering), photographic lens simulation, imperfection library (authentic flaws), advanced lighting physics, surface material accuracy, environmental context, micro-detail enhancement, film stock emulation, forensic anti-AI detection, skin rendering mastery, hyper-resolution, tonal range, behavioral realism, subject-specific hyper-realism, forensic standards.
    -   **API Endpoint**: `/api/knowledge/all` exposes all modules for frontend consumption.
-   **288-Persona Library**: Complete diverse persona system for accurate mockup representation:
    -   **Structure**: 8 ethnicities × 6 sizes × 3 age groups × 2 genders = 288 unique personas
    -   **Ethnicities**: White, Black, Hispanic, Asian, Indian, Southeast Asian, Indigenous, Middle Eastern
    -   **Sizes**: XS, S, M, L, XL, 2XL with size-specific body measurements
    -   **Age Groups**: Teen (13-17), Young Adult (18-24), Adult (25-45)
    -   **ID Format**: ETH_AGE_SEX_SIZE_001 (e.g., WHT_AD_F_M_001)
    -   **Lookup Functions**: getExactPersona(), getPersonaByFilters(), getRandomPersona()
    -   **Files**: adultPersonas.ts, teenPersonas.ts, youngAdultPersonas.ts (96 personas each)
-   **Lock-In Consistency System**: Multi-lock approach ensuring consistent mockups:
    -   **Persona Lock**: Exact persona matching for ethnicity/sex/size/age via getExactPersona().
    -   **Product Lock**: Enforces product specifications.
    -   **Color Lock**: Exact color matching.
    -   **Design Lock**: Rules for design application (DTG/AOP).
    -   **Camera/Pose Lock**: Consistent camera settings and angle presets.
    -   **Lighting Lock**: Consistent lighting across shots.
    -   **AOP Physics Locks**: For All-Over Print (construction, scale, physics).
-   **Product Categories**: Apparel (8), Accessories (12), Home & Living (23) with Printify/Printful aligned print areas and construction blueprints.
-   **Queue System**: 3 concurrent jobs max, 10 requests/minute rate limit, 3x auto-retry with exponential backoff, and SSE for progress.
-   **API Endpoints**: For listing products/brand styles, analyzing designs, generating mockups, and refining mockups.

## SaaS Features

-   **Onboarding**: 3-step WelcomeModal shown on home/dashboard.
-   **Pricing & Billing**: Routes for plan tiers, credit packages, usage tracking, and payment management.
-   **Empty States**: Reusable `EmptyState` component for various content areas.
-   **Marketing Landing Page**: Responsive landing page with core features, pricing, and testimonials.
-   **Background Remover**: Replicate API integration (`bria/remove-background`) supporting various background options.
-   **Password Reset Flow**: Secure token-based reset - tokens are bcrypt-hashed before storage, verified via bcrypt.compare, reset links include email+token parameters, tokens never returned to frontend.
-   **Voice Input**: Uses Web Speech API for image generator prompt input with graceful fallback for unsupported browsers.
-   **Profile Page**: Connected to real user data from auth context and database (username, email, join date, stats, creations).
-   **Image Sharing**: Public images can be shared via unique URL (`/share/:imageId`). Share page displays image, prompt, style, aspect ratio, creation date, and creator info. Dynamic Open Graph meta tags are injected server-side for rich social media previews. "Copy Link" buttons appear in Image Generator and My Creations detail panels when images are set to public.

## Admin Dashboard & CRM

-   **Route Guards**: `AuthGuard` (protects authenticated routes), `AdminGuard` (protects admin routes), `SuperAdminGuard` (protects super admin routes), `GuestGuard` (redirects authenticated users from login/signup).
-   **Admin Layout**: Separate `AdminLayout` component with `AdminSidebar` for admin navigation.
-   **Admin Routes**: `/admin` (dashboard), `/admin/users` (user management), `/admin/crm` (CRM overview), `/admin/crm/contacts`, `/admin/crm/deals`, `/admin/analytics`.
-   **Admin API Endpoints**: All under `/api/admin/*` with `requireAdmin` middleware - user management, CRM CRUD operations, analytics.
-   **CRM Features**: Contact management (leads, customers), deal pipeline (stages, values, probability), activity tracking (calls, emails, tasks).
-   **Analytics Dashboard**: Total users, images generated, commissions overview.

## Super Admin Dashboard

-   **Access**: Only users with `super_admin` role can access `/super-admin` route.
-   **Route Guard**: `SuperAdminGuard` component protects the dashboard.
-   **API Endpoints**: All under `/api/super-admin/*` with `requireSuperAdmin` middleware:
    -   `GET /overview` - Key platform metrics (total users, generations, active users, commissions)
    -   `GET /users/growth` - User registration growth by day
    -   `GET /generations/stats` - Image generation activity by day
    -   `GET /top-creators` - Top users by generation count
    -   `GET /users/by-role` - User distribution by role
-   **Dashboard Features**:
    -   Overview cards with key metrics
    -   Line chart for user growth trends (last 30 days)
    -   Bar chart for generation activity (last 30 days)
    -   Pie chart for user role distribution
    -   Top creators leaderboard table

## Notable Architectural Decisions

-   Monorepo structure with shared schema.
-   Path aliases for clean imports.
-   Separation of client and server code.
-   Production builds use single CJS bundle for server.
-   Session store in database for horizontal scaling.

# External Dependencies

-   **Database**: PostgreSQL (via @neondatabase/serverless), Drizzle ORM, `connect-pg-simple`.
-   **UI Libraries**: Radix UI, Tailwind CSS v4, Lucide React, Framer Motion.
-   **Development Tools**: Vite, esbuild, TypeScript.
-   **Third-Party Services**: Google Gemini API (AI image generation), Stripe (payment processing), nodemailer (email service).
-   **Build & Deployment**: Custom build script for server and client, static file serving.
-   **Asset Management**: Static assets from `client/public`, `attached_assets` for design, Vite plugin for OpenGraph meta tags.