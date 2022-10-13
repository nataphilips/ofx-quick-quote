import React from 'react';
import {Text, StyleSheet} from 'react-native';

const FormLabel = ({
  text,
  isRequired = false,
}: {
  text: string;
  isRequired?: boolean;
}) => {
  return (
    <Text style={styles.label}>
      {text} {isRequired && <Text style={styles.asterisk}>*</Text>}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 14,
    marginRight: 5,
  },
  asterisk: {
    fontSize: 20,
    color: 'red',
  },
});

export default FormLabel;
