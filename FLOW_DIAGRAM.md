# UGLI Application Flow Diagrams

**Visual representation of key application flows**

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React)                          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Pages      │  │  Components  │  │    Hooks     │        │
│  │   (27)       │  │   (50+)      │  │    (6)       │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Stores     │  │   API Client │  │   UI Lib     │        │
│  │  (Zustand)   │  │  (TanStack)  │  │  (shadcn)    │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/SSE
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SERVER (Express)                          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │    Routes    │  │   Services   │  │   Storage    │        │
│  │   (20 files) │  │  (Business)  │  │   Layer      │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │     Auth     │  │   Middleware │  │   Logger     │        │
│  │  (Passport)  │  │  (Security)  │  │  (Winston)   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                              │
                   ┌──────────┴──────────┐
                   ▼                     ▼
        ┌─────────────────┐   ┌─────────────────┐
        │   PostgreSQL    │   │  External APIs  │
        │   (Neon)        │   │                 │
        │                 │   │  • Gemini AI    │
        │  • Users        │   │  • Replicate    │
        │  • Images       │   │  • Stripe       │
        │  • Sessions     │   │  • Sentry       │
        │  • CRM          │   └─────────────────┘
        └─────────────────┘
```

---

## User Authentication Flow

```
┌──────────┐
│  User    │
│  Visits  │
│   App    │
└────┬─────┘
     │
     ▼
┌─────────────────────────────────┐
│  Landing Page / Home            │
│  • Public access                │
│  • Login/Signup buttons         │
└────┬────────────────────────────┘
     │
     │ Click Login
     │
     ▼
┌─────────────────────────────────┐
│  Authentication Options         │
│  • Google OAuth                 │
│  • GitHub OAuth                 │
│  • Apple OAuth                  │
│  • Email/Password               │
└────┬────────────────────────────┘
     │
     │ Select Method
     │
     ▼
┌─────────────────────────────────┐
│  Replit Auth / Passport.js      │
│  • OpenID Connect               │
│  • Token exchange               │
└────┬────────────────────────────┘
     │
     │ Success
     │
     ▼
┌─────────────────────────────────┐
│  Session Created                │
│  • PostgreSQL session store     │
│  • HttpOnly cookie              │
│  • 7-day expiration             │
└────┬────────────────────────────┘
     │
     ▼
┌─────────────────────────────────┐
│  Protected Routes Access        │
│  • Dashboard                    │
│  • Image Generator              │
│  • Mockup Generator             │
│  • My Creations                 │
└─────────────────────────────────┘
```

---

## Image Generation Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    Image Generator Page                          │
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐   │
│  │  Prompt Input  │  │  Style Select  │  │  Options       │   │
│  │  (Voice/Text)  │  │  (15+ styles)  │  │  (Ratio, Qty)  │   │
│  └────────────────┘  └────────────────┘  └────────────────┘   │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       │ Submit
                       ▼
              ┌────────────────┐
              │  Credit Check  │
              │  (Has credits?)│
              └────┬───────────┘
                   │ Yes
                   ▼
              ┌────────────────┐
              │ Deduct Credits │
              └────┬───────────┘
                   │
                   ▼
     ┌─────────────────────────────────┐
     │     Gemini Service              │
     │  • Build prompt                 │
     │  • Apply style                  │
     │  • Configure parameters         │
     └────┬───────────────┬────────────┘
          │               │
          │               │ SSE Stream
          │               ▼
          │      ┌─────────────────┐
          │      │  Progress       │
          │      │  Updates        │
          │      │  (Real-time)    │
          │      └─────────────────┘
          │
          ▼
     ┌─────────────────────────────────┐
     │     Google Gemini API           │
     │  • Image generation             │
     │  • Base64 output                │
     └────┬────────────────────────────┘
          │
          ▼
     ┌─────────────────────────────────┐
     │     Storage Layer               │
     │  • Save to database             │
     │  • Generate image ID            │
     │  • Store metadata               │
     └────┬────────────────────────────┘
          │
          ▼
     ┌─────────────────────────────────┐
     │     Client Response             │
     │  • Display image                │
     │  • Show options:                │
     │    - Download                   │
     │    - Favorite                   │
     │    - Share                      │
     │    - Vary                       │
     │    - Edit                       │
     └─────────────────────────────────┘
```

