import {atom} from 'recoil';

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
