
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, GitCompareArrows, Trash2 } from 'lucide-react';

import Navbar from '../components/navbar/Navbar.jsx';
import Footer from '../components/footer/Footer.jsx';
import WishlistCarGrid from '../components/wishlist/WishlistCarGrid.jsx';
import NoResults from '../components/common/NoResults.jsx';

import { useWishlist } from '../context/WishlistContext.jsx';
import { useCompare } from '../context/CompareContext.jsx';

import './Wishlist.css';

export default function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const {
    clearComparison,
    addToCompare,
  } = useCompare();

  const compareWishlist = () => {
    if (wishlist.length === 0) return;

    clearComparison();

    wishlist.slice(0, 2).forEach((car) => {
      addToCompare(car);
    });

    navigate('/compare');
  };

  const handleClearWishlist = () => {
    if (
      window.confirm(
        'Remove every vehicle from your wishlist?'
      )
    ) {
      clearWishlist();
    }
  };

  return (
    <>
      <Navbar />

      <main className="wishlist-page">
        <div className="wishlist-container">
          {/* Page Header */}
          <header className="wishlist-page-header">
            <div className="wishlist-heading-icon">
              <Heart size={25} aria-hidden="true" />
            </div>

            <div className="wishlist-heading-content">
              <p className="wishlist-eyebrow">
                YOUR SHORTLIST
              </p>

              <h1 className="wishlist-page-title">
                My Wishlist
              </h1>

              <p className="wishlist-page-description">
                Your favorite vehicles, all in one place.
                Save cars to revisit or compare them anytime.
              </p>
            </div>
          </header>

          {wishlist.length > 0 ? (
            <>
              {/* Wishlist Toolbar */}
              <section
                className="wishlist-toolbar"
                aria-label="Wishlist actions"
              >
                <div className="wishlist-count">
                  <span className="wishlist-count-number">
                    {wishlist.length}
                  </span>

                  <span>
                    {wishlist.length === 1
                      ? 'vehicle saved'
                      : 'vehicles saved'}
                  </span>
                </div>

                <div className="wishlist-actions">
                  <button
                    type="button"
                    onClick={compareWishlist}
                    className="wishlist-action-button wishlist-compare-button"
                  >
                    <GitCompareArrows
                      size={17}
                      aria-hidden="true"
                    />
                    <span>Compare saved vehicles</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearWishlist}
                    className="wishlist-action-button wishlist-clear-button"
                  >
                    <Trash2
                      size={16}
                      aria-hidden="true"
                    />
                    <span>Clear wishlist</span>
                  </button>
                </div>
              </section>

              {/* Saved Cars */}
              <WishlistCarGrid
                cars={wishlist}
                onWishlistToggle={removeFromWishlist}
                onCompareToggle={addToCompare}
                onViewDetails={(id) => navigate(`/cars/${id}`)}
              />

              <p className="wishlist-storage-note">
                Your saved vehicles are stored locally in this
                browser.
              </p>
            </>
          ) : (
            <NoResults
              title="Your wishlist is empty"
              description="Save cars you like from the catalogue. They will appear here so you can revisit or compare them later."
              onPrimaryAction={() => navigate('/cars')}
              primaryActionText="Explore cars"
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}