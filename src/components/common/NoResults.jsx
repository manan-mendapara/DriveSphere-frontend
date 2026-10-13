
import React from 'react';
import './NoResults.css';

const NoResults = ({
  title,
  description,
  primaryActionText,
  onPrimaryAction,
  secondaryActionText,
  onSecondaryAction
}) => {
  return (
    <div className="no-results">
      {/* Illustration */}
      <div className="no-results-illustration">
        <svg
          className="no-results-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="no-results-title">
        {title}
      </h2>

      {/* Description */}
      <p className="no-results-description">
        {description}
      </p>

      {/* Action Buttons */}
      <div className="no-results-actions">
        {primaryActionText && (
          <button
            type="button"
            onClick={onPrimaryAction}
            className="no-results-button no-results-button-primary"
          >
            {primaryActionText}
          </button>
        )}

        {secondaryActionText && (
          <button
            type="button"
            onClick={onSecondaryAction}
            className="no-results-button no-results-button-secondary"
          >
            {secondaryActionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default NoResults;