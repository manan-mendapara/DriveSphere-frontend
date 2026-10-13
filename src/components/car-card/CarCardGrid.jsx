
import React from 'react';
import CarCard from './CarCard.jsx';
import LoadingSpinner from '../loader/LoadingSpinner.jsx';
import './CarCardGrid.css';

const CarCardGrid = ({
  cars = [],
  onWishlistToggle,
  onCompareToggle,
  onViewDetails,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="car-grid-loading">
        <LoadingSpinner />
        <p className="car-grid-loading__text">
          Loading cars...
        </p>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="car-grid-empty">
        <div className="car-grid-empty__icon" aria-hidden="true">
          🚗
        </div>

        <h3 className="car-grid-empty__title">
          No cars found
        </h3>

        <p className="car-grid-empty__text">
          No cars match your current filters.
          Try changing your search or filter options.
        </p>
      </div>
    );
  }

  return (
    <div className="car-card-grid">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onWishlistToggle={
            onWishlistToggle
              ? () => onWishlistToggle(car.id)
              : undefined
          }
          onCompareToggle={
            onCompareToggle
              ? () => onCompareToggle(car.id)
              : undefined
          }
          onViewDetails={
            onViewDetails
              ? () => onViewDetails(car.id)
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default CarCardGrid;