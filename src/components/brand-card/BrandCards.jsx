
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, CarFront } from 'lucide-react';
import { useCars } from '../../context/CarContext.jsx';
import './BrandCards.css';

export default function BrandCards({ onBrandSelect }) {
  const { cars } = useCars();

  const brands = [
    ...new Set(cars.map((car) => car.brand).filter(Boolean)),
  ].sort();

  const navigate = useNavigate();

  const select = (brand) => {
    if (onBrandSelect) {
      onBrandSelect(brand);
    } else {
      navigate(`/cars?brand=${encodeURIComponent(brand)}`);
    }
  };

  return (
    <div className="brand-cards-grid">
      {brands.map((brand) => (
        <button
          key={brand}
          type="button"
          onClick={() => select(brand)}
          className="brand-card"
          aria-label={`Explore ${brand} cars`}
        >
          <span className="brand-card__icon">
            <CarFront size={26} strokeWidth={1.8} />
          </span>

          <span className="brand-card__name">
            {brand}
          </span>

          <span className="brand-card__action">
            Explore
            <ArrowUpRight size={14} />
          </span>
        </button>
      ))}
    </div>
  );
}
