import React, {useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  useWindowDimensions,
} from 'react-native';
import {Controller, Control, FieldErrorsImpl} from 'react-hook-form';
import {IFormInputs} from './QuoteFormScreen';
import FormLabel from './FormLabel';
import {useTheme} from '@react-navigation/native';

type InputFieldProps = {
  isRequired?: boolean;
  title: string;
  control: Control<IFormInputs, object>;
  errors: Partial<FieldErrorsImpl<IFormInputs>>;
  keyboardType?: KeyboardTypeOptions;
  autocapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  name:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'fromCurrency'
    | 'toCurrency'
    | 'amount';
};

const InputField = (props: InputFieldProps) => {
  const {
    isRequired = false,
    title,
    control,
    errors,
    keyboardType = 'default',
    autocapitalize,
    name,
  } = props;

  const isNumeric = keyboardType === 'numeric';

  const theme = useTheme();

  const {height, width} = useWindowDimensions();

  const isLandscape = useMemo(() => {
    return width >= height;
  }, [height, width]);

  return (
    <View
      style={[
        {...styles.container},
        isLandscape ? {marginVertical: 0} : {marginVertical: 10},
      ]}>
      <FormLabel text={title} isRequired={isRequired} />
      <Controller
        control={control}
        rules={{
          required: isRequired,
        }}
        render={({field: {onChange, onBlur, value}, fieldState}) => (
          <>
            <TextInput
              style={[
                {
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.card,
                },
                styles.input,
              ]}
              onBlur={onBlur}
              onChangeText={text => {
                if (isNumeric) {
                  const onlyNumbers = text.replace(/[^0-9]/g, '');
                  onChange(Number(onlyNumbers));
                } else {
                  onChange(text);
                }
              }}
              value={value ? value.toString() : ''}
              placeholder={isNumeric ? '0' : title}
              keyboardType={keyboardType}
              autoCapitalize={autocapitalize}
            />
            {fieldState.error?.message && (
              <Text
                style={[{color: theme.colors.notification}, styles.errorText]}>
                {fieldState.error?.message}
              </Text>
            )}
            {!fieldState.error && (errors as any)[name] && (
              <Text
                style={[{color: theme.colors.notification}, styles.errorText]}>
                {title} is required
              </Text>
            )}
          </>
        )}
        name={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 20},
  errorText: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 14,
    marginTop: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16,
    paddingLeft: 10,
  },
});

export default InputField;
