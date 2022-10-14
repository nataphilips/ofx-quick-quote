import React, {useMemo} from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {currencies} from '../../data/currencies';
import {Controller, Control, FieldErrorsImpl} from 'react-hook-form';
import {IFormInputs} from './QuoteFormScreen';
import FormLabel from './FormLabel';
import {useTheme} from '@react-navigation/native';

const CurrencySelector = ({
  title,
  control,
  errors,
  name,
}: {
  title: string;
  control: Control<IFormInputs, object>;
  errors: Partial<FieldErrorsImpl<IFormInputs>>;
  name:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'fromCurrency'
    | 'toCurrency'
    | 'amount';
}) => {
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
      <FormLabel text={title} isRequired />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}, fieldState}) => (
          <>
            <SelectDropdown
              data={currencies}
              search
              onBlur={onBlur}
              onSelect={selectedItem => {
                onChange(selectedItem.code);
              }}
              buttonTextAfterSelection={selectedItem => {
                return `${selectedItem.name} (${selectedItem.code})`;
              }}
              rowTextForSelection={item => {
                return `${item.name} (${item.code})`;
              }}
              defaultValue={currencies.find(
                currency => currency.code === value,
              )}
              rowStyle={[{backgroundColor: 'white'}, styles.rowStyle]}
              buttonStyle={{
                ...{
                  backgroundColor: theme.colors.card,
                  shadowColor: 'blue',
                  borderColor: theme.colors.border,
                },
                ...styles.rowStyle,
                ...styles.buttonStyle,
              }}
              buttonTextStyle={{
                ...{color: theme.colors.text},
                ...styles.rowTextStyle,
              }}
              rowTextStyle={[{color: theme.colors.text}, styles.rowTextStyle]}
              dropdownStyle={styles.dropdownStyle}
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
                This field is required
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
  rowStyle: {
    width: '100%',
    height: 40,
  },
  buttonStyle: {borderWidth: 1, borderRadius: 5},
  rowTextStyle: {fontFamily: 'RobotoCondensed-Regular', fontSize: 16},
  dropdownStyle: {flex: 1},
});

export default CurrencySelector;
