# DriveSphere Component Guide

## Shared navigation and layout

- `components/navbar/Navbar.jsx` — responsive route navigation with live wishlist and comparison counts; intentionally contains no login/logout actions.
- `components/footer/Footer.jsx` — working internal links and project summary.
- `layouts/MainLayout.jsx` — nested route outlet and scroll reset.

## Vehicle discovery

- `components/carousel/HeroCarousel.jsx` — auto-advancing hero carousel with working catalogue links.
- `components/brand-card/BrandCards.jsx` — derives brand cards from the current local catalogue.
- `components/category-card/CategoryCards.jsx` — derives categories from the local catalogue.
- `components/car-card/CarCard.jsx` — vehicle card, details link, wishlist toggle, and compare toggle.
- `components/car-card/CardCardGrid.jsx` — responsive vehicle grid.
- `components/filter-panel/FilterPanel.jsx` — search filters with inline range validation.
- `components/search-bar/SearchBar.jsx` — catalogue text search.

## Vehicle details and tools

- `components/common/ImageGallery.jsx` — image navigation and thumbnails.
- `components/common/CarSpecs.jsx` — renders available vehicle specifications.
- `components/compare/ComparisonTable.jsx` — side-by-side comparison and CSV export.
- `components/wishlist/WishlistCarGrid.jsx` — saved vehicle grid.
- `components/showroom-map/ShowroomMap.jsx` — local showroom search and Google Maps directions.
- `components/engine-explorer/EngineExplorer.jsx` — interactive educational engine-component descriptions.
- `components/common/DiscoverySection.jsx` — navigation shortcuts to catalogue tools.

## State and persistence

- `context/CarContext.jsx` — shared vehicle catalogue.
- `context/WishlistContext.jsx` — browser-persisted wishlist.
- `context/CompareContext.jsx` — browser-persisted comparison list, limited to two cars.

The application has no backend, database, login, or logout functionality. Data that is stored in the browser is not synced between devices.
