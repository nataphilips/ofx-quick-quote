import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet} from 'react-native';

const FormLabel = ({
  text,
  isRequired = false,
}: {
  text: string;
  isRequired?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Text style={[{color: theme.colors.text}, styles.label]}>
      {text}{' '}
      {isRequired && (
        <Text style={[{color: theme.colors.notification}, styles.asterisk]}>
          *
        </Text>
      )}
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
  },
});

export default FormLabel;
