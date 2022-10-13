import {formatCurrency} from './format';

jest.mock('react-native', () => {
  return {
    NativeModules: {
      SettingsManager: {
        settings: {
          AppleLocale: 'en_US',
        },
      },
    },
  };
});

describe('Formatters', () => {
  describe('Format Currency', () => {
    it('should format a currency with 2 decimal places', () => {
      expect(formatCurrency(100.999)).toBe('100.99');
      expect(formatCurrency(100.99)).toBe('100.99');

      expect(formatCurrency(100.111)).toBe('100.11');
      expect(formatCurrency(100.11)).toBe('100.11');

      expect(formatCurrency(100.0)).toBe('100.00');
      expect(formatCurrency(100.0)).toBe('100.00');
    });
  });
});
