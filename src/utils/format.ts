import {NativeModules} from 'react-native';

export const formatCurrency = (amount: number) => {
  const locale = (
    NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0]
  ).replace('_', '-');

  const roundedAmount = Math.floor(amount * 100) / 100;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(roundedAmount);
};
