import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuoteFormScreen from '../screens/QuoteFormScreen/QuoteFormScreen';
import QuoteResultScreen from '../screens/QuoteResultScreen/QuoteResultScreen';

const Stack = createNativeStackNavigator();

export type AppStackParamList = {
  QuoteForm: undefined;
  QuoteResult: undefined;
};

const AppStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'QuoteForm'}>
        <Stack.Screen
          name="QuoteForm"
          component={QuoteFormScreen}
          options={{title: 'Quick Quote'}}
        />
        <Stack.Screen
          name="QuoteResult"
          component={QuoteResultScreen}
          options={{title: 'Quick Quote'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigator;
