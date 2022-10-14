import 'react-native';
import api from './api';
import {quickQuote} from './quickQuote';

const mockedApi = api as jest.Mocked<typeof api>;
jest.mock('./api');

describe('Quick Quote API', () => {
  it('should format payload amount with 2 decimals', async () => {
    await quickQuote({
      fromCurrency: 'USD',
      toCurrency: 'AUD',
      amount: 10.111111,
    });

    expect(mockedApi.get).toHaveBeenCalledWith('USD/AUD/10.11?format=json');
  });
});