---

## Mockup Generation Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                   Mockup Wizard (11 Steps)                       │
└──────────────────────────────────────────────────────────────────┘

Step 1: Journey Selection
┌─────────────────────────────────┐
│  Select Journey Type            │
│  • DTG (Direct-to-Garment)      │
│  • AOP (All-Over Print)         │
└────┬────────────────────────────┘
     │
     ▼
Step 2: Design Upload
┌─────────────────────────────────┐
│  Upload Design File             │
│  • Profile Analyzer runs        │
│  • Extracts colors              │
│  • Analyzes dimensions          │
│  • Detects text/graphics        │
└────┬────────────────────────────┘
     │
     ▼
Step 3: Product Selection
┌─────────────────────────────────┐
│  Choose Product (43+ options)   │
│  • Apparel (8)                  │
│  • Accessories (12)             │
│  • Home & Living (23)           │
└────┬────────────────────────────┘
     │
     ▼
Step 4: Model Selection
┌─────────────────────────────────┐
│  288-Persona Library            │
│  • Ethnicity (8)                │
│  • Size (6)                     │
│  • Age Group (3)                │
│  • Gender (2)                   │
└────┬────────────────────────────┘
     │
     ▼
Step 5: Color Selection
┌─────────────────────────────────┐
│  Product Colors (1-4)           │
│  • Color Swap Mode toggle       │
│  • Auto artwork inversion       │
└────┬────────────────────────────┘
     │
     ▼
Step 6: Angles Selection
┌─────────────────────────────────┐
│  Camera Angles (1-4)            │
│  • Front, Side, Back            │
│  • 3/4 views                    │
│  • Flat lays                    │
└────┬────────────────────────────┘
     │
     ▼
Step 7: Environment/Lighting
┌─────────────────────────────────┐
│  Scene Settings                 │
│  • Indoor/Outdoor               │
│  • Lighting setup               │
│  • Background style             │
└────┬────────────────────────────┘
     │
     ▼
Step 8: Brand Style
┌─────────────────────────────────┐
│  Brand Style Preset             │
│  • Minimal                      │
│  • Urban                        │
│  • Premium                      │
│  • Lifestyle                    │
│  • etc.                         │
└────┬────────────────────────────┘
     │
     ▼
Step 9: Review & Generate
┌─────────────────────────────────┐
│  Summary of Selections          │
│  • Validate inputs              │
│  • Estimate credit cost         │
│  • Click Generate               │
└────┬────────────────────────────┘
     │
     │ Submit
     │
     ▼
┌──────────────────────────────────────────────────────────────────┐
│                     Elite Mockup Generator                        │
│                                                                  │
│  Lock-In Consistency System                                      │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │  Persona   │  │  Product   │  │   Color    │                │
│  │   Lock     │  │   Lock     │  │   Lock     │                │
│  └────────────┘  └────────────┘  └────────────┘                │
│                                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │  Design    │  │  Camera    │  │  Lighting  │                │
│  │   Lock     │  │   Lock     │  │   Lock     │                │
│  └────────────┘  └────────────┘  └────────────┘                │
│                                                                  │
│  Knowledge Modules (48 modules)                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  • 23 Core Modules                                     │    │
│  │  • 10 Enhanced Libraries (+10-20% quality)            │    │
│  │  • 15 Hyper-Realism Libraries (+25-30% quality)       │    │
│  └────────────────────────────────────────────────────────┘    │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
              ┌─────────────────────┐
              │  Prompt Builder     │
              │  • 13K lines logic  │
              │  • Hyper-detailed   │
              └────┬────────────────┘
                   │
                   ▼
              ┌─────────────────────┐
              │  Gemini API Call    │
              │  • Image generation │
              └────┬────────────────┘
                   │
                   │ If Color Swap Mode
                   ▼
              ┌─────────────────────┐
              │  Color Swap Edit    │
              │  • AI image editing │
              │  • Swap product     │
              │    color only       │
              └────┬────────────────┘
                   │
                   ▼
              ┌─────────────────────┐
              │  Design Compositor  │
              │  • Place design     │
              │  • Apply transforms │
              └────┬────────────────┘
                   │
                   ▼
              ┌─────────────────────┐
              │  Queue Management   │
              │  • 3 concurrent max │
              │  • Rate limiting    │
              │  • Auto-retry (3x)  │
              └────┬────────────────┘
                   │
                   ▼
              ┌─────────────────────┐
              │  Storage            │
              │  • Save results     │
              │  • Generate IDs     │
              └────┬────────────────┘
                   │
                   ▼
