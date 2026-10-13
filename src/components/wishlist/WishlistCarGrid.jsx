
import React from 'react';
import CarCard from '../car-card/CarCard.jsx';
import { Heart, CarFront } from 'lucide-react';
import './WishlistCarGrid.css';

const WishlistCarGrid = ({
  cars = [],
  onWishlistToggle,
  onCompareToggle,
  onViewDetails,
}) => {
  if (cars.length === 0) {
    return (
      <div className="wishlist-empty" role="status">
        <div className="wishlist-empty-icon">
          <Heart size={32} strokeWidth={1.6} />
        </div>

        <h3 className="wishlist-empty-title">
          Your wishlist is empty
        </h3>

        <p className="wishlist-empty-description">
          Save your favorite cars to keep them all in one place.
          Your next dream car might be just a click away!
        </p>

        <div className="wishlist-empty-decoration" aria-hidden="true">
          <CarFront size={20} />
          <span>Discover your next ride</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-car-grid">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onWishlistToggle={() => onWishlistToggle?.(car.id)}
          onCompareToggle={() => onCompareToggle?.(car.id)}
          onViewDetails={() => onViewDetails?.(car.id)}
        />
      ))}
    </div>
  );
};

export default WishlistCarGrid;