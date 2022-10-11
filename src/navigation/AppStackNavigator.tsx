import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuoteFormScreen from '../screens/QuoteFormScreen';

const Stack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'QuoteForm'}>
        <Stack.Screen
          name="QuoteForm"
          component={QuoteFormScreen}
          options={{title: 'Quick Quote'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigator;
