import React from 'react';
import { Link } from 'react-router-dom';
import { useCars } from '../../context/CarContext.jsx';
import CarCard from './CarCard.jsx';
import LoadingSpinner from '../loader/LoadingSpinner.jsx';
import './FeaturedCars.css';

export default function FeaturedCars({
  onWishlistToggle,
  onCompareToggle,
  isLoading = false,
}) {
  const { cars = [] } = useCars();

  if (isLoading) {
    return (
      <div className="featured-cars-loading">
        <LoadingSpinner />

        <p className="featured-cars-loading__text">
          Loading featured cars...
        </p>
      </div>
    );
  }

  const featured = cars.slice(0, 3);

  return (
    <section className="featured-cars">
      {featured.length > 0 ? (
        <div className="featured-cars__grid">
          {featured.map((car) => (
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
            />
          ))}
        </div>
      ) : (
        <div className="featured-cars__empty">
          <p>No featured cars are available right now.</p>
        </div>
      )}

      <div className="featured-cars__footer">
        <Link to="/cars" className="featured-cars__button">
          Explore all cars
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}