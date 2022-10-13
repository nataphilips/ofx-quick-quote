import React, {useEffect} from 'react';
import {act, fireEvent, render, RenderAPI} from '@testing-library/react-native';
import QuoteFormScreen from './QuoteFormScreen';
import {RecoilRoot, useRecoilValue} from 'recoil';
import {quickQuoteState} from '../../state/quickQuote';
import {LightTheme} from '../../theme';

jest.mock('react-native-select-dropdown', () => 'SelectDropdown');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const mockedRecoilOnChange = jest.fn();
const mockedNavigate = {navigate: jest.fn()};
const mockedTheme = LightTheme;
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockedNavigate,
  useTheme: () => mockedTheme,
}));

export const RecoilObserver = (props: {node: any; onChange: Function}) => {
  const value = useRecoilValue(props.node);
  useEffect(() => props.onChange(value), [props.onChange, value]);
  return null;
};

describe('QuoteFormScreen component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const wrapper = (component: React.ReactElement): React.ReactElement => {
    return (
      <RecoilRoot>
        <RecoilObserver
          node={quickQuoteState}
          onChange={mockedRecoilOnChange}
        />
        {component}
      </RecoilRoot>
    );
  };

  const elements = {
    firstNameInput: (api: RenderAPI) => api.getByPlaceholderText(/First Name/i),
    lastNameInput: (api: RenderAPI) => api.getByPlaceholderText(/Last Name/i),
    emailInput: (api: RenderAPI) => api.getByPlaceholderText(/Email/i),
    amountInput: (api: RenderAPI) => api.getByPlaceholderText(/0/i),
    quoteButton: (api: RenderAPI) => api.getByText(/Get quote/i),

    fromCurrencyLabel: (api: RenderAPI) => api.getByText(/From Currency/i),
    toCurrencyLabel: (api: RenderAPI) => api.getByText(/To Currency/i),
    amountLabel: (api: RenderAPI) => api.getByText(/Amount/i),
  };

  describe('Rendering', () => {
    it('renders first name form field', () => {
      const component = render(wrapper(<QuoteFormScreen />));
      expect(elements.firstNameInput(component)).toBeDefined();
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

  describe('Validations', () => {
    it('should allow email to be empty', async () => {
      const component = render(wrapper(<QuoteFormScreen />));

      await act(async () => {
        fireEvent.press(elements.quoteButton(component));
      });

      expect(
        component.queryAllByText(/Please enter a valid email/i),
      ).toHaveLength(0);
    });

    it('if filled, email should be valid', async () => {
      const component = render(wrapper(<QuoteFormScreen />));

      await act(async () => {
        fireEvent.changeText(elements.emailInput(component), 'invalid');
        fireEvent.press(elements.quoteButton(component));
      });

      expect(component.getByText(/Please enter a valid email/i)).toBeDefined();
    });

    it('first name field is required', async () => {
      const component = render(wrapper(<QuoteFormScreen />));

      await act(async () => {
        fireEvent.press(elements.quoteButton(component));
      });

      expect(
        component.getByText(/Please enter your first name/i),
      ).toBeDefined();

      await act(async () => {
        fireEvent.changeText(elements.firstNameInput(component), 'my name');
        fireEvent.press(elements.quoteButton(component));
      });

      expect(
        component.queryAllByText(/Please enter your first name/i),
      ).toHaveLength(0);
    });

    it('last name field is required', async () => {
      const component = render(wrapper(<QuoteFormScreen />));

      await act(async () => {
        fireEvent.press(elements.quoteButton(component));
      });

      expect(component.getByText(/Please enter your last name/i)).toBeDefined();

      await act(async () => {
        fireEvent.changeText(elements.lastNameInput(component), 'my name');
        fireEvent.press(elements.quoteButton(component));
      });

      expect(
        component.queryAllByText(/Please enter your last name/i),
      ).toHaveLength(0);
    });

    it('amount field is required', async () => {
      const component = render(wrapper(<QuoteFormScreen />));

      await act(async () => {
        fireEvent.press(elements.quoteButton(component));
      });

      expect(
        component.getByText(/Please enter a positive amount/i),
      ).toBeDefined();

      await act(async () => {
        fireEvent.changeText(elements.amountInput(component), '10');
        fireEvent.press(elements.quoteButton(component));
      });

      expect(
        component.queryAllByText(/Please enter a positive amount/i),
      ).toHaveLength(0);
    });
  });

  xit('Quote button should call api and navigate to the results screen', async () => {
    const component = render(wrapper(<QuoteFormScreen />));

    await act(async () => {
      fireEvent.changeText(elements.firstNameInput(component), 'firstname');
      fireEvent.changeText(elements.lastNameInput(component), 'lastname');
      fireEvent.changeText(elements.amountInput(component), '1000');
      fireEvent.press(elements.quoteButton(component));
    });

    expect(mockedNavigate.navigate).toHaveBeenCalled();
  });
});
