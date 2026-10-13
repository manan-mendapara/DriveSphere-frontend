# DriveSphere — Project Overview

DriveSphere is a frontend-only vehicle discovery and comparison app. Its tagline is **Discover. Compare. Drive.**

## Included features

- Intro loading video and responsive home page
- Hero carousel with working catalogue links
- Brand and category browsing based on the included sample catalogue
- Vehicle search, filters, sorting, detail pages, and image gallery
- Wishlist saved in browser local storage
- Comparison of up to two vehicles, including CSV export
- Local profile editor saved in browser local storage
- Sample showroom directory search with Google Maps directions links
- Responsive navigation, footer, and not-found route

## Technology

- React and React DOM
- Vite
- React Router
- Tailwind CSS v4 with the Vite plugin
- Lucide React icons

## Run locally

```bash
npm install
npm run dev
```

Build verification command:

```bash
npm run build
```

## Data limitations

The project uses local demonstration data and does not call a backend. Vehicle prices/specifications and showroom listings are not live or independently verified. Wishlist, comparison, and profile data stay in the current browser's local storage. No login or logout feature is included.
