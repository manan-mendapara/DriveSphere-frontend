
import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({
  images = [],
  thumbnail = null
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use thumbnail as the first image if provided
  const allImages = thumbnail
    ? [thumbnail, ...images]
    : images;

  // Show placeholder when no images are available
  if (allImages.length === 0) {
    return (
      <div className="image-gallery-empty">
        <p>No images available</p>
      </div>
    );
  }

  const showPreviousImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  const showNextImage = () => {
    setCurrentIndex(
      (prev) => (prev + 1) % allImages.length
    );
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="image-gallery">
      {/* Main Image */}
      <div className="image-gallery-main">
        <img
          src={allImages[currentIndex]}
          alt={`Vehicle image ${currentIndex + 1}`}
          className="image-gallery-main-image"
        />

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="image-gallery-counter">
            {currentIndex + 1} / {allImages.length}
          </div>
        )}

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPreviousImage}
              className="image-gallery-arrow image-gallery-arrow-left"
              aria-label="Previous image"
            >
              <svg
                className="image-gallery-arrow-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={showNextImage}
              className="image-gallery-arrow image-gallery-arrow-right"
              aria-label="Next image"
            >
              <svg
                className="image-gallery-arrow-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Images */}
      {allImages.length > 1 && (
        <div className="image-gallery-thumbnails">
          {allImages.map((img, index) => (
            <button
              type="button"
              key={`${img}-${index}`}
              className={`image-gallery-thumbnail ${
                index === currentIndex
                  ? 'image-gallery-thumbnail-active'
                  : ''
              }`}
              onClick={() => selectImage(index)}
              aria-label={`View image ${index + 1}`}
              aria-pressed={index === currentIndex}
            >
              <img
                src={img}
                alt={`Vehicle thumbnail ${index + 1}`}
                className="image-gallery-thumbnail-image"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;