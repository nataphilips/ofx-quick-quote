import React from 'react';
import {View, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {currencies} from '../../data/currencies';

const CurrencySelector = () => {
  return (
    <View>
      <Text style={{color: 'black'}}>From currency</Text>
      <SelectDropdown
        data={currencies}
        search
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={selectedItem => {
          return `${selectedItem.name} ${selectedItem.code}`;
        }}
        rowTextForSelection={item => {
          return `${item.name} ${item.code}`;
        }}
      />
    </View>
  );
};

export default CurrencySelector;
