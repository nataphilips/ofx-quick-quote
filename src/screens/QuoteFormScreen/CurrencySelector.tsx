import React from 'react';
import {View, Text} from 'react-native';
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
    <View>
      <Text style={{color: 'black'}}>{title}</Text>
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

export default CurrencySelector;
