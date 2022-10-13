import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuoteFormScreen from '../screens/QuoteFormScreen/QuoteFormScreen';
import QuoteResultScreen from '../screens/QuoteResultScreen/QuoteResultScreen';
import * as themes from '../theme';
import {useColorScheme} from 'react-native';

const Stack = createNativeStackNavigator();

export type AppStackParamList = {
  QuoteForm: undefined;
  QuoteResult: undefined;
};

const AppStackNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer
      theme={isDarkMode ? themes.DarkTheme : themes.LightTheme}
    >
      <Stack.Navigator initialRouteName={'QuoteForm'}>
        <Stack.Screen
          name="QuoteForm"
          component={QuoteFormScreen}
          options={{title: 'Quick Quote', headerBackTitle: 'Back'}}
        />
        <Stack.Screen
          name="QuoteResult"
          component={QuoteResultScreen}
          options={{title: 'Quick Quote', headerBackTitle: 'Back'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigator;
