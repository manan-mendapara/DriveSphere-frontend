
import React, { useEffect, useState } from 'react';
import './FilterPanel.css';

const INITIAL_FILTERS = {
  minPrice: '',
  maxPrice: '',
  brand: '',
  fuelType: '',
  bodyType: '',
  transmission: '',
  minYear: '',
  maxYear: '',
  seatingCapacity: '',
};

const NUMERIC_FILTERS = [
  'minPrice',
  'maxPrice',
  'minYear',
  'maxYear',
  'seatingCapacity',
];

const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];

const BODY_TYPES = [
  'Hatchback',
  'Sedan',
  'SUV',
  'MUV/MPV',
  'Coupe',
  'Convertible',
  'Pickup Truck',
  'Luxury Cars',
  'Electric Vehicles',
];

const TRANSMISSIONS = ['Automatic', 'Manual', 'CVT', 'DCT'];

const FilterPanel = ({
  onFilterChange,
  onResetFilters,
  currentFilters = {},
}) => {
  const [filters, setFilters] = useState({
    ...INITIAL_FILTERS,
    ...currentFilters,
  });

  const [validationError, setValidationError] = useState('');

  // Sync local inputs when parent filters change.
  useEffect(() => {
    setFilters({
      ...INITIAL_FILTERS,
      ...currentFilters,
    });
  }, [currentFilters]);

  const handleChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));

    setValidationError('');
  };

  const handleApplyFilters = (event) => {
    event.preventDefault();

    const processedFilters = {};

    for (const [key, value] of Object.entries(filters)) {
      if (value === '' || value === null || value === undefined) {
        continue;
      }

      if (NUMERIC_FILTERS.includes(key)) {
        const numberValue = Number(value);

        if (!Number.isFinite(numberValue)) {
          continue;
        }

        processedFilters[key] = numberValue;
      } else {
        processedFilters[key] =
          typeof value === 'string' ? value.trim() : value;
      }
    }

    setValidationError('');

    if (
      processedFilters.minPrice !== undefined &&
      processedFilters.maxPrice !== undefined &&
      processedFilters.minPrice > processedFilters.maxPrice
    ) {
      setValidationError(
        'Minimum price cannot exceed maximum price.'
      );
      return;
    }

    if (
      processedFilters.minYear !== undefined &&
      processedFilters.maxYear !== undefined &&
      processedFilters.minYear > processedFilters.maxYear
    ) {
      setValidationError(
        'Minimum year cannot exceed maximum year.'
      );
      return;
    }

    onFilterChange?.(processedFilters);
  };

  const handleReset = () => {
    setFilters({ ...INITIAL_FILTERS });
    setValidationError('');
    onResetFilters?.();
  };

  const renderRadioOptions = (name, options) => (
    <div className="filter-radio-options">
      {options.map((option) => (
        <label
          key={option}
          className="filter-radio-label"
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={filters[name] === option}
            onChange={(event) =>
              handleChange(name, event.target.value)
            }
            className="filter-radio-input"
          />

          <span>{option}</span>
        </label>
      ))}

      <label className="filter-radio-label">
        <input
          type="radio"
          name={name}
          value=""
          checked={!filters[name]}
          onChange={() => handleChange(name, '')}
          className="filter-radio-input"
        />

        <span>Any</span>
      </label>
    </div>
  );

  return (
    <form
      onSubmit={handleApplyFilters}
      className="filter-panel"
    >
      {/* Header */}
      <div className="filter-panel-header">
        <h3 className="filter-panel-title">Filter Cars</h3>

        <p className="filter-panel-description">
          Narrow down your search with these filters.
        </p>
      </div>

      {/* Price Range */}
      <div className="filter-field">
        <label className="filter-label">
          Price Range (INR)
        </label>

        <div className="filter-input-grid">
          <input
            type="number"
            aria-label="Minimum price"
            value={filters.minPrice}
            onChange={(event) =>
              handleChange('minPrice', event.target.value)
            }
            className="filter-input"
            placeholder="Min price"
            min="0"
          />

          <input
            type="number"
            aria-label="Maximum price"
            value={filters.maxPrice}
            onChange={(event) =>
              handleChange('maxPrice', event.target.value)
            }
            className="filter-input"
            placeholder="Max price"
            min="0"
          />
        </div>
      </div>

      {/* Brand */}
      <div className="filter-field">
        <label
          htmlFor="filter-brand"
          className="filter-label"
        >
          Brand
        </label>

        <input
          id="filter-brand"
          type="text"
          value={filters.brand}
          onChange={(event) =>
            handleChange('brand', event.target.value)
          }
          className="filter-input"
          placeholder="Enter brand name"
        />
      </div>

      {/* Fuel Type */}
      <fieldset className="filter-field filter-fieldset">
        <legend className="filter-label">Fuel Type</legend>
        {renderRadioOptions('fuelType', FUEL_TYPES)}
      </fieldset>

      {/* Body Type */}
      <fieldset className="filter-field filter-fieldset">
        <legend className="filter-label">Body Type</legend>
        {renderRadioOptions('bodyType', BODY_TYPES)}
      </fieldset>

      {/* Transmission */}
      <fieldset className="filter-field filter-fieldset">
        <legend className="filter-label">Transmission</legend>
        {renderRadioOptions('transmission', TRANSMISSIONS)}
      </fieldset>

      {/* Model Year */}
      <div className="filter-field">
        <label className="filter-label">Model Year</label>

        <div className="filter-input-grid">
          <input
            type="number"
            aria-label="Minimum model year"
            value={filters.minYear}
            onChange={(event) =>
              handleChange('minYear', event.target.value)
            }
            className="filter-input"
            placeholder="Min year"
            min="1980"
            max={new Date().getFullYear() + 1}
          />

          <input
            type="number"
            aria-label="Maximum model year"
            value={filters.maxYear}
            onChange={(event) =>
              handleChange('maxYear', event.target.value)
            }
            className="filter-input"
            placeholder="Max year"
            min="1980"
            max={new Date().getFullYear() + 1}
          />
        </div>
      </div>

      {/* Seating Capacity */}
      <div className="filter-field">
        <label
          htmlFor="filter-seats"
          className="filter-label"
        >
          Seating Capacity
        </label>

        <select
          id="filter-seats"
          value={filters.seatingCapacity}
          onChange={(event) =>
            handleChange('seatingCapacity', event.target.value)
          }
          className="filter-input filter-select"
        >
          <option value="">Any Capacity</option>

          {[2, 3, 4, 5, 6, 7, 8].map((seats) => (
            <option key={seats} value={seats}>
              {seats} Seats
            </option>
          ))}
        </select>
      </div>

      {/* Validation Error */}
      {validationError && (
        <p
          role="alert"
          className="filter-validation-error"
        >
          {validationError}
        </p>
      )}

      {/* Actions */}
      <div className="filter-actions">
        <button
          type="submit"
          className="filter-button filter-button-primary"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="filter-button filter-button-secondary"
        >
          Reset Filters
        </button>
      </div>
    </form>
  );
};

export default FilterPanel;
