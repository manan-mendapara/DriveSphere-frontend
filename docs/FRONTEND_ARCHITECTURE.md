# DriveSphere Frontend Architecture

DriveSphere is a client-side React application built with Vite, React Router, Tailwind CSS v4, and Lucide icons. It does not start or call a backend server.

## Application entry

- `src/main.jsx` loads the global styles and wraps the app in the car, wishlist, and comparison contexts.
- `src/App.jsx` defines the loading, home, catalogue, vehicle details, wishlist, comparison, about, profile, and not-found routes.
- `src/layouts/MainLayout.jsx` handles route-change scroll reset.

## Data and state

- `src/data/cars.js` is the local sample catalogue.
- `src/context/CarContext.jsx` provides the catalogue to pages and components.
- `src/context/WishlistContext.jsx` stores the user's shortlist in `localStorage`.
- `src/context/CompareContext.jsx` stores up to two vehicles in `localStorage`.
- `src/services/carService.js` and `src/services/showroomService.js` expose local demo data helpers only.
- `src/utils/carImages.js` maps catalogue entries to bundled local images.

## Routes

- `/` — video loading intro; automatically navigates to `/home`.
- `/home` — hero carousel, engine explorer, available brands and categories, featured vehicles.
- `/cars` — search, filtering, sorting, and catalogue cards.
- `/cars/:carId` — vehicle details, image gallery, specifications, and showroom search.
- `/wishlist` — manage saved vehicles.
- `/compare` — compare up to two vehicles and export CSV.
- `/about` — project and feature overview.
- `/profile` — optional local profile editor, stored in the browser.

## Styling and assets

- `src/tailwind.css` loads Tailwind v4 and defines the DriveSphere color theme.
- `src/styles/` contains global reset, variables, component styles, responsiveness, and animations.
- `public/images/` and `public/videos/` contain local image and intro-video assets.

## Deliberate boundaries

There are no login or logout screens, no authentication service, no database, and no API server. Vehicle and showroom content is sample data. Browser storage is local to the current browser profile.
