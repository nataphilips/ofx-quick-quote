import React, {useCallback} from 'react';
import {ScrollView, Text} from 'react-native';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {quickQuoteState} from '../../services/quickQuote';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../navigation/AppStackNavigator';

const QuoteResultScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [quote] = useRecoilState(quickQuoteState);
  const resetQuote = useResetRecoilState(quickQuoteState);

  const onStartNewQuote = useCallback(() => {
    resetQuote();
    navigation.navigate('QuoteForm');
  }, [navigation, resetQuote]);

  return (
    <ScrollView>
      <Text>From {quote.from.currency}</Text>
      <Text>From {quote.from.amount}</Text>

      <Text>To {quote.to.currency}</Text>
      <Text>To {quote.to.amount}</Text>
      <Button label={'Start new quote'} onPress={onStartNewQuote} />
    </ScrollView>
  );
};

export default QuoteResultScreen;
