/**
 * Safe localStorage utility that handles SSR compatibility and error cases
 */

export interface SafeStorage {
  getItem<T>(key: string, defaultValue: T): T;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  isAvailable(): boolean;
}

/**
 * Checks if localStorage is available in the current environment
 * @returns true if localStorage is available, false otherwise
 */
function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined' || typeof Storage === 'undefined') {
      return false;
    }
    
    // Test if we can actually use localStorage
    const testKey = '__localStorage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Safely retrieves an item from localStorage with proper error handling
 * @param key - The localStorage key
 * @param defaultValue - The default value to return if retrieval fails
 * @returns The parsed value from localStorage or the default value
 */
function getItem<T>(key: string, defaultValue: T): T {
  if (!isLocalStorageAvailable()) {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Failed to parse localStorage item "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely stores an item in localStorage with proper error handling
 * @param key - The localStorage key
 * @param value - The value to store
 */
function setItem<T>(key: string, value: T): void {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available, skipping setItem');
    return;
  }

  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Failed to store item in localStorage "${key}":`, error);
  }
}

/**
 * Safely removes an item from localStorage
 * @param key - The localStorage key to remove
 */
function removeItem(key: string): void {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available, skipping removeItem');
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove item from localStorage "${key}":`, error);
  }
}

/**
 * Safe localStorage utility object
 */
export const safeStorage: SafeStorage = {
  getItem,
  setItem,
  removeItem,
  isAvailable: isLocalStorageAvailable,
};

// Export individual functions for convenience
export { getItem, setItem, removeItem, isLocalStorageAvailable };