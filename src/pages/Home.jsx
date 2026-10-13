
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar.jsx';
import Footer from '../components/footer/Footer.jsx';
import HeroCarousel from '../components/carousel/HeroCarousel.jsx';
import EngineExplorer from '../components/engine-explorer/EngineExplorer.jsx';
import BrandCards from '../components/brand-card/BrandCards.jsx';
import CategoryCards from '../components/category-card/CategoryCards.jsx';
import FeaturedCars from '../components/car-card/FeaturedCars.jsx';
import DiscoverySection from '../components/common/DiscoverySection.jsx';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleBrandSelect = (brand) => {
    navigate(`/cars?brand=${encodeURIComponent(brand)}`);
  };

  const handleCategorySelect = (category) => {
    if (category === 'Electric Vehicles') {
      navigate('/cars?fuelType=Electric');
      return;
    }

    navigate(`/cars?bodyType=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <Navbar />

      <main className="home-page">
        <div className="home-container">
          {/* Hero Carousel */}
          <section className="home-hero-section">
            <HeroCarousel />
          </section>

          {/* Interactive Engine Explorer */}
          <section className="home-engine-section">
            <EngineExplorer />
          </section>

          {/* Popular Car Brands */}
          <section className="home-section">
            <div className="home-section-heading">
              <p className="home-section-eyebrow">
                EXPLORE THE BEST
              </p>

              <h2 className="home-section-title">
                Popular Brands
              </h2>

              <p className="home-section-description">
                Discover vehicles from the brands you love.
              </p>
            </div>

            <BrandCards
              onBrandSelect={handleBrandSelect}
            />
          </section>

          {/* Vehicle Categories */}
          <section className="home-section">
            <div className="home-section-heading">
              <p className="home-section-eyebrow">
                FIND YOUR PERFECT FIT
              </p>

              <h2 className="home-section-title">
                Vehicle Categories
              </h2>

              <p className="home-section-description">
                Explore cars that match your needs and lifestyle.
              </p>
            </div>

            <CategoryCards
              onCategorySelect={handleCategorySelect}
            />
          </section>

          {/* Featured Cars */}
          <section className="home-section">
            <div className="home-section-heading">
              <p className="home-section-eyebrow">
                HANDPICKED FOR YOU
              </p>

              <h2 className="home-section-title">
                Featured Cars
              </h2>

              <p className="home-section-description">
                Take a closer look at some standout vehicles.
              </p>
            </div>

            <FeaturedCars />
          </section>

          {/* Discovery Section */}
          <section className="home-discovery-section">
            <DiscoverySection />
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
