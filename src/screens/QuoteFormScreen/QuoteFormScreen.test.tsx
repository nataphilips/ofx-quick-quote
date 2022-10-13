import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import QuoteFormScreen from './QuoteFormScreen';
import {RecoilRoot} from 'recoil';

jest.mock('react-native-select-dropdown', () => 'SelectDropdown');

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockedNavigate,
}));

describe('QuoteFormScreen component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const wrapper = (component: React.ReactElement): React.ReactElement => {
    return <RecoilRoot>{component}</RecoilRoot>;
  };

  const elements = {
    firstNameFieldPlaceholder: (api: RenderAPI) =>
      api.getByPlaceholderText(/First Name/i),
    fromCurrencyLabel: (api: RenderAPI) => api.getByText(/From Currency/i),
    toCurrencyLabel: (api: RenderAPI) => api.getByText(/To Currency/i),
    amountLabel: (api: RenderAPI) => api.getByText(/Amount/i),
  };

  it('renders first name form field', () => {
    const component = render(wrapper(<QuoteFormScreen />));
    expect(elements.firstNameFieldPlaceholder(component)).toBeDefined();
  });

  it('renders from currency picker label', () => {
    const component = render(wrapper(<QuoteFormScreen />));
    expect(elements.fromCurrencyLabel(component)).toBeDefined();
  });

  it('renders to currency picker label', () => {
    const component = render(wrapper(<QuoteFormScreen />));
    expect(elements.toCurrencyLabel(component)).toBeDefined();
  });

  it('renders to amount label', () => {
    const component = render(wrapper(<QuoteFormScreen />));
    expect(elements.amountLabel(component)).toBeDefined();
  });
});
