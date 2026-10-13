
import React from 'react';
import { formatPrice } from '../../utils/formatPrice.jsx';
import './CarSpecs.css';

const labelFor = (key) =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (value) => value.toUpperCase());

const display = (value) => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (value === null || value === undefined || value === '') {
    return 'Not available';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return value;
};

export default function CarSpecs({ car }) {
  if (!car) {
    return (
      <p className="car-specs__unavailable">
        Vehicle specifications are unavailable.
      </p>
    );
  }

  const groups = [
    {
      title: 'Overview',
      data: {
        brand: car.brand,
        model: car.model,
        variant: car.variant || 'Standard',
        year: car.year,
        price: formatPrice(car.price),
        bodyType: car.bodyType,
        seatingCapacity: car.seatingCapacity
          ? `${car.seatingCapacity} seats`
          : null,
        fuelType: car.fuelType,
        transmission: car.transmission,
      },
    },
    {
      title: 'Engine & Performance',
      data: car.engine,
    },
    {
      title: 'Dimensions',
      data: car.dimensions,
    },
    {
      title: 'Safety',
      data: car.safety,
    },
    {
      title: 'Features',
      data: car.features,
    },
  ].filter(
    (group) =>
      group.data &&
      typeof group.data === 'object' &&
      Object.values(group.data).some(
        (value) =>
          value !== null &&
          value !== undefined &&
          value !== ''
      )
  );

  if (groups.length === 0) {
    return (
      <p className="car-specs__unavailable">
        No specifications are available for this vehicle yet.
      </p>
    );
  }

  return (
    <div className="car-specs">
      {groups.map((group) => {
        const entries = Object.entries(group.data).filter(
          ([, value]) =>
            value !== null &&
            value !== undefined &&
            value !== ''
        );

        if (entries.length === 0) {
          return null;
        }

        return (
          <section
            key={group.title}
            className="car-specs__section"
          >
            <h2 className="car-specs__heading">
              {group.title}
            </h2>

            <dl className="car-specs__grid">
              {entries.map(([key, value]) => (
                <div
                  key={key}
                  className="car-specs__item"
                >
                  <dt className="car-specs__label">
                    {labelFor(key)}
                  </dt>

                  <dd className="car-specs__value">
                    {display(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}
    </div>
  );
}