import 'react-native-gesture-handler';
import {AppRegistry, Appearance} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {useMemo, useState} from 'react';
import {background, onBackground, themes} from './src/globals';
import ThemeContext from './src/context/ThemeContext';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function AppWrapper(props) {
  const [theme, setTheme] = useState(
    Appearance.getColorScheme() || themes.dark,
  );
  const themeValue = useMemo(() => ({theme, setTheme}), [theme, setTheme]);
  const MyTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        color: onBackground(theme),
        background: background(theme),
      },
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          <App />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => AppWrapper);
