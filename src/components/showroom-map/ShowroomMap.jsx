
import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Navigation,
  ExternalLink,
} from 'lucide-react';

import showroomService from '../../services/showroomService.js';
import './ShowroomMap.css';

export default function ShowroomMap({ onLocationSearch }) {
  const [location, setLocation] = useState('Ahmedabad');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    const trimmedLocation = location.trim();

    if (!trimmedLocation) {
      setError('Enter a city or locality to search.');
      setSearchResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const results = await showroomService.searchShowrooms({
        location: trimmedLocation,
      });

      setSearchResults(Array.isArray(results) ? results : []);
      onLocationSearch?.(trimmedLocation);
    } catch {
      setSearchResults([]);
      setError('Unable to search showrooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="showroom-section"
      aria-labelledby="showroom-title"
    >
      {/* Section Header */}
      <div className="showroom-header">
        <span className="showroom-header-icon">
          <MapPin size={21} aria-hidden="true" />
        </span>

        <div className="showroom-header-content">
          <h2 id="showroom-title" className="showroom-title">
            Find a showroom
          </h2>

          <p className="showroom-description">
            Search the local demo directory for a nearby showroom.
          </p>
        </div>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="showroom-search-form"
      >
        <label className="showroom-input-wrapper">
          <span className="showroom-sr-only">
            City or locality
          </span>

          <MapPin
            className="showroom-input-icon"
            size={17}
            aria-hidden="true"
          />

          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="showroom-input"
            placeholder="City or locality"
            autoComplete="address-level2"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="showroom-search-button"
        >
          <Search size={16} aria-hidden="true" />
          <span>{loading ? 'Searching...' : 'Search'}</span>
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="showroom-loading" role="status">
          <span className="showroom-loading-spinner" />
          <span>Searching for showrooms...</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="showroom-error" role="alert">
          {error}
        </p>
      )}

      {/* Empty Results */}
      {searched &&
        !loading &&
        searchResults.length === 0 &&
        !error && (
          <p className="showroom-empty">
            No demo showrooms match "{location}". Try Ahmedabad,
            Rajkot, or Surat.
          </p>
        )}

      {/* Showroom Results */}
      {searchResults.length > 0 && (
        <div className="showroom-results">
          {searchResults.map((showroom) => {
            const contact = String(showroom.contact ?? '');
            const phoneNumber = contact.replace(/[^\d+]/g, '');

            const directionsUrl =
              `https://www.google.com/maps/search/?api=1&query=${
                encodeURIComponent(showroom.address ?? '')
              }`;

            return (
              <article
                key={showroom.id}
                className="showroom-card"
              >
                <div className="showroom-card-content">
                  <div className="showroom-details">
                    <h3 className="showroom-name">
                      {showroom.name}
                    </h3>

                    <p className="showroom-address">
                      <MapPin
                        size={15}
                        aria-hidden="true"
                      />
                      <span>{showroom.address}</span>
                    </p>

                    <div className="showroom-meta">
                      <span>{showroom.distance}</span>

                      {contact && (
                        <a
                          className="showroom-contact"
                          href={`tel:${phoneNumber}`}
                        >
                          {contact}
                        </a>
                      )}

                      <span
                        className={
                          showroom.openNow
                            ? 'showroom-status showroom-status-open'
                            : 'showroom-status showroom-status-closed'
                        }
                      >
                        <span className="showroom-status-dot" />
                        {showroom.openNow
                          ? 'Open now (demo)'
                          : 'Closed (demo)'}
                      </span>
                    </div>
                  </div>

                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={directionsUrl}
                    className="showroom-directions-button"
                  >
                    <Navigation
                      size={15}
                      aria-hidden="true"
                    />
                    <span>Directions</span>
                    <ExternalLink
                      size={13}
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Demo Disclaimer */}
      <p className="showroom-disclaimer">
        Showroom listings are sample data. Directions open Google
        Maps in a new tab; live availability and distance are not
        verified.
      </p>
    </section>
  );
}