
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  Home,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';

import './ErrorPage.css';

const ErrorPage = ({ statusCode = 500 }) => {
  const navigate = useNavigate();

  const getErrorMessage = (code) => {
    switch (code) {
      case 404:
        return 'Page not found';
      case 500:
        return 'Internal server error';
      default:
        return 'Something went wrong';
    }
  };

  const getErrorDescription = (code) => {
    switch (code) {
      case 404:
        return "The page you're looking for doesn't exist or may have been moved.";
      case 500:
        return "We're experiencing technical difficulties. Please try again later.";
      default:
        return 'An unexpected error occurred. Please try again or contact support.';
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <main className="error-page">
      {/* Decorative Background */}
      <div className="error-background-glow" aria-hidden="true" />

      <section className="error-content" aria-labelledby="error-title">
        {/* Error Illustration */}
        <div className="error-icon-wrapper">
          <div className="error-icon">
            <AlertTriangle
              size={54}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Error Code */}
        <p className="error-label">OOPS! SOMETHING WENT WRONG</p>

        <h1 className="error-code">{statusCode}</h1>

        {/* Error Message */}
        <h2 id="error-title" className="error-title">
          {getErrorMessage(statusCode)}
        </h2>

        <p className="error-description">
          {getErrorDescription(statusCode)}
        </p>

        {/* Action Buttons */}
        <div className="error-actions">
          <button
            type="button"
            className="error-button error-button-primary"
            onClick={() => navigate('/home')}
          >
            <Home size={17} aria-hidden="true" />
            <span>Go to Home</span>
          </button>

          <button
            type="button"
            className="error-button error-button-secondary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={17} aria-hidden="true" />
            <span>Go Back</span>
          </button>

          {statusCode === 500 && (
            <button
              type="button"
              className="error-retry-button"
              onClick={handleRetry}
            >
              <RefreshCw size={15} aria-hidden="true" />
              <span>Refresh Page</span>
            </button>
          )}
        </div>

        {/* Footer */}
        <p className="error-footer">
          <span className="error-footer-brand">DriveSphere</span>
          <span className="error-footer-divider">·</span>
          Discover. Compare. Drive.
        </p>
      </section>
    </main>
  );
};

export default ErrorPage;