Step 10 & 11: Results Display
┌─────────────────────────────────┐
│  Generated Mockups              │
│  • View all variants            │
│  • Download individual/all      │
│  • Share publicly               │
│  • Save to My Creations         │
└─────────────────────────────────┘
```

---

## Background Removal Flow

```
┌──────────────────────────────────┐
│  Background Remover Page         │
│                                  │
│  ┌────────────────────────────┐ │
│  │  Upload Image              │ │
│  │  (Drag & Drop or Browse)   │ │
│  └────────────────────────────┘ │
└────┬─────────────────────────────┘
     │
     │ Upload
     │
     ▼
┌────────────────────────────────┐
│  Preview & Options             │
│  • Original preview            │
│  • Background options:         │
│    - Transparent (PNG)         │
│    - Solid color               │
│    - Custom background         │
└────┬───────────────────────────┘
     │
     │ Click "Remove Background"
     │
     ▼
┌────────────────────────────────┐
│  Credit Check                  │
│  (Deduct credits)              │
└────┬───────────────────────────┘
     │
     ▼
┌────────────────────────────────┐
│  Replicate API                 │
│  • bria/remove-background      │
│  • High-resolution support     │
└────┬───────────────────────────┘
     │
     │ Processing
     │
     ▼
┌────────────────────────────────┐
│  Apply Background Option       │
│  • Transparent                 │
│  • Solid color fill            │
│  • Custom background overlay   │
└────┬───────────────────────────┘
     │
     ▼
┌────────────────────────────────┐
│  Storage Layer                 │
│  • Save result                 │
│  • Generate image ID           │
└────┬───────────────────────────┘
     │
     ▼
┌────────────────────────────────┐
│  Display Result                │
│  • Side-by-side comparison     │
│  • Download button             │
│  • Save to My Creations        │
└────────────────────────────────┘
```

---

## Admin CRM Flow

```
┌──────────────────────────────────┐
│  Admin User Login                │
│  (Role: admin/super_admin)       │
└────┬─────────────────────────────┘
     │
     ▼
┌──────────────────────────────────┐
│  Admin Guard Check               │
│  • Verify role                   │
│  • Allow access                  │
└────┬─────────────────────────────┘
     │
     ▼
┌──────────────────────────────────┐
│  Admin Dashboard                 │
│  • Overview metrics              │
│  • Quick stats                   │
│  • Navigation sidebar            │
└────┬─────────────────────────────┘
     │
     ├───────────────────┐
     │                   │
     ▼                   ▼
┌─────────────┐   ┌─────────────┐
│   Users     │   │    CRM      │
│ Management  │   │  Features   │
└─────────────┘   └──────┬──────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
  ┌──────────┐    ┌──────────┐    ┌──────────┐
  │ Contacts │    │  Deals   │    │Activities│
  └────┬─────┘    └────┬─────┘    └────┬─────┘
       │               │               │
       ▼               ▼               ▼
  
  CONTACTS:            DEALS:           ACTIVITIES:
  • Create            • Create         • Log calls
  • Edit              • Set stage      • Track emails
  • Assign            • Set value      • Schedule tasks
  • Tag               • Probability    • Mark complete
  • Notes             • Close date     • Link to deal
  • Status            • Assign user    • Assign user

       │               │               │
       └───────────────┴───────────────┘
                       │
                       ▼
              ┌────────────────┐
              │  Analytics     │
              │  Dashboard     │
              │                │
              │  • Total users │
              │  • Images gen. │
              │  • Commissions │
              │  • Growth      │
              │  • Top creators│
              └────────────────┘
