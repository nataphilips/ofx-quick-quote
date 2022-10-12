import React from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import CurrencySelector from './CurrencySelector';
import InputField from './InputField';
import {useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {quickQuote, quickQuoteState} from '../../services/quickQuote';
import {useRecoilState} from 'recoil';
import {useNavigation} from '@react-navigation/native';

export type IFormInputs = {
  firstName: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
};

const QuoteFormScreen = () => {
  const navigation = useNavigation();
  const [_quote, setQuote] = useRecoilState(quickQuoteState);

  const formSchema = zod.object({
    firstName: zod.string().min(1, {message: 'Please enter your first name'}),
    fromCurrency: zod
      .string()
      .min(3, {message: 'Please enter a valid currency'}),
    toCurrency: zod.string().min(3, {message: 'Please enter a valid currency'}),
    amount: zod.number().positive(),
  });

  const form = useForm({
    defaultValues: {
      firstName: '',
      fromCurrency: 'AUD',
      toCurrency: 'USD',
      amount: 0,
    },
    resolver: zodResolver(formSchema),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = form;

  const onSubmit: SubmitHandler<IFormInputs> = async data => {
    const response = await quickQuote({
      fromCurrency: data.fromCurrency,
      toCurrency: data.toCurrency,
      amount: data.amount,
    });

    setQuote({
      customerRate: response.data.ComparisonRate,
      from: {
        currency: data.fromCurrency,
        amount: data.amount,
      },
      to: {
        currency: data.toCurrency,
        amount: response.data.CustomerAmount,
      },
    });

    navigation.navigate('QuoteResult');
  };

  return (
    <ScrollView>
      <InputField
        title={'First Name'}
        control={control}
        errors={errors}
        name={'firstName'}
      />
      <CurrencySelector
        title={'From Currency'}
        control={control}
        errors={errors}
        name={'fromCurrency'}
      />
      <CurrencySelector
        title={'To Currency'}
        control={control}
        errors={errors}
        name={'toCurrency'}
      />
      <InputField
        title={'Amount'}
        control={control}
        errors={errors}
        numeric={true}
        name={'amount'}
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default QuoteFormScreen;
