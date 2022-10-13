import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Controller, Control, FieldErrorsImpl} from 'react-hook-form';
import {IFormInputs} from './QuoteFormScreen';
import FormLabel from './FormLabel';

const InputField = ({
  isRequired = false,
  title,
  control,
  errors,
  numeric = false,
  name,
}: {
  isRequired?: boolean;
  title: string;
  control: Control<IFormInputs, object>;
  errors: Partial<FieldErrorsImpl<IFormInputs>>;
  numeric?: boolean;
  name:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'fromCurrency'
    | 'toCurrency'
    | 'amount';
}) => {
  return (
    <View style={styles.container}>
      <FormLabel text={title} isRequired={isRequired} />
      <Controller
        control={control}
        rules={{
          required: isRequired,
        }}
        render={({field: {onChange, onBlur, value}, fieldState}) => (
          <>
            <TextInput
              style={styles.input}
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
              <Text style={styles.errorText}>{fieldState.error?.message}</Text>
            )}
            {!fieldState.error && (errors as any)[name] && (
              <Text style={styles.errorText}>{title} is required</Text>
            )}
          </>
        )}
        name={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 20, marginVertical: 10},
  errorText: {
    color: 'red',
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 14,
    marginTop: 5,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16,
    paddingLeft: 10,
  },
});

export default InputField;
