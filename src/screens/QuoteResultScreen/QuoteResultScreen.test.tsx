import React, {useEffect} from 'react';
import {act, fireEvent, render, RenderAPI} from '@testing-library/react-native';
import QuoteResultScreen from './QuoteResultScreen';
import {RecoilRoot, useRecoilValue, atom} from 'recoil';
import {QuickQuoteState} from '../../state/quickQuote';
import {LightTheme} from '../../theme';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const mockedRecoilOnChange = jest.fn();
const mockedNavigate = {navigate: jest.fn()};
const mockedTheme = LightTheme;
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockedNavigate,
  useTheme: () => mockedTheme,
}));

jest.mock('../../utils/format', () => ({formatCurrency: () => '100.11'}));
export const RecoilObserver = ({
  node,
  onChange,
}: {
  node: any;
  onChange: Function;
}) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

describe('QuoteResultScreen component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const recoilStateToTest = atom<QuickQuoteState>({
    key: 'quick-quote',
    default: {
      customerRate: 0.6565,
      from: {
        currency: 'AUD',
        amount: 1000,
      },
      to: {
        currency: 'USD',
        amount: 600,
      },
    },
  });

  const wrapper = (component: React.ReactElement): React.ReactElement => {
    return (
      <RecoilRoot>
        <RecoilObserver
          node={recoilStateToTest}
          onChange={mockedRecoilOnChange}
        />
        {component}
      </RecoilRoot>
    );
  };

  const elements = {
    newQuoteButton: (api: RenderAPI) => api.getByText(/Start new quote/i),
    customerRateHeader: (api: RenderAPI) => api.getByText(/OFX Customer Rate/i),
  };

  describe('Rendering', () => {
    it('renders the New quote button', () => {
      const component = render(wrapper(<QuoteResultScreen />));
      expect(elements.newQuoteButton(component)).toBeDefined();
    });
    it('renders customer rate header', () => {
      const component = render(wrapper(<QuoteResultScreen />));
      expect(elements.customerRateHeader(component)).toBeDefined();
    });
    it('renders correct currencies from Recoil state', () => {
      const component = render(wrapper(<QuoteResultScreen />));
      expect(component.queryAllByText(/AUD/i)).toHaveLength(1);
      expect(component.queryAllByText(/USD/i)).toHaveLength(1);
    });
  });

  it('navigates to the previous screen when pressing the button', async () => {
    const component = render(wrapper(<QuoteResultScreen />));
    await act(async () => {
      fireEvent.press(elements.newQuoteButton(component));
    });
    expect(mockedNavigate.navigate).toHaveBeenCalledWith('QuoteForm');
  });
});
