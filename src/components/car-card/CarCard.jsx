import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, GitCompareArrows, Check } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useCompare } from '../../context/CompareContext.jsx';
import './CarCard.css';

export default function CarCard({
  car,
  onWishlistToggle,
  onCompareToggle,
}) {
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const {
    addToCompare,
    removeFromCompare,
    isInCompare,
    comparisonCount,
  } = useCompare();

  const saved = isInWishlist(car.id);
  const compared = isInCompare(car.id);

  const fallbackImage = '/images/carousel-1.png';
  const image = car.images?.thumbnail || fallbackImage;

  const toggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (onWishlistToggle) {
      onWishlistToggle(car);
      return;
    }

    if (saved) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  const toggleCompare = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!compared && comparisonCount >= 2) {
      return;
    }

    if (onCompareToggle) {
      onCompareToggle(car);
      return;
    }

    if (compared) {
      removeFromCompare(car.id);
    } else {
      addToCompare(car);
    }
  };

  const compareLimitReached = !compared && comparisonCount >= 2;

  return (
    <article className="car-card">
      <Link
        to={`/cars/${car.id}`}
        className="car-card__image-link"
        aria-label={`View ${car.brand} ${car.model} details`}
      >
        <div className="car-card__image-container">
          <img
            src={image}
            alt={`${car.brand} ${car.model}`}
            loading="lazy"
            className="car-card__image"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackImage;
            }}
          />

          <div className="car-card__badges">
            {car.fuelType === 'Electric' && (
              <span className="car-card__badge car-card__badge--electric">
                Electric
              </span>
            )}

            {car.fuelType === 'Hybrid' && (
              <span className="car-card__badge car-card__badge--hybrid">
                Hybrid
              </span>
            )}
          </div>

          <span className="car-card__year">
            {car.year}
          </span>
        </div>
      </Link>

      <div className="car-card__content">
        <Link
          to={`/cars/${car.id}`}
          className="car-card__details-link"
        >
          <p className="car-card__brand">
            {car.brand}
          </p>

          <h3 className="car-card__title">
            {car.model}{' '}
            <span className="car-card__variant">
              {car.variant || ''}
            </span>
          </h3>
        </Link>

        <p className="car-card__price">
          {formatPrice(car.price)}
        </p>

        <div className="car-card__specifications">
          <span className="car-card__spec">
            {car.bodyType || 'Vehicle'}
          </span>

          <span className="car-card__spec">
            {car.fuelType || 'Fuel N/A'}
          </span>

          <span className="car-card__spec">
            {car.transmission || 'Transmission N/A'}
          </span>
        </div>

        <div className="car-card__actions">
          <button
            type="button"
            onClick={toggleWishlist}
            aria-pressed={saved}
            className={`car-card__button ${
              saved
                ? 'car-card__button--primary'
                : 'car-card__button--outline'
            }`}
          >
            <Heart
              size={16}
              fill={saved ? 'currentColor' : 'none'}
            />
            <span>{saved ? 'Saved' : 'Wishlist'}</span>
          </button>

          <button
            type="button"
            onClick={toggleCompare}
            aria-pressed={compared}
            disabled={compareLimitReached}
            title={
              compareLimitReached
                ? 'Remove a car from Compare before adding another'
                : 'Add to comparison'
            }
            className={`car-card__button ${
              compared
                ? 'car-card__button--primary'
                : 'car-card__button--outline'
            } ${compareLimitReached ? 'car-card__button--disabled' : ''}`}
          >
            {compared ? (
              <Check size={16} />
            ) : (
              <GitCompareArrows size={16} />
            )}

            <span>{compared ? 'Added' : 'Compare'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}