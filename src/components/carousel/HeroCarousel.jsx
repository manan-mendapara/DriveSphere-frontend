
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroCarousel.css';

const slides = [
  {
    id: 1,
    image: '/images/carousel-1.png',
    title: 'Luxury Sedans',
    description: 'Experience refined elegance and comfort',
    ctaText: 'Explore Sedans',
    ctaLink: '/cars?bodyType=Sedan',
  },
  {
    id: 2,
    image: '/images/carousel-2.png',
    title: 'Electric Vehicles',
    description: 'The future of sustainable driving',
    ctaText: 'Explore EVs',
    ctaLink: '/cars?fuelType=Electric',
  },
  {
    id: 3,
    image: '/images/carousel-3.png',
    title: 'Performance SUVs',
    description: 'Power and capability for every adventure',
    ctaText: 'Explore SUVs',
    ctaLink: '/cars?bodyType=SUV',
  },
  {
    id: 4,
    image: '/images/carousel-4.png',
    title: 'Hybrid Efficiency',
    description:
      'Explore vehicles that balance performance and efficiency',
    ctaText: 'Explore Hybrids',
    ctaLink: '/cars?fuelType=Hybrid',
  },
  {
    id: 5,
    image: '/images/carousel-5.png',
    title: 'City Hatchbacks',
    description:
      'Practical, efficient vehicles for everyday journeys',
    ctaText: 'Explore Hatchbacks',
    ctaLink: '/cars?bodyType=Hatchback',
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const interval = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const showPrevious = () => {
    setCurrentIndex(
      (previous) => (previous - 1 + slides.length) % slides.length
    );
  };

  const showNext = () => {
    setCurrentIndex((previous) => (previous + 1) % slides.length);
  };

  return (
    <section
      className="hero-carousel"
      aria-label="Featured vehicles"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onFocusCapture={() => setIsPlaying(false)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPlaying(true);
        }
      }}
    >
      <div className="hero-carousel__viewport">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={slide.id}
              className={`hero-carousel__slide ${
                isActive
                  ? 'hero-carousel__slide--active'
                  : ''
              }`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt=""
                className="hero-carousel__image"
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(event) => {
                  event.currentTarget.style.visibility = 'hidden';
                }}
              />

              <div className="hero-carousel__overlay" />

              <div className="hero-carousel__content">
                <p className="hero-carousel__eyebrow">
                  DISCOVER YOUR NEXT DRIVE
                </p>

                <h2 className="hero-carousel__title">
                  {slide.title}
                </h2>

                <p className="hero-carousel__description">
                  {slide.description}
                </p>

                <Link
                  to={slide.ctaLink}
                  className="hero-carousel__cta"
                  tabIndex={isActive ? 0 : -1}
                >
                  {slide.ctaText}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className="hero-carousel__arrow hero-carousel__arrow--previous"
          onClick={showPrevious}
          aria-label="Previous slide"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              d="M15 18l-6-6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          className="hero-carousel__arrow hero-carousel__arrow--next"
          onClick={showNext}
          aria-label="Next slide"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              d="M9 18l6-6-6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className="hero-carousel__indicators"
          aria-label="Choose a slide"
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-carousel__indicator ${
                index === currentIndex
                  ? 'hero-carousel__indicator--active'
                  : ''
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}