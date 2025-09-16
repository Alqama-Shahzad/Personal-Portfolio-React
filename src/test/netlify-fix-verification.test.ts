import { describe, it, expect, beforeEach } from 'vitest';
import { safeStorage } from '../lib/safeStorage';

describe('Netlify Fix Verification', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  it('should handle SSR environment gracefully', () => {
    // Mock SSR environment
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;
    
    // Should not throw errors in SSR
    expect(() => {
      const result = safeStorage.getItem('test', 'default');
      expect(result).toBe('default');
    }).not.toThrow();
    
    expect(() => {
      safeStorage.setItem('test', 'value');
    }).not.toThrow();
    
    expect(() => {
      safeStorage.removeItem('test');
    }).not.toThrow();
    
    expect(safeStorage.isAvailable()).toBe(false);
    
    // Restore window
    global.window = originalWindow;
  });

  it('should work correctly in browser environment', () => {
    // Verify we're in a browser-like environment
    expect(safeStorage.isAvailable()).toBe(true);
    
    // Test basic functionality
    safeStorage.setItem('testKey', { data: 'test' });
    const result = safeStorage.getItem('testKey', {});
    
    expect(result).toEqual({ data: 'test' });
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw errors
    const originalSetItem = Storage.prototype.setItem;
    const originalGetItem = Storage.prototype.getItem;
    
    Storage.prototype.setItem = () => {
      throw new Error('localStorage error');
    };
    
    Storage.prototype.getItem = () => {
      throw new Error('localStorage error');
    };
    
    // Should not throw
    expect(() => {
      safeStorage.setItem('test', 'value');
    }).not.toThrow();
    
    expect(() => {
      const result = safeStorage.getItem('test', 'default');
      expect(result).toBe('default');
    }).not.toThrow();
    
    // Restore original methods
    Storage.prototype.setItem = originalSetItem;
    Storage.prototype.getItem = originalGetItem;
  });

  it('should maintain type safety', () => {
    interface TestData {
      id: number;
      name: string;
      active: boolean;
    }
    
    const testData: TestData = {
      id: 1,
      name: 'Test',
      active: true
    };
    
    safeStorage.setItem<TestData>('typedData', testData);
    const result = safeStorage.getItem<TestData>('typedData', { id: 0, name: '', active: false });
    
    expect(result).toEqual(testData);
    expect(typeof result.id).toBe('number');
    expect(typeof result.name).toBe('string');
    expect(typeof result.active).toBe('boolean');
  });
});