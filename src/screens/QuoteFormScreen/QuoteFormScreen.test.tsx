import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import QuoteFormScreen from './QuoteFormScreen';

jest.mock('react-native-select-dropdown', () => 'SelectDropdown');

describe('QuoteFormScreen component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const elements = {
    firstNameFieldPlaceholder: (api: RenderAPI) =>
      api.getByPlaceholderText(/First Name/i),
    fromCurrencyLabel: (api: RenderAPI) => api.getByText(/From Currency/i),
  };

  it('renders first name form field', () => {
    const component = render(<QuoteFormScreen />);
    expect(elements.firstNameFieldPlaceholder(component)).toBeDefined();
  });

  it('renders from currency picker label', () => {
    const component = render(<QuoteFormScreen />);
    expect(elements.fromCurrencyLabel(component)).toBeDefined();
  });
});
