
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({
  onSearch,
  placeholder = 'Search...',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch?.('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ds-search-form"
      role="search"
    >
      <div className="ds-search-input-wrapper">
        {/* Search Icon */}
        <div className="ds-search-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="7" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m16 16 4 4"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="ds-search-input"
          placeholder={placeholder}
          aria-label={placeholder}
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="ds-search-clear"
            aria-label="Clear search"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 6l12 12M18 6 6 18"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Button */}
      {searchTerm.trim() && (
        <button
          type="submit"
          className="ds-search-submit"
        >
          Search
        </button>
      )}
    </form>
  );
};

export default SearchBar;