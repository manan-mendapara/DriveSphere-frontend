/**
 * Utility functions for localStorage operations
 */

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to save (will be JSON.stringify'd)
 */
export const saveToStorage = (key, data) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @returns {*} Parsed data or null if not found/error
 */
export const loadFromStorage = (key) => {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return null;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from localStorage:', error);
    return false;
  }
};

/**
 * Clear all localStorage data for this application
 * @param {string} prefix - Optional prefix to filter keys
 */
export const clearStorage = (prefix = '') => {
  try {
    if (prefix) {
      // Only clear keys with specific prefix
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } else {
      // Clear all localStorage
      localStorage.clear();
    }
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
};

export default {
  saveToStorage,
  loadFromStorage,
  removeFromStorage,
  clearStorage
};