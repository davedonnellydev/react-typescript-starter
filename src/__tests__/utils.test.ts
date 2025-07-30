import {
  formatDate,
  formatDateTime,
  capitalize,
  truncate,
  formatNumber,
  formatCurrency,
  isValidEmail,
  isValidUrl,
  chunk,
  unique,
  debounce,
  storage,
} from '../utils/helpers';

describe('Utility Functions', () => {
  describe('Date formatting', () => {
    test('formatDate formats date correctly', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/12\/25\/2023/);
    });

    test('formatDateTime formats date and time correctly', () => {
      const date = new Date('2023-12-25T10:30:00');
      const formatted = formatDateTime(date);
      expect(formatted).toMatch(/Dec 25, 2023/);
      expect(formatted).toMatch(/10:30/);
    });
  });

  describe('String utilities', () => {
    test('capitalize capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
    });

    test('truncate truncates long strings', () => {
      expect(truncate('Hello world', 5)).toBe('Hello...');
      expect(truncate('Short', 10)).toBe('Short');
    });
  });

  describe('Number utilities', () => {
    test('formatNumber formats numbers with commas', () => {
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(1000)).toBe('1,000');
    });

    test('formatCurrency formats currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(100)).toBe('$100.00');
    });
  });

  describe('Validation utilities', () => {
    test('isValidEmail validates email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });

    test('isValidUrl validates URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('invalid-url')).toBe(false);
    });
  });

  describe('Array utilities', () => {
    test('chunk splits array into chunks', () => {
      const array = [1, 2, 3, 4, 5, 6];
      expect(chunk(array, 2)).toEqual([[1, 2], [3, 4], [5, 6]]);
      expect(chunk(array, 3)).toEqual([[1, 2, 3], [4, 5, 6]]);
    });

    test('unique removes duplicates', () => {
      const array = [1, 2, 2, 3, 3, 4];
      expect(unique(array)).toEqual([1, 2, 3, 4]);
    });
  });

  describe('Debounce utility', () => {
    test('debounce delays function execution', () => {
      jest.useFakeTimers();
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).not.toHaveBeenCalled();

      jest.runAllTimers();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('Storage utilities', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    test('storage.set and storage.get work correctly', () => {
      const testData = { key: 'value' };
      storage.set('test', testData);
      expect(storage.get('test')).toEqual(testData);
    });

    test('storage.remove removes items', () => {
      storage.set('test', 'value');
      storage.remove('test');
      expect(storage.get('test')).toBeNull();
    });

    test('storage.clear clears all items', () => {
      storage.set('test1', 'value1');
      storage.set('test2', 'value2');
      storage.clear();
      expect(storage.get('test1')).toBeNull();
      expect(storage.get('test2')).toBeNull();
    });

    test('storage.get returns null for non-existent keys', () => {
      expect(storage.get('non-existent')).toBeNull();
    });
  });
});