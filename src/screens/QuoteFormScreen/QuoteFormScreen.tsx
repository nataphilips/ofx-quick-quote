import React from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import CurrencySelector from './CurrencySelector';
import InputField from './InputField';
import {useForm, SubmitHandler} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';

export type IFormInputs = {
  firstName: string;
};

const QuoteFormScreen = () => {
  const formSchema = zod.object({
    firstName: zod.string().min(1, {message: 'Please enter your first name'}),
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<IFormInputs> = data => console.log(data);
  return (
    <ScrollView>
      <InputField title={'First Name'} control={control} errors={errors} />
      <CurrencySelector />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default QuoteFormScreen;
