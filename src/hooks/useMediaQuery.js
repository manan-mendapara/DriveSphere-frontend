import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the viewport matches a media query
 * @param {string} query - Media query string (e.g., '(max-width: 768px)')
 * @returns {boolean} True if the viewport matches the query
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const listener = (event) => {
      setMatches(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', listener);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;