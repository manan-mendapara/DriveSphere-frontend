
import React from 'react';
import { Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import './ComparisonTable.css';

const ComparisonTable = ({
  cars = [],
  onRemoveFromCompare,
  onViewDetails,
  onAddToWishlist,
  onReplaceFromCompare,
}) => {
  const navigate = useNavigate();

  if (cars.length === 0) return null;

  const specGroups = [
    {
      title: 'Basic Information',
      specs: [
        { key: 'brand', label: 'Brand' },
        { key: 'model', label: 'Model' },
        { key: 'variant', label: 'Variant' },
        { key: 'year', label: 'Year' },
        {
          key: 'price',
          label: 'Price',
          format: (value) => formatPrice(value),
        },
        { key: 'bodyType', label: 'Body Type' },
        { key: 'seatingCapacity', label: 'Seating Capacity' },
        { key: 'fuelType', label: 'Fuel Type' },
        { key: 'transmission', label: 'Transmission' },
      ],
    },
    {
      title: 'Engine & Performance',
      specs: [
        { key: 'engine.cc', label: 'Displacement (cc)' },
        { key: 'engine.horsepower', label: 'Horsepower' },
        { key: 'engine.torque', label: 'Torque (Nm)' },
        {
          key: 'engine.mileage',
          label: 'Mileage / Efficiency',
          format: (value, car) =>
            `${value} ${
              car.fuelType === 'Electric' ? 'km/kWh' : 'kmpl'
            }`,
        },
        { key: 'engine.topSpeed', label: 'Top Speed (km/h)' },
      ],
    },
    {
      title: 'Dimensions',
      specs: [
        { key: 'dimensions.length', label: 'Length (mm)' },
        { key: 'dimensions.width', label: 'Width (mm)' },
        { key: 'dimensions.height', label: 'Height (mm)' },
        { key: 'dimensions.wheelbase', label: 'Wheelbase (mm)' },
        {
          key: 'dimensions.groundClearance',
          label: 'Ground Clearance (mm)',
        },
        { key: 'dimensions.bootSpace', label: 'Boot Space (L)' },
      ],
    },
    {
      title: 'Features',
      specs: [
        { key: 'features.sunroof', label: 'Sunroof' },
        { key: 'features.touchscreen', label: 'Touchscreen' },
        { key: 'features.adas', label: 'ADAS' },
        { key: 'features.cruiseControl', label: 'Cruise Control' },
        {
          key: 'features.wirelessCharging',
          label: 'Wireless Charging',
        },
        {
          key: 'features.ventilatedSeats',
          label: 'Ventilated Seats',
        },
      ],
    },
    {
      title: 'Safety',
      specs: [
        { key: 'safety.airbags', label: 'Airbags' },
        { key: 'safety.abs', label: 'ABS' },
        { key: 'safety.esp', label: 'ESP' },
        { key: 'safety.hillAssist', label: 'Hill Assist' },
        {
          key: 'safety.tractionControl',
          label: 'Traction Control',
        },
        { key: 'safety.ncapRating', label: 'NCAP Rating' },
      ],
    },
  ];

  const getNestedValue = (obj, path) =>
    path.split('.').reduce(
      (current, key) => current?.[key] ?? null,
      obj
    );

  const formatBoolean = (value) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }

    return value;
  };

  const formatValue = (car, spec) => {
    const value = getNestedValue(car, spec.key);

    if (value === null || value === undefined || value === '') {
      return 'Not available';
    }

    return spec.format
      ? spec.format(value, car)
      : formatBoolean(value);
  };

  const isDifferent = (spec) => {
    if (cars.length !== 2) return false;

    const first = getNestedValue(cars[0], spec.key);
    const second = getNestedValue(cars[1], spec.key);

    if (
      first === null ||
      first === undefined ||
      second === null ||
      second === undefined
    ) {
      return false;
    }

    return first !== second;
  };

  const getCarId = (car) => car.id ?? car._id;

  const handleViewDetails = (car) => {
    if (onViewDetails) {
      onViewDetails(getCarId(car));
      return;
    }

    navigate(`/cars/${getCarId(car)}`);
  };

  const handleDownloadCSV = () => {
    const columns = [
      'Brand',
      'Model',
      'Variant',
      'Year',
      'Price',
      'Body Type',
      'Fuel Type',
      'Transmission',
      'Seats',
      'Horsepower',
      'Mileage',
    ];

    const escapeCell = (value) =>
      `"${String(value ?? '').replace(/"/g, '""')}"`;

    const rows = [
      columns,
      ...cars.map((car) => [
        car.brand,
        car.model,
        car.variant,
        car.year,
        car.price,
        car.bodyType,
        car.fuelType,
        car.transmission,
        car.seatingCapacity,
        car.engine?.horsepower,
        car.engine?.mileage,
      ]),
    ];

    const csv = rows
      .map((row) => row.map(escapeCell).join(','))
      .join('\r\n');

    const blob = new Blob(['\uFEFF', csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = 'drivesphere-comparison.csv';

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="comparison-table">
      <div className="comparison-table-content">
        <h2 className="comparison-table-title">
          Vehicle Comparison
        </h2>

        {/* Vehicle Comparison Header */}
        <div
          className="comparison-vehicles"
          style={{
            gridTemplateColumns: `repeat(${
              cars.length + (cars.length < 2 ? 1 : 0)
            }, minmax(0, 1fr))`,
          }}
        >
          {cars.map((car, index) => (
            <div
              key={getCarId(car) ?? index}
              className="comparison-vehicle-card"
            >
              <img
                src={
                  car.images?.thumbnail ||
                  '/images/carousel-1.png'
                }
                alt={`${car.brand ?? ''} ${car.model ?? ''}`.trim()}
                className="comparison-vehicle-image"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = '/images/carousel-1.png';
                }}
              />

              <h3 className="comparison-vehicle-name">
                {car.brand} {car.model}
              </h3>

              {car.variant && (
                <p className="comparison-vehicle-variant">
                  {car.variant}
                </p>
              )}

              <p className="comparison-vehicle-price">
                {formatPrice(car.price)}
              </p>

              {onViewDetails && (
                <button
                  type="button"
                  onClick={() => handleViewDetails(car)}
                  className="comparison-button comparison-button-outline"
                >
                  View Details
                </button>
              )}

              <button
                type="button"
                onClick={() => onRemoveFromCompare?.(getCarId(car))}
                className="comparison-button comparison-button-remove"
              >
                Remove
              </button>
            </div>
          ))}

          {cars.length < 2 && (
            <button
              type="button"
              onClick={() => onReplaceFromCompare?.(cars.length, null)}
              className="comparison-add-vehicle"
            >
              <span className="comparison-add-icon">+</span>
              <span className="comparison-add-title">
                Add Vehicle
              </span>
              <span className="comparison-add-description">
                Select another car to compare
              </span>
            </button>
          )}
        </div>

        {/* Specification Groups */}
        {specGroups.map((group) => (
          <section
            key={group.title}
            className="comparison-spec-group"
          >
            <h3 className="comparison-group-title">
              {group.title}
            </h3>

            <div className="comparison-spec-list">
              {group.specs.map((spec) => {
                const different = isDifferent(spec);

                return (
                  <div
                    key={spec.key}
                    className="comparison-spec-row"
                  >
                    <span className="comparison-spec-label">
                      {spec.label}
                    </span>

                    <div
                      className="comparison-spec-values"
                      style={{
                        gridTemplateColumns: `repeat(${cars.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {cars.map((car, index) => (
                        <div
                          key={getCarId(car) ?? index}
                          className={[
                            'comparison-spec-value',
                            different
                              ? 'comparison-spec-value-different'
                              : '',
                            index > 0
                              ? 'comparison-spec-value-separated'
                              : '',
                          ].filter(Boolean).join(' ')}
                        >
                          {formatValue(car, spec)}

                          {different && (
                            <span className="comparison-diff-label">
                              Differs
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Comparison Actions */}
        {cars.length === 2 && (
          <div className="comparison-actions">
            <button
              type="button"
              onClick={() =>
                cars.forEach((car) =>
                  onAddToWishlist?.(getCarId(car))
                )
              }
              className="comparison-button comparison-button-primary"
            >
              Add Both to Wishlist
            </button>

            <button
              type="button"
              onClick={handleDownloadCSV}
              className="comparison-button comparison-button-outline comparison-download-button"
            >
              <Download size={17} aria-hidden="true" />
              <span>Download comparison CSV</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonTable;