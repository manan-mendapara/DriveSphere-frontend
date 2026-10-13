
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CarFront, Zap, ArrowUpRight } from 'lucide-react';
import { useCars } from '../../context/CarContext.jsx';
import './CategoryCards.css';

export default function CategoryCards({ onCategorySelect }) {
  const { cars = [] } = useCars();
  const navigate = useNavigate();

  const categories = [
    ...new Set(
      cars.map((car) => car.bodyType).filter(Boolean)
    ),
  ]
    .sort()
    .map((name) => ({
      name,
      type: 'bodyType',
      count: cars.filter((car) => car.bodyType === name).length,
    }));

  const electricCount = cars.filter(
    (car) => car.fuelType === 'Electric'
  ).length;

  if (electricCount > 0) {
    categories.push({
      name: 'Electric Vehicles',
      type: 'fuelType',
      count: electricCount,
    });
  }

  const select = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category.name);
      return;
    }

    const filterValue =
      category.type === 'fuelType' ? 'Electric' : category.name;

    navigate(
      `/cars?${category.type}=${encodeURIComponent(filterValue)}`
    );
  };

  return (
    <div className="category-cards-grid">
      {categories.map((category) => (
        <button
          key={`${category.type}-${category.name}`}
          type="button"
          onClick={() => select(category)}
          className="category-card"
          aria-label={`Explore ${category.name}, ${category.count} ${
            category.count === 1 ? 'vehicle' : 'vehicles'
          } available`}
        >
          <span className="category-card__icon">
            {category.type === 'fuelType' ? (
              <Zap size={24} strokeWidth={1.8} />
            ) : (
              <CarFront size={24} strokeWidth={1.8} />
            )}
          </span>

          <span className="category-card__content">
            <span className="category-card__heading">
              <span className="category-card__name">
                {category.name}
              </span>

              <ArrowUpRight
                size={18}
                className="category-card__arrow"
                aria-hidden="true"
              />
            </span>

            <span className="category-card__description">
              {category.count}{' '}
              {category.count === 1 ? 'vehicle' : 'vehicles'} available
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}