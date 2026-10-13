
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GitCompareArrows,
  Heart,
  Trash2,
} from 'lucide-react';

import Navbar from '../components/navbar/Navbar.jsx';
import Footer from '../components/footer/Footer.jsx';
import ComparisonTable from '../components/compare/ComparisonTable.jsx';
import NoResults from '../components/common/NoResults.jsx';

import { useCompare } from '../context/CompareContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

import './Compare.css';

export default function Compare() {
  const navigate = useNavigate();

  const {
    comparison,
    removeFromCompare,
    clearComparison,
  } = useCompare();

  const { addToWishlist } = useWishlist();

  const handleClearComparison = () => {
    if (
      window.confirm(
        'Clear both vehicles from comparison?'
      )
    ) {
      clearComparison();
    }
  };

  const handleAddToWishlist = () => {
    comparison.forEach((car) => addToWishlist(car));
    navigate('/wishlist');
  };

  return (
    <>
      <Navbar />

      <main className="compare-page">
        <div className="compare-container">
          {/* Page Header */}
          <header className="compare-header">
            <div className="compare-heading-icon">
              <GitCompareArrows
                size={27}
                aria-hidden="true"
              />
            </div>

            <div className="compare-heading-content">
              <p className="compare-eyebrow">
                MAKE THE CHOICE CLEAR
              </p>

              <h1 className="compare-title">
                Compare Vehicles
              </h1>

              <p className="compare-description">
                Compare specifications side by side and find
                the vehicle that suits you best.
              </p>
            </div>
          </header>

          {comparison.length > 0 ? (
            <>
              {/* Comparison Toolbar */}
              <section
                className="compare-toolbar"
                aria-label="Comparison actions"
              >
                <div className="compare-selection">
                  <span className="compare-count-icon">
                    <GitCompareArrows
                      size={18}
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <p className="compare-selection-title">
                      Vehicles selected
                    </p>

                    <p className="compare-selection-count">
                      {comparison.length} of 2 vehicles selected
                    </p>
                  </div>
                </div>

                <div className="compare-actions">
                  <button
                    type="button"
                    onClick={handleAddToWishlist}
                    className="compare-action-button compare-wishlist-button"
                  >
                    <Heart size={16} aria-hidden="true" />
                    <span>Add to wishlist</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearComparison}
                    className="compare-action-button compare-clear-button"
                  >
                    <Trash2 size={16} aria-hidden="true" />
                    <span>Clear comparison</span>
                  </button>
                </div>
              </section>

              {/* Comparison Table */}
              <section
                className="compare-table-section"
                aria-label="Vehicle specification comparison"
              >
                <ComparisonTable
                  cars={comparison}
                  onRemoveFromCompare={removeFromCompare}
                  onReplaceFromCompare={() => navigate('/cars')}
                  onViewDetails={(id) => navigate(`/cars/${id}`)}
                  onAddToWishlist={addToWishlist}
                />
              </section>

              <p className="compare-storage-note">
                Your comparison selection is managed by DriveSphere
                and may be stored locally in this browser.
              </p>
            </>
          ) : (
            <NoResults
              title="Nothing to compare yet"
              description="Browse the catalogue and select up to two vehicles using the Compare option. Then return here to explore their specifications side by side."
              onPrimaryAction={() => navigate('/cars')}
              primaryActionText="Browse cars"
            />
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}