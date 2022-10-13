import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
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
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <View style={styles.centeredSection}>
            <Text style={styles.labelText}>OFX Customer Rate</Text>
            <Text style={styles.customerRateText}>{quote.customerRate}</Text>
          </View>
          <View style={styles.leftAlignedSection}>
            <Text style={styles.labelText}>From </Text>
            <View style={styles.resultAmountContainer}>
              <Text style={styles.currencyText}>{quote.from.currency}</Text>
              <Text style={styles.amountText}> {quote.from.amount}</Text>
            </View>
          </View>
          <View style={styles.leftAlignedSection}>
            <Text style={styles.labelText}>To </Text>
            <View style={styles.resultAmountContainer}>
              <Text style={styles.currencyText}>{quote.to.currency}</Text>
              <Text style={styles.amountText}> {quote.to.amount}</Text>
            </View>
          </View>
        </View>
        <Button label={'Start new quote'} onPress={onStartNewQuote} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {flex: 1, marginBottom: 5},
  resultAmountContainer: {flex: 1, flexDirection: 'row'},
  leftAlignedSection: {flex: 1, justifyContent: 'flex-start', marginBottom: 10},
  centeredSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  labelText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 26,
    color: 'rgba(76,76,76,1)',
  },
  customerRateText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 54,
    color: 'rgba(48,176,143,1)',
  },
  currencyText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 34,
    color: 'rgba(76,76,76,1)',
  },
  amountText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 34,
    color: 'rgb(44,131,162)',
  },
});

export default QuoteResultScreen;
