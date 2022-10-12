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
};

const QuoteFormScreen = () => {
  const formSchema = zod.object({
    firstName: zod.string().min(1, {message: 'Please enter your first name'}),
    fromCurrency: zod
      .string()
      .min(3, {message: 'Please enter a valid currency'}),
    toCurrency: zod.string().min(3, {message: 'Please enter a valid currency'}),
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
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);

  return (
    <ScrollView>
      <InputField title={'First Name'} control={control} errors={errors} />
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
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default QuoteFormScreen;
