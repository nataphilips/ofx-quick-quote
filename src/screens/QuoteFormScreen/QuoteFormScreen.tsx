import React from 'react';
import {ScrollView, Text} from 'react-native';
import CurrencySelector from './CurrencySelector';

const QuoteFormScreen = () => {
  return (
    <ScrollView>
      <Text style={{color: 'black'}}>Quick Quote</Text>
      <CurrencySelector />
    </ScrollView>
  );
};

export default QuoteFormScreen;
