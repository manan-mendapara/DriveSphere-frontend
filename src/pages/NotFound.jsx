
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, CarFront } from 'lucide-react';

import Navbar from '../components/navbar/Navbar.jsx';
import Footer from '../components/footer/Footer.jsx';

import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="not-found-page">
        {/* Decorative Background */}
        <div
          className="not-found-background-glow"
          aria-hidden="true"
        />

        <section
          className="not-found-content"
          aria-labelledby="not-found-title"
        >
          {/* Illustration */}
          <div className="not-found-icon-wrapper">
            <div className="not-found-icon">
              <AlertTriangle
                size={52}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Error Message */}
          <p className="not-found-eyebrow">
            LOOKS LIKE YOU TOOK A WRONG TURN
          </p>

          <h1 className="not-found-code">404</h1>

          <h2
            id="not-found-title"
            className="not-found-title"
          >
            Page Not Found
          </h2>

          <p className="not-found-description">
            The page you're looking for doesn't exist or may
            have been moved. Let's get you back on the road.
          </p>

          {/* Navigation Actions */}
          <div className="not-found-actions">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="not-found-button not-found-button-primary"
            >
              <Home size={17} aria-hidden="true" />
              <span>Go to Home</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/cars')}
              className="not-found-button not-found-button-secondary"
            >
              <CarFront size={18} aria-hidden="true" />
              <span>Browse Cars</span>
            </button>
          </div>

          {/* Branding */}
          <p className="not-found-footer">
            <span>DriveSphere</span>
            <span className="not-found-divider">·</span>
            Discover. Compare. Drive.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default NotFound;