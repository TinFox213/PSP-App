# AuraFix Nutrition PWA
### AI-Based Consumption-Aware Food Nutrition Tracking System

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-purple.svg)](https://vitejs.dev/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green.svg)](https://web.dev/progressive-web-apps/)
[![Vercel](https://img.shields.io/badge/Vercel-Serverless-black.svg)](https://vercel.com/)
[![Tests](https://img.shields.io/badge/Tests-13%20Passed-brightgreen.svg)](https://vitest.dev/)

AuraFix is an AI-powered Progressive Web App (PWA) designed to solve the primary flaw of conventional nutrition tracking apps: **logging what was served rather than what was actually consumed**. By calculating differential intake (**Served Portion − Leftover Portion = Actual Intake**), AuraFix eliminates false calorie accumulation, flags micronutrient and macronutrient gaps in real-time, and recommends hyper-local, budget-friendly Tamil Nadu dietary substitutions.

---

## Key Innovations & 8-Step Interactive Walkthrough

1. **Personalized Health Baseline**: Contextual health profiles for active diabetic and lean muscle baselines (80g daily protein target).
2. **Computer Vision Served Food Capture**: Simulated multi-label food item detection and portion segmentation (Dosas, Sambar, Chutney).
3. **Differential Intake Math Engine**: Core innovation calculating exact consumed mass (`300g served − 50g leftover = 250g actual intake`), avoiding **+76 kcal unconsumed calorie overcounting**.
4. **Human-in-the-Loop Portion Fine-Tuning**: Quick preset chips (Small 200g, Medium 250g, Large 300g) and custom gram sliders with live macro recalculation.
5. **Real-Time Nutrient Gap Radar**: Instantly flags deficits (`55g / 80g Protein consumed today. Deficit: 25g remaining`).
6. **Hyper-Local Tamil Nadu Recommendations**: Context-aware suggestions filtered by budget and dietary preferences (Sundal ₹20, Boiled Eggs ₹14, Curd ₹15, Moong Dal ₹25).
7. **Multi-Input Conversational Voice Logging**: Natural language speech processing (`"I had one cup of curd and a boiled egg"` auto-parsed into macros).
8. **Preventive Health & Longitudinal Dashboard**: Radial macro gauges, diabetic safety thresholds (`Sodium: Normal | Sugar: Controlled | Fiber: Good`), and 7-day adherence trends.

---

## Responsive Cross-Device Alignment Architecture

AuraFix is built with responsive mobile-first and desktop-adaptive design:

- **Mobile Viewports (< 640px)**:
  - Supports notches, dynamic islands, and home-bar gestures with `viewport-fit=cover` and safe-area utilities (`.pt-safe`, `.pb-safe`).
  - Floating bottom controller includes dynamic clearance (`pb-60 sm:pb-56`) ensuring action buttons are never obscured.
  - Micro-grid adaptations (`grid-cols-2 min-[420px]:grid-cols-4`) prevent text clipping and horizontal overflow on narrow displays (320px–375px).
- **Tablet & Desktop Viewports (640px+)**:
  - **Device View Toggle**: Easily toggle between **📱 Mobile PWA Frame (`max-w-md`)** and **💻 Expanded Dashboard Layout (`max-w-4xl`)** in the header.
  - Scalable SVG plate visualizer with clamped bounding box overlays.

---

## Vercel Serverless REST API Architecture

AuraFix features standalone serverless REST API endpoints located in the `/api` directory for seamless deployment on Vercel:

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Health status check, serverless architecture verification, and version info |
| `/api/profile` | `GET`, `POST`, `PUT` | Fetches and updates user profile, recalculates BMI and target macros |
| `/api/intake-math` | `POST` | Differential consumption engine (`servedWeightG`, `leftoverWeightG`), returns consumed macros and avoided overcount calories |
| `/api/meals` | `GET`, `POST`, `DELETE` | Manages verified logged meals and running daily totals |
| `/api/recommendations` | `GET` | Tamil Nadu regional recommendations with filtering (`dietaryType`, `maxPrice`, `minProtein`) |
| `/api/voice-parse` | `POST` | Voice transcript NLP parsing into structured nutritional entities (supports Gemini AI with deterministic fallback) |

### Local Development Parity
The custom `vercelApiDevPlugin` in `vite.config.ts` emulates Vercel Serverless Functions during local development (`npm run dev`), ensuring 100% parity between local testing and Vercel production without requiring global CLI tools.

---

## Automated Test Suites

The project includes unit and integration tests powered by **Vitest**:

```bash
npm test
```

### Test Coverage:
- `tests/api/intake-math.test.ts`: Differential intake calculation, 100% clean plate, 100% leftover, and avoided overcount savings.
- `tests/api/recommendations.test.ts`: Regional recommendation filtering (Vegan, budget caps, protein thresholds).
- `tests/api/voice-parse.test.ts`: Natural language transcript entity extraction.
- `tests/api/profile.test.ts`: BMI calculation and macro baselines.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 1. Installation
```bash
git clone https://github.com/TinFox213/PSP-App.git
cd PSP-App
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Optional) Provide `GEMINI_API_KEY` to enable Google Gemini AI in voice parsing.*

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Run Automated Tests
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
```

---

## Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git push origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository (`PSP-App`).
4. Framework Preset will be automatically detected as **Vite**.
5. Build and Output Settings:
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
6. *(Optional)* Add `GEMINI_API_KEY` under Environment Variables.
7. Click **Deploy**. Vercel will build the frontend and deploy all endpoints in `/api/*.ts` as serverless functions.

---

## License
MIT License. Crafted for high-precision nutrition tracking and preventive wellness.
