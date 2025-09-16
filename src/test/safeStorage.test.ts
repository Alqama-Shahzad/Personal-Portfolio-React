import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { safeStorage, getItem, setItem, removeItem, isLocalStorageAvailable } from '../lib/safeStorage';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

describe('safeStorage', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock window.localStorage
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('isLocalStorageAvailable', () => {
    it('should return true when localStorage is available', () => {
      expect(isLocalStorageAvailable()).toBe(true);
    });

    it('should return false when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-ignore
      delete global.window;
      
      expect(isLocalStorageAvailable()).toBe(false);
      
      global.window = originalWindow;
    });

    it('should return false when localStorage throws an error', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage not available');
      });
      
      expect(isLocalStorageAvailable()).toBe(false);
    });
  });

  describe('getItem', () => {
    it('should return parsed value from localStorage', () => {
      const testData = { name: 'test', value: 123 };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(testData));
      
      const result = getItem('testKey', {});
      
      expect(localStorageMock.getItem).toHaveBeenCalledWith('testKey');
      expect(result).toEqual(testData);
    });

    it('should return default value when localStorage item is null', () => {
      localStorageMock.getItem.mockReturnValue(null);
      const defaultValue = { default: true };
      
      const result = getItem('testKey', defaultValue);
      
      expect(result).toEqual(defaultValue);
    });

    it('should return default value when JSON parsing fails', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      const defaultValue = { default: true };
      
      const result = getItem('testKey', defaultValue);
      
      expect(result).toEqual(defaultValue);
    });

    it('should return default value when localStorage is not available', () => {
      // Mock localStorage as unavailable
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        writable: true,
      });
      
      const defaultValue = { default: true };
      const result = getItem('testKey', defaultValue);
      
      expect(result).toEqual(defaultValue);
    });
  });

  describe('setItem', () => {
    it('should store serialized value in localStorage', () => {
      const testData = { name: 'test', value: 123 };
      
      setItem('testKey', testData);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('testKey', JSON.stringify(testData));
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });
      
      // Should not throw
      expect(() => setItem('testKey', { data: 'test' })).not.toThrow();
    });

    it('should skip when localStorage is not available', () => {
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        writable: true,
      });
      
      setItem('testKey', { data: 'test' });
      
      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe('removeItem', () => {
    it('should remove item from localStorage', () => {
      removeItem('testKey');
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('testKey');
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });
      
      expect(() => removeItem('testKey')).not.toThrow();
    });

    it('should skip when localStorage is not available', () => {
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        writable: true,
      });
      
      removeItem('testKey');
      
      expect(localStorageMock.removeItem).not.toHaveBeenCalled();
    });
  });

  describe('safeStorage object', () => {
    it('should provide all required methods', () => {
      expect(safeStorage.getItem).toBeDefined();
      expect(safeStorage.setItem).toBeDefined();
      expect(safeStorage.removeItem).toBeDefined();
      expect(safeStorage.isAvailable).toBeDefined();
    });

    it('should work with the interface methods', () => {
      const testData = ['project1', 'project2'];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(testData));
      
      const result = safeStorage.getItem('projects', []);
      expect(result).toEqual(testData);
      
      safeStorage.setItem('projects', testData);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('projects', JSON.stringify(testData));
      
      expect(safeStorage.isAvailable()).toBe(true);
    });
  });
});