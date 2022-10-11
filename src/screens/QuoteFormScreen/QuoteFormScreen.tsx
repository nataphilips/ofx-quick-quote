import React from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import CurrencySelector from './CurrencySelector';
import InputField from './InputField';
import {useForm, SubmitHandler} from 'react-hook-form';

export type IFormInputs = {
  firstName: string;
};

const QuoteFormScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
    },
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
