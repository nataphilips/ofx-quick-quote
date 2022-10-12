import React from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import CurrencySelector from './CurrencySelector';
import InputField from './InputField';
import {useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';

export type IFormInputs = {
  firstName: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
};

const QuoteFormScreen = () => {
  const formSchema = zod.object({
    firstName: zod.string().min(1, {message: 'Please enter your first name'}),
    fromCurrency: zod
      .string()
      .min(3, {message: 'Please enter a valid currency'}),
    toCurrency: zod.string().min(3, {message: 'Please enter a valid currency'}),
    amount: zod.number().positive(),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      fromCurrency: 'AUD',
      toCurrency: 'USD',
      amount: 0,
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

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
