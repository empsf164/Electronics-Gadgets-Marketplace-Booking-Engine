# VOLTARA — Electronics Gadgets Marketplace & Booking Engine

> **“Discover Better Tech. Book Smarter Service.”**

VOLTARA is a premium, production-quality Electronics Gadgets Discovery, Service Marketplace, and Real-Time Appointment Scheduling Engine. Engineered with an obsidian high-tech aesthetic, transparent upfront instant quote calculations, and a 25% deposit escrow checkout model.

---

## 🌟 Core Features & Workflows

### 1. Flagship 6-Step Multi-Step Booking Engine (`booking.html`)
- **Step 01 — Service & Device**: Select category, model name, service type, host specialist, urgency tier (Standard 24h, Express 4h, Immediate 60-90m), and modular add-on protection.
- **Step 02 — Real-Time Calendar (`calendar.js`)**: Interactive month navigation with color-coded day availability (Available, Limited, Booked/Blackout).
- **Step 03 — Time Slot Grid**: Dynamic intake slots grouped by Morning, Afternoon, and Evening with status tags (*Available*, *1 Slot Left*, *Fast-Track Bench*).
- **Step 04 — Upfront Itemized Quote (`pricing.js`)**: Transparent calculation of Base Price, Urgency Surcharge, Add-ons, Platform Escrow Fee, 18% Tax, Grand Total, and **25% Deposit Due Today** vs Remaining Balance.
- **Step 05 — Customer & Hardware Intake**: Contact information, serial number/IMEI, symptom notes, and drag-and-drop device photo upload preview mock.
- **Step 06 — Secure Deposit Escrow UI**: Interactive virtual credit card with live input mirroring, UPI / Dynamic QR Code toggle, Instant Wallets (Apple Pay/Google Pay), and simulated escrow authorization leading directly to `booking-confirmation.html`.

### 2. Live Dynamic Quote Calculator (`service-details.html`)
- Real-time recalculation as device model, service variant, urgency level, or add-ons change.
- Detailed *What's Included* vs *What's Not Included* breakdown.
- Cleanroom laboratory specifications and step-by-step diagnostic workflow.

### 3. Marketplace Discovery & Instant Filters (`explore.html`)
- Live search across gadgets, services, and hosts.
- Sidebar filters for Device Categories, Price Range slider, Host Facility Types (Service Center Lab, Mobile Van Fleet, Independent Specialist), Verified-Only toggle, and Available Today toggle.
- Sort by Recommended, Highest Rated, Lowest Price, Fastest Turnaround.
- Interactive Grid / List view switcher.

### 4. Verified Host Profile & Setup Interface
- **Host Profile (`host-profile.html`)**: Cleanroom tooling showcase (Branson 40kHz ultrasonic tanks, FLIR infrared thermal scan, Class 100 HEPA laminar benches, JBC micro-soldering), certifications (Apple ACiT, IPC-7711), real-time schedule preview, verified customer reviews, and direct booking buttons.
- **Host Availability Setup (`host-setup.html`)**: Focused provider management interface allowing technicians to configure working days, bench hours, slot durations (30/45/60/90/120 mins), custom pricing, and deposit rules with a live synced preview card.

### 5. Obsidian Tech Design System & Theme Engine
- **Dark / Light Modes (`theme.js`, `theme.css`)**: Deep graphite/obsidian `#07090E` default, crisp clean light mode `#F8FAFC`, electric blue accent `#0066FF`, metallic borders, and smooth transition toggles with `localStorage` persistence.
- **Typography**: Space Grotesk (headings) and Inter (body/UI) via Google Fonts.
- **Global Search Modal (`Ctrl + K`)**: Instant cross-catalog fuzzy searching for gadgets, services, hosts, and guides.
- **Toast Notification Engine (`VoltaraToast`)**: Non-intrusive feedback for themes, filters, bookings, and form submissions.

---

## 📁 Project Structure

```text
Electronics-Gadgets-Marketplace-Booking-Engine/
├── index.html                  # Homepage with Hero, Quick Finder, Featured Services & Hosts
├── explore.html                # Marketplace discovery with live search, filters, and list/grid views
├── service-details.html        # Service breakdown with interactive Instant Quote Calculator
├── host-profile.html           # Verified provider lab profile, specs, reviews & schedule
├── booking.html                # Flagship 6-step multi-step real-time booking engine
├── booking-confirmation.html   # Confirmed booking pass, QR code, receipt breakdown & actions
├── host-setup.html             # Host bench availability, working hours & pricing configuration
├── guides.html                 # Technical teardowns, thermal guides & triage protocols
├── about.html                  # Marketplace philosophy, 5-stage verification & escrow standard
├── contact.html                # Priority engineering triage form, direct channels & FAQ
├── login.html                  # Minimal auth with Customer & Host demo autofill shortcuts
├── signup.html                 # Dual role registration (Customer vs Service Provider Host)
├── forgot-password.html        # 2-step animated password recovery with email verification state
├── 404.html                    # Branded error page matching Voltara aesthetic
├── coming-soon.html            # VIP early access & city expansion waitlist
│
├── assets/
│   ├── css/
│   │   ├── theme.css           # Design tokens, dark/light variables & typography
│   │   ├── style.css           # Navbar, hero, cards, stepper, calendar, virtual card & footer
│   │   └── responsive.css      # Fluid responsive breakpoints (320px to 2560px+)
│   │
│   └── js/
│       ├── data.js             # Centralized master catalog for gadgets, services, hosts & guides
│       ├── theme.js            # Dark/light theme controller & system preference detector
│       ├── pricing.js          # Dynamic instant quote calculation & deposit split formulas
│       ├── calendar.js         # Real-time calendar renderer & time slot status generator
│       ├── booking.js          # 6-step multi-step wizard controller & payment simulator
│       ├── auth.js             # Login/Signup/Forgot password handlers & demo autofill
│       └── main.js             # Global navbar scroll, mobile drawer, toast manager & search modal
│
└── README.md
```

---

## 🚀 Running Locally

No complex build tools or backend dependencies required! Simply serve the static directory using any local development server or open `index.html` directly in your browser:

```bash
# Using Python
python -m http.server 8000

# Or using Node.js npx serve
npx serve .
```

Then visit: `http://localhost:8000`

---

## 🛡️ License & Credits

Built as part of the VOLTARA premium marketplace demonstration platform. Designed for production quality, responsiveness, and performance.
