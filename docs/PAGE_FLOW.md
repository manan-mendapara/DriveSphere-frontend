# DriveSphere Page Flow

1. The root route `/` plays the local intro video for about 2.5 seconds, then navigates to `/home`.
2. The home page links into the vehicle catalogue through the hero carousel, brand cards, category cards, and featured vehicles.
3. `/cars` supports text search, price/year range filters, brand, body type, fuel type, transmission, seating capacity, and sorting.
4. Selecting a vehicle opens `/cars/:carId`, with an image gallery, specifications, wishlist/compare actions, and local showroom search.
5. Wishlist actions update `drivesphere-wishlist` in browser local storage.
6. Compare actions update `drivesphere-comparison`; no more than two vehicles can be selected. The comparison page can export the current pair as a CSV file.
7. The profile editor stores its optional profile fields in browser local storage. It does not create an account.
8. Showroom search filters bundled sample listings. The directions link opens Google Maps for the selected address.
9. Unknown routes show a not-found page with working navigation to Home or Browse Cars.

All catalogue, wishlist, comparison, profile, and showroom behavior is client-side. No backend is required.
