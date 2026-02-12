# VisionSpeakAI Platform - Complete Site Map

## Public Pages (Marketing & Info)

### Landing Page
- **Route**: `/`
- **Purpose**: Main entry point with hero, features, NVIDIA highlights, CTAs
- **Key Sections**:
  - Hero with staggered text animation
  - Metrics Display (95% accuracy, <100ms latency)
  - Core Capabilities Cards
  - NVIDIA Integration Section
  - Real-World Applications
  - Call-to-Action Banner

### Technology Page
- **Route**: `/technology`
- **Purpose**: Deep-dive into architecture and NVIDIA technology (PRIMARY NVIDIA FOCUS)
- **Key Sections**:
  - Neural Networks Architecture
  - NVIDIA CUDA/cuDNN Details (PRIMARY)
  - Performance Benchmarks
  - Hardware Recommendations
  - System Requirements
  - Scalability Information

### Solutions Page
- **Route**: `/solutions`
- **Purpose**: Industry use cases and solution categories
- **Key Sections**:
  - Accessibility Solutions
  - Security & Authentication
  - Retail & Public Spaces
  - Enterprise Integration
  - Benefits & Success Stories
  - Integration Details

### Pricing Page
- **Route**: `/pricing`
- **Purpose**: Pricing tiers and feature comparison
- **Key Sections**:
  - Three-Tier Pricing (Starter, Professional, Enterprise)
  - Feature Comparison Table
  - Add-ons & Extras
  - FAQ Accordion
  - Sales CTA

### Developer Portal
- **Route**: `/developers`
- **Purpose**: API documentation and developer resources
- **Key Sections**:
  - Quick Start Guide
  - SDK Installation
  - API Reference (3 endpoints)
  - Code Examples (Python, JavaScript, cURL)
  - SDK Downloads
  - Documentation Links

### Interactive Demo
- **Route**: `/demo`
- **Purpose**: Try gesture and lip-reading recognition
- **Key Sections**:
  - Demo Mode Selector
  - Real-time Results Display
  - Confidence Scores
  - Statistics Panel
  - Test Interface

### Component Styleguide
- **Route**: `/styleguide`
- **Purpose**: Showcase all components and design system
- **Key Sections**:
  - Color Palette
  - Typography Examples
  - Buttons
  - Cards
  - Visual Effects
  - Animations
  - Component Showcase
  - Usage Examples

---

## Authentication Pages

### Login Page
- **Route**: `/auth/login`
- **Purpose**: User login interface
- **Elements**:
  - Email input
  - Password input
  - Remember me checkbox
  - Social OAuth option
  - Forgot password link
  - Sign up link

### Sign Up Page
- **Route**: `/auth/signup`
- **Purpose**: User registration
- **Elements**:
  - Email input
  - Password input with strength indicator
  - Confirm password
  - Company name
  - Terms acceptance
  - Sign in link

---

## Dashboard Pages (Protected)

### Dashboard Layout
- **Location**: `/app/dashboard/layout.tsx`
- **Features**:
  - Collapsible sidebar navigation
  - Top navigation bar with notifications
  - User profile menu
  - Responsive design
  - Mobile hamburger menu

### Dashboard Overview
- **Route**: `/dashboard/overview`
- **Purpose**: Main dashboard with key metrics
- **Key Sections**:
  - Stats Cards (4 KPIs)
  - Usage Chart Placeholder
  - Quick Actions
  - Plan Usage Status
  - Recent Activity

### Analytics
- **Route**: `/dashboard/analytics`
- **Purpose**: Detailed usage analytics
- **Key Sections**:
  - API Usage Chart
  - Top Endpoints Table
  - Performance Metrics
  - Error Rate Display
  - Request Distribution
  - Geographic Analytics

### API Keys Management
- **Route**: `/dashboard/api-keys`
- **Purpose**: Generate and manage API keys
- **Key Sections**:
  - Active Keys Table
  - Generate New Key Button
  - Copy to Clipboard
  - Key Visibility Toggle
  - Revoke Key Option
  - Best Practices Guide

### Integrations
- **Route**: `/dashboard/integrations`
- **Purpose**: Manage third-party integrations
- **Key Sections**:
  - Connected Services
  - Available Integrations Grid
  - Webhook Configuration
  - Integration Settings
  - Custom Integration Info

### Settings
- **Route**: `/dashboard/settings`
- **Purpose**: Account and preference settings
- **Key Sections**:
  - Profile Information
  - Account Preferences
  - Notification Settings
  - Security Settings
  - Password Management
  - Data Export Option

### Documentation
- **Route**: `/dashboard/documentation`
- **Purpose**: Quick access to documentation
- **Key Sections**:
  - API Documentation Links
  - Integration Guides
  - Video Tutorials
  - FAQ Links
  - Community Support
  - Contact Support Button

---

## Navigation Hierarchy

```
VisionSpeakAI
│
├── Public Pages
│   ├── / (Landing)
│   ├── /technology
│   ├── /solutions
│   ├── /pricing
│   ├── /developers
│   ├── /demo
│   └── /styleguide
│
├── Authentication
│   ├── /auth/login
│   └── /auth/signup
│
└── Dashboard (Protected)
    └── /dashboard/
        ├── layout (shared)
        ├── /overview
        ├── /analytics
        ├── /api-keys
        ├── /integrations
        ├── /settings
        └── /documentation
```

