
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div
      className="loading-spinner"
      role="status"
      aria-label="Loading"
    >
      <span className="loading-spinner-sr-only">
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;