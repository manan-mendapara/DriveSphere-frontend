
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

import Navbar from '../components/navbar/Navbar.jsx';
import Footer from '../components/footer/Footer.jsx';
import SearchBar from '../components/search-bar/SearchBar.jsx';
import FilterPanel from '../components/filter-panel/FilterPanel.jsx';
import CarCardGrid from '../components/car-card/CarCardGrid.jsx';
import NoResults from '../components/common/NoResults.jsx';

import { useCars } from '../context/CarContext.jsx';

import './Cars.css';

const initialFilters = (params) => ({
  brand: params.get('brand') || '',
  bodyType: params.get('bodyType') || '',
  fuelType: params.get('fuelType') || '',
  transmission: params.get('transmission') || '',
  minPrice: '',
  maxPrice: '',
  minYear: '',
  maxYear: '',
  seatingCapacity: '',
});

export default function Cars() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cars } = useCars();

  const [filters, setFilters] = useState(() =>
    initialFilters(searchParams)
  );
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const search = searchParams.get('search') || '';

  useEffect(() => {
    setFilters(initialFilters(searchParams));
  }, [searchParams]);

  const visibleCars = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = cars.filter((car) => {
      const searchableText =
        `${car.brand ?? ''} ${car.model ?? ''} ${car.variant ?? ''}`
          .toLowerCase();

      return (
        (!query || searchableText.includes(query)) &&
        (!filters.brand ||
          String(car.brand ?? '')
            .toLowerCase()
            .includes(filters.brand.toLowerCase())) &&
        (!filters.bodyType ||
          String(car.bodyType ?? '').toLowerCase() ===
            filters.bodyType.toLowerCase()) &&
        (!filters.fuelType ||
          String(car.fuelType ?? '').toLowerCase() ===
            filters.fuelType.toLowerCase()) &&
        (!filters.transmission ||
          String(car.transmission ?? '').toLowerCase() ===
            filters.transmission.toLowerCase()) &&
        (filters.minPrice === '' ||
          Number(car.price) >= Number(filters.minPrice)) &&
        (filters.maxPrice === '' ||
          Number(car.price) <= Number(filters.maxPrice)) &&
        (filters.minYear === '' ||
          Number(car.year) >= Number(filters.minYear)) &&
        (filters.maxYear === '' ||
          Number(car.year) <= Number(filters.maxYear)) &&
        (filters.seatingCapacity === '' ||
          Number(car.seatingCapacity) ===
            Number(filters.seatingCapacity))
      );
    });

    const sorters = {
      price_asc: (a, b) => Number(a.price) - Number(b.price),
      price_desc: (a, b) => Number(b.price) - Number(a.price),
      newest: (a, b) => Number(b.year) - Number(a.year),
      oldest: (a, b) => Number(a.year) - Number(b.year),
      mileage_desc: (a, b) =>
        Number(b.engine?.mileage || 0) -
        Number(a.engine?.mileage || 0),
    };

    return sorters[sortBy]
      ? [...result].sort(sorters[sortBy])
      : result;
  }, [cars, filters, search, sortBy]);

  const handleSearch = (term) => {
    const nextParams = new URLSearchParams(searchParams);
    const trimmedTerm = term.trim();

    if (trimmedTerm) {
      nextParams.set('search', trimmedTerm);
    } else {
      nextParams.delete('search');
    }

    setSearchParams(nextParams);
  };

  const handleFilterChange = (nextFilters) => {
    setFilters((current) => ({
      ...current,
      ...nextFilters,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters(new URLSearchParams()));

    const nextParams = new URLSearchParams();

    if (search.trim()) {
      nextParams.set('search', search);
    }

    setSearchParams(nextParams);
  };

  return (
    <>
      <Navbar />

      <main className="cars-page">
        <div className="cars-container">
          {/* Page Header */}
          <header className="cars-header">
            <p className="cars-eyebrow">
              THE CATALOGUE
            </p>

            <h1 className="cars-title">
              Find Your Perfect Car
            </h1>

            <p className="cars-description">
              Explore available vehicles, refine your search
              by specifications, and compare up to two cars
              side by side.
            </p>
          </header>

          {/* Search and Filter Controls */}
          <section
            className="cars-search-section"
            aria-label="Search and filter vehicles"
          >
            <div className="cars-search-row">
              <div className="cars-search-control">
                <SearchBar
                  key={search}
                  onSearch={handleSearch}
                  placeholder="Search by brand, model, or variant..."
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowFilters((open) => !open)
                }
                aria-expanded={showFilters}
                aria-controls="cars-filter-panel"
                className={`cars-filter-toggle ${
                  showFilters ? 'cars-filter-toggle-active' : ''
                }`}
              >
                <SlidersHorizontal
                  size={17}
                  aria-hidden="true"
                />

                <span>
                  {showFilters ? 'Hide filters' : 'Filters'}
                </span>
              </button>
            </div>

            {showFilters && (
              <div
                id="cars-filter-panel"
                className="cars-filter-panel"
              >
                <FilterPanel
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  currentFilters={filters}
                />
              </div>
            )}
          </section>

          {/* Results Toolbar */}
          <section
            className="cars-results-toolbar"
            aria-label="Search results controls"
          >
            <p className="cars-results-count" aria-live="polite">
              <span className="cars-results-number">
                {visibleCars.length}
              </span>

              {visibleCars.length === 1
                ? ' vehicle found'
                : ' vehicles found'}
            </p>

            <label className="cars-sort-control">
              <span className="cars-sort-label">
                <ArrowUpDown size={15} aria-hidden="true" />
                Sort by
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                className="cars-sort-select"
              >
                <option value="relevance">Recommended</option>
                <option value="price_asc">
                  Price: Low to High
                </option>
                <option value="price_desc">
                  Price: High to Low
                </option>
                <option value="newest">
                  Newest Model Year
                </option>
                <option value="oldest">
                  Oldest Model Year
                </option>
                <option value="mileage_desc">
                  Highest Mileage/Range
                </option>
              </select>
            </label>
          </section>

          {/* Car Results */}
          <section className="cars-results">
            {visibleCars.length > 0 ? (
              <CarCardGrid
                cars={visibleCars}
                onViewDetails={(id) =>
                  navigate(`/cars/${id}`)
                }
              />
            ) : (
              <NoResults
                title="No matching cars"
                description="Try a different search or reset your filters to see the full catalogue."
                onPrimaryAction={handleResetFilters}
                primaryActionText="Reset search and filters"
              />
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}