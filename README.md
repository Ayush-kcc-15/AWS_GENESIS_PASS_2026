# GENESIS 2026 — Single-Page Digital Attendee Pass Generator
### AWS Student Builder Group — KCC Institute of Technology & Management

> **Tagline:** DISCOVER AWS. UNLOCK THE CLOUD.  
> **Institution:** KCC Institute of Technology & Management, Greater Noida, Delhi-NCR  
> **Brand Identity:** Midnight Navy (`#080F1B`), Dark Navy (`#0B1420`), Electric Blue (`#4ABFFF`), Cyan (`#55C5FF`), White (`#FFFFFF`).

---

## 1. Project Overview

A focused, single-page web application dedicated to generating personalized digital attendee passes for **GENESIS 2026**, organized by the **AWS Student Builder Group (AWS SBG)** at **KCC Institute of Technology & Management**.

### User Journey (All within ONE Page):
1. **Open Website:** Immediate access to the pass generator without distracting event landing page clutter.
2. **Enter Details (Left Column):** Full Name, College/Organization, and Optional Social handles (LinkedIn, Instagram).
3. **Upload & Crop Photo:** Drag-and-drop or file browse with real-time zoom, rotation, and cropping.
4. **Live Preview (Right Column):** Instant real-time updates on the official 3:4 master Genesis attendee pass.
5. **Generate Pass:** One click activates the success state.
6. **Download & Share:** 
   - High-Resolution **1080 × 1440 PNG** export.
   - 1-click sharing to **LinkedIn**, **Instagram**, and **WhatsApp** with personalized captions.
   - Native device sharing sheet via Web Share API.
   - "Generate Another Pass" for creating multiple passes.

---

## 2. Key Features

- **Single-Page Experience:** No page hopping or traditional multi-page routes.
- **Master Design Fidelity:** Dynamic recreation of the official approved pass using layered SVG, HTML, and CSS (with original AWS SBG and KCC ITM logos).
- **100% Client-Side Privacy:** Photos are cropped and rendered strictly in browser memory. Zero files are uploaded to any backend.
- **Adaptive Layout:** Responsive 2-column layout on desktop; streamlined vertical stacking on mobile.
- **Lossless PNG Export:** 1080 × 1440 PNG rendered directly from the pass component via `html-to-image`.

---

## 3. Tech Stack

- **React 18** with **TypeScript**
- **Vite 6**
- **Tailwind CSS** (Custom cyber-grid & glassmorphism theme)
- **Framer Motion**
- **`react-easy-crop`** (Interactive crop, pan & zoom)
- **`html-to-image`** (High-res 1080×1440 canvas rendering)
- **Lucide React**

---

## 4. Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```
Preview at [http://localhost:5173](http://localhost:5173).

---

## 5. Production Build

```bash
# Compile and bundle
npm run build

# Preview build locally
npm run preview
```

Output is compiled to the `dist/` folder.
