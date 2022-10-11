import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Controller, Control, FieldErrorsImpl} from 'react-hook-form';
import {IFormInputs} from './QuoteFormScreen';

const InputField = ({
  title,
  control,
  errors,
}: {
  title: string;
  control: Control<IFormInputs, object>;
  errors: Partial<FieldErrorsImpl<IFormInputs>>;
}) => {
  return (
    <View>
      <Text> {title}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={{backgroundColor: 'white'}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>{title} is required</Text>}
    </View>
  );
};

export default InputField;
