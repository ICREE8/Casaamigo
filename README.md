# Casaamigo - Fractional Caribbean Real Estate Investment Platform

**Built with Next.js 15.1.7 (Turbopack), React, Leaflet, and Tailwind CSS**

---

## What is Casaamigo?

Casaamigo is a cutting-edge platform that lets you own a piece of paradise—fractional real estate investments in the Caribbean, starting with properties in Colombia (Santa Marta, Medellin) and Venezuela (Isla de Margarita, Tucacas, Merida, Cuyagua). 

It’s public-friendly—anyone can browse properties and drool over the Caribbean dream
---

## Who’s It For?

- **Investors:** Savvy folks looking to dip into Caribbean real estate without buying whole properties—fractional shares start at $12,000-$20,000.
- **Dreamers:** Public users who wanna browse tropical pads—Santa Marta beachfronts to Medellin penthouses—before committing.
- **Devs & Builders:** Open-source enthusiasts or xAI fans wanting to hack on a Next.js app with Leaflet maps, Tailwind styling, and wallet integration.

---

## Features

- **Property Grid:** 3 cards per row on desktop, 1 on mobile—responsive, compact, Airbnb-style—name and `$value` inline, Ochre city/country flair.
- **Interactive Map:** Toggle “Map View”—Ochre pins for Santa Marta, Medellin, and Venezuelan hotspots—click pins to dive into property details.
- **Search Bar:** Type “San” and get “Santa Marta”—filters to our 6 cities, no fluff.
- **Property Dashboards:**
  - **Public View:** Carousel pics, Bedrooms/Baths/Pool left, Home Value/Share Price right—Ochre hooks, Teal details, White contrasts.
  - **Shareholder View:** Adds Your Shares, ROI—same clean split.
- **Wallet Connect:** Login page with MetaMask—connect your Ethereum wallet to invest (social auth TBD).
- **Navigation:** “Return Home” on every page—Ochre button, Tesla-tight UX.

---

## Tech Stack

- **Next.js 15.1.7 (Turbopack):** App Router, server/client split—fast builds, live updates.
- **React:** Client-side magic—carousels, toggles, state-driven grids.
- **Leaflet (react-leaflet):** Lightweight maps—Ochre pins, no Google bloat.
- **Tailwind CSS:** Utility-first styling—Navy Blue (`#1A2A44`), Ochre (`#DAA520`), Teal (`#26A69A`), White (`#FFFFFF`), Warm Gray (`#B0A999`), Charcoal (`#36454F`).
- **Ethers.js:** Wallet connect—MetaMask hooks for Ethereum action.
- **NextAuth.js:** Session wrapper—ready for Google auth (pending `.env` setup).

---

## Prerequisites

- **Node.js:** v18+ (LTS recommended)—powers the beast.
- **npm:** v9+—package muscle (or swap for yarn/pnpm if you’re fancy).
- **MetaMask:** Browser extension—test wallet connect (no real ETH needed yet).
- **Git:** Clone this rocket—`git clone https://github.com/ICREE8/Casaamigo.git`.

---

## Setup Instructions

1. **Clone the Repo:**
   ```bash
   git clone https://github.com/ICREE8/Casaamigo.git
   cd Casaamigo
