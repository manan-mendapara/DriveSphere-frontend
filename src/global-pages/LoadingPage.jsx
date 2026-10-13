
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gauge } from 'lucide-react';
import './LoadingPage.css';

const LoadingPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      navigate('/home', { replace: true });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoaded) return null;

  return (
    <main className="loading-page">
      {/* Background Video */}
      {!videoError && (
        <video
          className="loading-background-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => setVideoError(true)}
        >
          <source
            src="/videos/background.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {/* Background Overlay */}
      <div className="loading-overlay" aria-hidden="true" />

      {/* Loading Content */}
      <div className="loading-content">
        <div className="loading-logo">
          <Gauge
            size={42}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </div>

        <h1 className="loading-brand">
          Drive<span>Sphere</span>
        </h1>

        <p className="loading-tagline">
          Discover. Compare. Drive.
        </p>

        <div
          className="loading-progress"
          role="status"
          aria-label="Loading DriveSphere"
        >
          <span className="loading-spinner" />
        </div>

        <p className="loading-status">
          Preparing your driving experience
          <span className="loading-dots" aria-hidden="true">
            ...
          </span>
        </p>
      </div>

      {/* Bottom Branding */}
      <div className="loading-footer">
        YOUR JOURNEY STARTS HERE
      </div>
    </main>
  );
};

export default LoadingPage;