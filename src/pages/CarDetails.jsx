
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Heart,
  GitCompareArrows,
  CheckCircle2,
  CarFront,
  Fuel,
  Settings2,
  Users,
  Gauge,
  Zap,
} from 'lucide-react';

import Navbar from '../components/navbar/Navbar.jsx';
import Footer from '../components/footer/Footer.jsx';
import ImageGallery from '../components/common/ImageGallery.jsx';
import CarSpecs from '../components/common/CarSpecs.jsx';
import ShowroomMap from '../components/showroom-map/ShowroomMap.jsx';

import { formatPrice } from '../utils/formatPrice.jsx';
import { useCars } from '../context/CarContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCompare } from '../context/CompareContext.jsx';

import './CarDetails.css';

export default function CarDetails() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const { getCarById } = useCars();

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

  const car = getCarById(carId);

  if (!car) {
    return (
      <>
        <Navbar />

        <main className="car-details-not-found">
          <div className="car-details-not-found-icon">
            <CarFront size={38} aria-hidden="true" />
          </div>

          <h1>Vehicle not found</h1>

          <p>
            This vehicle may have been removed from the local
            catalogue or the link may be incorrect.
          </p>

          <button
            type="button"
            className="car-details-primary-button"
            onClick={() => navigate('/cars')}
          >
            Browse cars
          </button>
        </main>

        <Footer />
      </>
    );
  }

  const saved = isInWishlist(car.id);
  const compared = isInCompare(car.id);

  const toggleWishlist = () => {
    if (saved) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  const toggleCompare = () => {
    if (compared) {
      removeFromCompare(car.id);
    } else if (comparisonCount < 2) {
      addToCompare(car);
    }
  };

  const glanceItems = [
    {
      label: 'Body type',
      value: car.bodyType,
      icon: CarFront,
    },
    {
      label: 'Fuel type',
      value: car.fuelType,
      icon: Fuel,
    },
    {
      label: 'Transmission',
      value: car.transmission,
      icon: Settings2,
    },
    {
      label: 'Seats',
      value: car.seatingCapacity
        ? `${car.seatingCapacity} seats`
        : null,
      icon: Users,
    },
    {
      label: 'Mileage / Range',
      value: car.engine?.mileage
        ? `${car.engine.mileage} km/l or km/kWh`
        : null,
      icon: Gauge,
    },
    {
      label: 'Power',
      value: car.engine?.horsepower
        ? `${car.engine.horsepower} hp`
        : null,
      icon: Zap,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="car-details-page">
        <div className="car-details-container">
          {/* Back Navigation */}
          <Link
            to="/cars"
            className="car-details-back-link"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to cars</span>
          </Link>

          {/* Vehicle Header */}
          <header className="car-details-header">
            <div className="car-details-heading">
              <p className="car-details-eyebrow">
                {car.brand} <span>·</span> {car.year}
              </p>

              <h1 className="car-details-title">
                {car.model}

                {car.variant && (
                  <span className="car-details-variant">
                    {' '}{car.variant}
                  </span>
                )}
              </h1>

              <p className="car-details-price">
                {formatPrice(car.price)}
              </p>
            </div>

            <div className="car-details-actions">
              <button
                type="button"
                onClick={toggleWishlist}
                aria-pressed={saved}
                className={`car-details-action-button ${
                  saved
                    ? 'car-details-action-active'
                    : 'car-details-action-outline'
                }`}
              >
                <Heart
                  size={17}
                  fill={saved ? 'currentColor' : 'none'}
                  aria-hidden="true"
                />

                <span>
                  {saved ? 'Saved' : 'Add to wishlist'}
                </span>
              </button>

              <button
                type="button"
                onClick={toggleCompare}
                disabled={!compared && comparisonCount >= 2}
                aria-pressed={compared}
                className={`car-details-action-button ${
                  compared
                    ? 'car-details-action-active'
                    : 'car-details-action-outline'
                }`}
              >
                <GitCompareArrows
                  size={17}
                  aria-hidden="true"
                />

                <span>
                  {compared
                    ? 'In comparison'
                    : comparisonCount >= 2
                      ? 'Compare limit reached'
                      : 'Compare'}
                </span>
              </button>
            </div>
          </header>

          {/* Main Vehicle Content */}
          <div className="car-details-layout">
            <div className="car-details-main-column">
              {/* Image Gallery */}
              <section
                className="car-details-gallery-section"
                aria-label="Vehicle images"
              >
                <ImageGallery
                  images={car.images?.gallery || []}
                  thumbnail={car.images?.thumbnail}
                />
              </section>

              {/* Quick Specifications */}
              <section className="car-details-glance">
                <div className="car-details-section-heading">
                  <h2>At a glance</h2>
                  <p>Essential vehicle specifications</p>
                </div>

                <div className="car-details-glance-grid">
                  {glanceItems.map((item) => {
                    const ItemIcon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="car-details-glance-item"
                      >
                        <div className="car-details-glance-icon">
                          <ItemIcon
                            size={18}
                            aria-hidden="true"
                          />
                        </div>

                        <p className="car-details-glance-label">
                          {item.label}
                        </p>

                        <p className="car-details-glance-value">
                          {item.value || 'Not available'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Specifications & Showrooms */}
            <aside className="car-details-sidebar">
              <section className="car-details-specs-section">
                <CarSpecs car={car} />
              </section>

              <section className="car-details-showroom-section">
                <ShowroomMap carId={car.id} />
              </section>
            </aside>
          </div>

          {/* Data Disclaimer */}
          <div className="car-details-disclaimer">
            <CheckCircle2
              className="car-details-disclaimer-icon"
              size={19}
              aria-hidden="true"
            />

            <p>
              Vehicle specifications are provided as local
              demonstration data. Verify details with the
              manufacturer or dealer before making a purchase
              decision.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}