---

## Quick Navigation by Purpose

### For New Visitors
1. Start at `/` (Landing Page)
2. Learn more at `/solutions` (Use Cases)
3. Check pricing at `/pricing`
4. Try at `/demo` (Interactive Demo)

### For Developers
1. Visit `/developers` (Developer Portal)
2. Check `/styleguide` (Component Showcase)
3. Reference API docs (in /developers)
4. Get API Key at `/dashboard/api-keys`

### For Existing Users
1. Log in at `/auth/login`
2. Go to `/dashboard/overview` (Main Dashboard)
3. Manage keys at `/dashboard/api-keys`
4. View analytics at `/dashboard/analytics`

### For Decision Makers
1. Visit `/` (Landing Page)
2. Learn technology at `/technology`
3. Explore solutions at `/solutions`
4. Review pricing at `/pricing`
5. Request demo via CTA

### For Content Reference
1. See all components at `/styleguide`
2. Read documentation in `/dashboard/documentation`
3. View code examples at `/developers`

---

## URL Pattern Reference

### Public Routes
```
/                    # Landing
/technology          # Technology details
/solutions           # Use cases
/pricing             # Pricing
/developers          # API docs
/demo                # Demo
/styleguide          # Components
```

### Auth Routes
```
/auth/login          # Login
/auth/signup         # Register
/auth/verify         # Email verification (future)
/auth/reset          # Password reset (future)
```

### Protected Dashboard Routes
```
/dashboard/          # Base (redirects to /overview)
/dashboard/overview  # Main dashboard
/dashboard/analytics # Analytics
/dashboard/api-keys  # API key management
/dashboard/integrations  # Integrations
/dashboard/settings  # Settings
/dashboard/documentation # Docs
```

---

## Navigation Components

### Global Navigation
- **Location**: Top of every page
- **Components**: Logo, Menu, CTA Button
- **Mobile**: Hamburger menu
- **Features**: Sticky on scroll, responsive

### Footer
- **Location**: Bottom of every page
- **Components**: Links, Social Icons, Copyright
- **Links**: All main pages, legal, social

### Dashboard Sidebar
- **Location**: Left side of dashboard
- **Components**: Logo, Navigation items, Logout
- **Features**: Collapsible, responsive, icons

### Breadcrumbs
- **Location**: Above page title (dashboard)
- **Shows**: Current page hierarchy

---

## API Reference (In /developers)

### Endpoints
1. **POST /api/v1/lip-read**
   - Analyze lip movements
   - Parameters: video_stream, language, confidence_threshold
   - Returns: Transcription, confidence

2. **POST /api/v1/gestures**
   - Detect hand/body gestures
   - Parameters: video_stream, gesture_set, return_coordinates
   - Returns: Gesture list with confidence

3. **WebSocket /api/v1/stream**
   - Real-time stream processing
   - Parameters: video_stream, models, inference_speed
   - Returns: Continuous detections

---

## Feature Access Matrix

| Feature | Landing | Tech | Solutions | Pricing | Developers | Demo | Dashboard |
|---------|---------|------|-----------|---------|-----------|------|-----------|
| Marketing Copy | ✅ | ✅ | ✅ | ✅ | - | - | - |
| NVIDIA Info | ✅ | ✅✅ | ✅ | - | ✅ | - | - |
| Pricing | - | - | - | ✅ | - | - | - |
| API Docs | - | - | - | - | ✅ | - | - |
| Live Demo | - | - | - | - | - | ✅ | - |
| Code Examples | - | - | - | - | ✅ | - | - |
| User Account | - | - | - | - | - | - | ✅ |
| API Keys | - | - | - | - | - | - | ✅ |
| Analytics | - | - | - | - | - | - | ✅ |

---

## SEO & Metadata

All pages include:
- ✅ Optimized title tags
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Twitter cards
- ✅ Structured data (schema.org)
- ✅ Mobile viewport settings
- ✅ Canonical URLs

---

## Performance & Caching

- ✅ Static pages cached at CDN
- ✅ Images optimized with next/image
- ✅ CSS purged of unused styles
- ✅ JavaScript code-split by route
- ✅ Animations use GPU acceleration

---

## Accessibility Navigation

- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ Focus indicators visible
- ✅ Skip to main content links
- ✅ ARIA labels on interactive elements

---

## Deep Links & Anchors

### Landing Page Anchors
- `/#features` - Features section
- `/#use-cases` - Use cases section
- `/#nvidia` - NVIDIA section
- `/#cta` - Call-to-action

### Dashboard Anchors
- `/dashboard/settings#profile` - Profile settings
- `/dashboard/settings#security` - Security settings

---

## Related Components

Each page uses:
- **Navigation** - Top navigation bar
- **Footer** - Bottom footer
- **HeroSection** - Page hero
- **FeatureCards** - Feature cards
- **Animations** - Scroll reveals, staggered text
- **Forms** - Input validation
- **Modals** - Dialog components
- **Tabs** - Tabbed content
- **Accordions** - Expandable content

---

**Note**: This site map is current as of the completion build. Routes and components may be extended with additional features.

Last Updated: February 2026
