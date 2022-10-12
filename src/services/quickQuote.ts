import {axiosInstance} from './axios';

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

export const quickQuote = async (payload: QuickQuotePayload) => {
  const amount = payload.amount.toFixed(2);
  return await axiosInstance<QuickQuoteResponse>({
    method: 'GET',
    url: `${payload.fromCurrency}/${payload.toCurrency}/${amount}`,
  });
};
