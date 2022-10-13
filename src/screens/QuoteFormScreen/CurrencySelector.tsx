import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {currencies} from '../../data/currencies';
import {Controller, Control, FieldErrorsImpl} from 'react-hook-form';
import {IFormInputs} from './QuoteFormScreen';

const CurrencySelector = ({
  title,
  control,
  errors,
  name,
}: {
  title: string;
  control: Control<IFormInputs, object>;
  errors: Partial<FieldErrorsImpl<IFormInputs>>;
  name: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
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
              rowStyle={styles.rowStyle}
              buttonStyle={{...styles.rowStyle, ...styles.buttonStyle}}
              buttonTextStyle={styles.rowTextStyle}
              rowTextStyle={styles.rowTextStyle}
              dropdownStyle={styles.dropdownStyle}
            />

            {fieldState.error?.message && (
              <Text style={styles.errorText}>{fieldState.error?.message}</Text>
            )}
            {!fieldState.error && (errors as any)[name] && (
              <Text style={styles.errorText}>This field is required</Text>
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
  label: {
    marginBottom: 5,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 14,
    marginTop: 5,
  },
  rowStyle: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
  },
  buttonStyle: {borderWidth: 1, borderColor: 'grey', borderRadius: 5},
  rowTextStyle: {fontFamily: 'RobotoCondensed-Regular', fontSize: 16},
  dropdownStyle: {flex: 1, marginTop: -40},
});

export default CurrencySelector;
