import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Button = ({label, onPress}: {label: string; onPress: () => void}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={{...{backgroundColor: theme.colors.primary}, ...styles.button}}
      >
        <Text style={styles.label}>{label.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 40,
    flexShrink: 1,
    paddingHorizontal: 70,
    marginVertical: 15,
  },
  label: {
    fontFamily: 'RobotoCondensed-Regular',
    fontSize: 16,
    color: 'white',
  },
});

export default Button;