```

---

## Billing & Payment Flow

```
┌──────────────────────────────────┐
│  User Dashboard/Billing Page     │
│  • Current credits display       │
│  • Plan selector                 │
└────┬─────────────────────────────┘
     │
     │ Select Plan/Credits
     │
     ▼
┌──────────────────────────────────┐
│  Pricing Options                 │
│  • Credit packages               │
│    - 100 credits: $9.99          │
│    - 500 credits: $39.99         │
│    - 1000 credits: $69.99        │
│  • Subscription plans            │
│    - Basic: $19/mo               │
│    - Pro: $49/mo                 │
│    - Enterprise: $99/mo          │
└────┬─────────────────────────────┘
     │
     │ Click Purchase
     │
     ▼
┌──────────────────────────────────┐
│  Create Stripe Checkout Session  │
│  POST /api/billing/create-       │
│       checkout-session           │
└────┬─────────────────────────────┘
     │
     ▼
┌──────────────────────────────────┐
│  Redirect to Stripe Checkout     │
│  • Secure payment form           │
│  • Multiple payment methods      │
└────┬─────────────────────────────┘
     │
     │ Complete Payment
     │
     ▼
┌──────────────────────────────────┐
│  Stripe Webhook Event            │
│  POST /api/stripe/webhook        │
│                                  │
│  Events handled:                 │
│  • checkout.session.completed    │
│  • subscription.created          │
│  • subscription.updated          │
│  • subscription.deleted          │
│  • invoice.payment_succeeded     │
│  • invoice.payment_failed        │
└────┬─────────────────────────────┘
     │
     ▼
┌──────────────────────────────────┐
│  Webhook Handler                 │
│  (webhookHandlers.ts)            │
│                                  │
│  • Verify webhook signature      │
│  • Parse event data              │
│  • Update database               │
└────┬─────────────────────────────┘
     │
     ├──────────────────┬────────────────┐
     │                  │                │
     ▼                  ▼                ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│ Credits  │    │Subscribe │    │ Invoice  │
│  Added   │    │ Activate │    │ Process  │
└────┬─────┘    └────┬─────┘    └────┬─────┘
     │               │               │
     └───────────────┴───────────────┘
                     │
                     ▼
            ┌────────────────┐
            │  Database      │
            │  Update        │
            │  • User credits│
            │  • Subscription│
            │  • Commission  │
            └────┬───────────┘
                 │
                 ▼
            ┌────────────────┐
            │  Email         │
            │  Notification  │
            │  (if enabled)  │
            └────┬───────────┘
                 │
                 ▼
            ┌────────────────┐
            │  Client Update │
            │  • Refresh     │
            │  • Show toast  │
            │  • Update UI   │
            └────────────────┘
```

---

## Affiliate Program Flow

```
┌──────────────────────────────────┐
│  User Profile/Settings           │
│  • Generate affiliate code       │
└────┬─────────────────────────────┘
     │
     ▼
┌──────────────────────────────────┐
│  Affiliate Code Generated        │
│  • Unique code: user123          │
│  • Referral link created         │
│  • Share on social media         │
└────┬─────────────────────────────┘
     │
     │ Share Link
     │
     ▼
┌──────────────────────────────────┐
│  New User Visits via Link        │
│  • Code captured in session      │
│  • Signs up for account          │
└────┬─────────────────────────────┘
     │
     ▼
┌──────────────────────────────────┐
│  User Record Created             │
│  • referredBy: affiliate_user_id │
│  • Link established              │
└────┬─────────────────────────────┘
     │
     │ New user makes purchase
     │
     ▼
