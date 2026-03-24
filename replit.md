# Capital Edge

## Overview

Capital Edge is a web-based automated trading platform (rebranded from Deriv Bot) that allows users to create trading bots without coding. The application uses a visual block-based programming interface (powered by Blockly) to let users design trading strategies. Users can build bots from scratch, use quick strategies, or import existing bot configurations. The platform supports both demo and real trading accounts through the Deriv trading API.

## Branding
- **Name**: Capital Edge
- **Primary color**: `#10b981` (green) — replaces Deriv's red `#ff444f`
- **Theme**: Dark (`theme--dark` body class)
- **Logo**: `public/ce-logo-default.png` (light mode) / `public/capital-edge-logo.png` (dark mode) — both currently identical 500×500 PNGs. 60px desktop / 42px mobile. Shows on both desktop and mobile.
- **Platform switcher**: Shows "⚡ Capital Edge" in green in header config

## Landing Page
- **File**: `src/pages/landing/index.tsx` + `landing.scss`
- **Shown when**: User is NOT logged in (after API initialization)
- **Content**: "Capital Edge / Built for Traders" hero, animated chart lines + grid BG, stats row (50K+ traders, $2.5B+ volume, 99.9% uptime, 150+ pairs), "Start Trading Now" CTA button
- **Login flow**: Calls `generateOAuthURL()` to redirect to Deriv OAuth
- **Loading optimization**: Non-logged-in users skip active symbols load — landing page shows immediately after WebSocket connects

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **React 18** with TypeScript as the primary UI framework
- **MobX** for state management across the application
- Stores are organized in `src/stores/` with a root store pattern that aggregates domain-specific stores (client, dashboard, chart, run-panel, etc.)

### Build System
- **Rsbuild** as the primary build tool (modern, fast bundler)
- Webpack configuration available as fallback
- Babel for transpilation with support for decorators and class properties

### Visual Programming
- **Blockly** library for the drag-and-drop bot building interface
- Custom blocks and toolbox configurations for trading-specific operations
- Workspace serialization for saving/loading bot strategies

### Trading Integration
- **@deriv/deriv-api** for WebSocket-based communication with Deriv trading servers
- Real-time market data streaming and order execution
- Support for multiple account types (demo, real, wallet-based)

### Authentication
- OAuth2-based authentication flow with OIDC support
- Token Management Backend (TMB) integration for enhanced session handling
- Multi-account support with account switching capabilities

### Charting
- **@deriv/deriv-charts** for displaying market data and trade visualizations
- Real-time chart updates during bot execution

### PWA Support
- Service worker for offline capabilities
- Installable as a Progressive Web App on mobile devices
- Offline fallback page

### Internationalization
- **@deriv-com/translations** for multi-language support
- CDN-based translation loading with Crowdin integration

### Analytics & Monitoring
- **RudderStack** for event tracking and analytics
- **Datadog** for session replay and performance monitoring
- **TrackJS** for error tracking in production

## External Dependencies

### Deriv Ecosystem Packages
- `@deriv-com/auth-client` - Authentication client
- `@deriv-com/analytics` - Analytics integration
- `@deriv-com/quill-ui` / `@deriv-com/quill-ui-next` - UI component library
- `@deriv-com/translations` - Internationalization
- `@deriv/deriv-api` - Trading API client
- `@deriv/deriv-charts` - Charting library

### Cloud Services
- **Cloudflare Pages** - Deployment platform
- **Google Drive API** - Bot strategy storage and sync
- **LiveChat** - Customer support integration
- **Intercom** - In-app messaging (feature-flagged)
- **GrowthBook** - Feature flag management
- **Survicate** - User surveys

### Third-Party Libraries
- `blockly` - Visual programming blocks
- `mobx` / `mobx-react-lite` - State management
- `react-router-dom` - Client-side routing
- `formik` - Form handling
- `@tanstack/react-query` - Server state management
- `js-cookie` - Cookie management
- `localforage` - Client-side storage
- `lz-string` / `pako` - Compression utilities

## Recent Changes

### DBTraders-Style NavBar + Login Fix (March 2026)
- Added `NavBar` component (`src/components/layout/nav-bar/`) with DBTraders-style dark horizontal tabs
- Nav tabs: Dashboard, Bot Editor, Quick Strategy, Free Bots, Manual Trader, Analysis Tool, Charts, Reports, Copy Trading, Signals
- Fixed login: removed OIDC complexity, now goes directly to OAuth URL (reliable on all environments)
- Fixed signup: opens Deriv signup in a new tab instead of same window
- Fixed Free Bots store null-safety (`useStore()` can return null during mount)
- NavBar renders below the header on all pages except the callback page

### Speedboat Hero Section — Layout Level (March 2026)
- SpeedboatSection moved from `dashboard.tsx` to `src/components/layout/index.tsx`
- Shows immediately for non-logged-in users after the Layout chunk loads (no API wait)
- The `<Outlet />` (full trading app) is hidden via `display:none` but still initializes in background
- Detection uses `Cookies.get('logged_state') === 'true'` (same cookie as header auth check)
- When user logs in, cookie changes, `showSpeedboat` becomes false, full trading UI appears
- Files: `src/components/layout/index.tsx`, `src/pages/dashboard/speedboat-section/index.tsx`

### Speedboat Hero Section (March 2026)
- Added animated SVG speedboat hero section for unauthenticated landing experience
- Marketing copy: "Your Unfair Advantage in Trading", 24/7 / 0ms / 100% stats
- Floating feature cards: Bot Automation, Live P&L Tracking
- Dark teal gradient background matching brand colors
- Files: `src/pages/dashboard/speedboat-section/index.tsx`, `.scss`

### KES & African Currency Icons (March 2026)
- Added KES (Kenya), NGN (Nigeria), TZS (Tanzania), UGX (Uganda), ZAR (South Africa) to currency icons
- Uses `CurrencyPlaceholderIcon` from `@deriv/quill-icons` (no dedicated icon in library)
- Decimal places auto-configured from Deriv's `website_status` API response
- File: `src/components/currency/currency-icon.tsx`

### Auth Flow Fixes (March 2026)
- Login: Added 3s TMB timeout + 5s OIDC timeout, falls back to `generateOAuthURL()` redirect
- Sign up: Changed `window.open()` to `window.location.href` (window.open blocked in Replit preview)
- Removed conflicting `window.location.reload()` from `handleOidcAuthFailure`
- Files: `src/components/layout/header/header.tsx`, `src/utils/auth-utils.ts`

### Free Bots Feature (December 2025)
- Added Free Bots page with 12 pre-built trading bot templates
- Bot cards display with category filtering (Speed Trading, AI Trading, Pattern Analysis, etc.)
- Click-to-load functionality that imports bot XML into Bot Builder
- Responsive card design with hover effects and loading states
- Bot XML files stored in `/public/bots/` directory
- Files: `src/pages/free-bots/index.tsx`, `src/pages/free-bots/free-bots.scss`