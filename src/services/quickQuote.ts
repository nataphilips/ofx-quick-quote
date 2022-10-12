import {atom} from 'recoil';
import api from './api';

export type QuickQuotePayload = {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
};

export type QuickQuoteResponse = {
  CustomerRate: number;
  CustomerRateInverse: number;
  CustomerAmount: number;
  InterbankAmount: number;
  DefaultFee: number;
  Fee: number;
  FeeFreeThreshold: number;
  InterbankRate: number;
  InverseInterbankRate: number;
  DeliveryCountry: string;
  DeliveryTime: number;
  ComparisonRate: number;
  ComparisonAmount: number;
  Message: string;
};

export type QuickQuoteState = {
  customerRate: number;
  from: {
    currency: string;
    amount: number;
  };
  to: {
    currency: string;
    amount: number;
  };
};

export const quickQuote = async (payload: QuickQuotePayload) => {
  const amount = payload.amount.toFixed(2);

  return await api.get<QuickQuoteResponse>(
    `${payload.fromCurrency}/${payload.toCurrency}/${amount}?format=json`,
  );
};

export const quickQuoteState = atom<QuickQuoteState>({
  key: 'quick-quote',
  default: {
    customerRate: 0,
    from: {
      currency: '',
      amount: 0,
    },
    to: {
      currency: '',
      amount: 0,
    },
  },
});