┌──────────────────────────────────┐
│  Purchase Event                  │
│  • Credits bought                │
│  • Subscription started          │
└────┬─────────────────────────────┘
     │
     ▼
┌──────────────────────────────────┐
│  Commission Calculation          │
│  • 15% of purchase amount        │
│  • Create commission record      │
│  • Status: pending               │
└────┬─────────────────────────────┘
     │
     ▼
┌──────────────────────────────────┐
│  Affiliate Dashboard             │
│  • View earnings                 │
│  • See referrals                 │
│  • Track commissions             │
│  • Request withdrawal            │
└────┬─────────────────────────────┘
     │
     │ Request Withdrawal
     │
     ▼
┌──────────────────────────────────┐
│  Withdrawal Request Form         │
│  • Amount                        │
│  • Bank details                  │
│  • Account holder name           │
│  • Routing number                │
│  • Account number                │
└────┬─────────────────────────────┘
     │
     ▼
┌──────────────────────────────────┐
│  Withdrawal Request Created      │
│  • Status: pending               │
│  • Admin notification            │
└────┬─────────────────────────────┘
     │
     ▼
┌──────────────────────────────────┐
│  Admin Review                    │
│  • Verify details                │
│  • Approve/Reject                │
└────┬─────────────────────────────┘
     │
     │ Approved
     │
     ▼
┌──────────────────────────────────┐
│  Payment Processing              │
│  • Bank transfer initiated       │
│  • Status: paid                  │
│  • Email confirmation            │
└──────────────────────────────────┘
```

---

## Data Model Relationships

```
┌─────────────┐
│    users    │
│  (id: PK)   │
└──────┬──────┘
       │
       │ 1:N
       │
       ├──────────────────────────────────────────┐
       │                                          │
       ▼                                          ▼
┌────────────────────┐                  ┌──────────────────┐
│ generated_images   │                  │  image_folders   │
│ (id: PK)           │                  │  (id: PK)        │
│ (userId: FK)       │◄─────────────────│  (userId: FK)    │
│ (folderId: FK)     │       N:1        └──────────────────┘
│ (parentImageId: FK)│
└────────────────────┘
       │
       │ Self-reference (versions)
       │
       ▼
┌────────────────────┐
│ generated_images   │
│ (parent image)     │
└────────────────────┘

┌─────────────┐
│    users    │
│  (id: PK)   │
└──────┬──────┘
       │
       │ 1:N (affiliateUserId)
       │
       ▼
┌──────────────────────┐
│affiliate_commissions │
│ (id: PK)             │
│ (affiliateUserId: FK)│
│ (referredUserId: FK) │
└──────────────────────┘
       ▲
       │ N:1 (referredUserId)
       │
┌─────────────┐
│    users    │
│  (id: PK)   │
└─────────────┘

┌─────────────┐
│    users    │
│  (id: PK)   │
└──────┬──────┘
       │
       │ 1:N
       │
       ▼
┌──────────────────────┐
│ withdrawal_requests  │
│ (id: PK)             │
│ (userId: FK)         │
└──────────────────────┘

┌─────────────┐
│    users    │
│  (id: PK)   │
└──────┬──────┘
       │
       │ 1:N (assignedTo)
       │
       ├──────────────────────────┬──────────────────────┐
       │                          │                      │
       ▼                          ▼                      ▼
┌─────────────┐          ┌─────────────┐        ┌─────────────┐
│crm_contacts │          │  crm_deals  │        │crm_activities│
│ (id: PK)    │          │  (id: PK)   │        │  (id: PK)   │
│(assignedTo:FK)│────1:N─►│(contactId:FK)│◄──N:1──│(contactId:FK)│
└─────────────┘          │(assignedTo:FK)│        │(dealId: FK) │
                         └─────────────┘        │(assignedTo:FK)│
                                                └─────────────┘
```

---

**Document Generated:** December 30, 2025  
**Purpose:** Visual representation of UGLI application flows and architecture
