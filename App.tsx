import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {RecoilRoot} from 'recoil';
import AppStackNavigator from './src/navigation/AppStackNavigator';
import * as themes from './src/theme';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themes.DarkTheme.colors.background
      : themes.LightTheme.colors.background,
  };

  return (
    <RecoilRoot>
      <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <AppStackNavigator />
      </SafeAreaView>
    </RecoilRoot>
  );
};

export default App;
