import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Controller, Control, FieldErrorsImpl} from 'react-hook-form';
import {IFormInputs} from './QuoteFormScreen';

const InputField = ({
  title,
  control,
  errors,
  numeric = false,
  name,
}: {
  title: string;
  control: Control<IFormInputs, object>;
  errors: Partial<FieldErrorsImpl<IFormInputs>>;
  numeric?: boolean;
  name: string;
}) => {
  return (
    <View>
      <Text> {title}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}, fieldState}) => (
          <>
            <TextInput
              style={{backgroundColor: 'white'}}
              onBlur={onBlur}
              onChangeText={text => {
                if (numeric) {
                  const onlyNumbers = text.replace(/[^0-9]/g, '');
                  onChange(Number(onlyNumbers));
                } else {
                  onChange(text);
                }
              }}
              value={value ? value.toString() : ''}
              placeholder={numeric ? '0' : title}
              keyboardType={numeric ? 'numeric' : 'default'}
            />
            {fieldState.error?.message && (
              <Text>{fieldState.error?.message}</Text>
            )}
            {!fieldState.error && errors.firstName && (
              <Text>{title} is required</Text>
            )}
          </>
        )}
        name={name}
      />
    </View>
  );
};

export default InputField;
