import React, {PropsWithChildren, useContext, useMemo, useState} from 'react';
import {Appearance, StatusBar, StyleSheet} from 'react-native';
import ThemeContext from './context/ThemeContext';
import useTheme from './hooks/useTheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import News from './screens/News';
import {
  Theme,
  background,
  onBackground,
  onSurface,
  primary,
  surface,
  themes,
} from './globals';
import {SearchBar} from '@rneui/themed';

function App(): React.JSX.Element {
  const style = useTheme(styleDecorator);
  const {theme, setTheme} = useContext(ThemeContext);
  return (
    <>
      <StatusBar
        barStyle={theme === themes.dark ? 'light-content' : 'dark-content'}
        backgroundColor={style.statusBar.backgroundColor}
      />
    </>
  );
}

function styleDecorator(theme: Theme) {
  return StyleSheet.create({
    statusBar: {
      backgroundColor: background(theme),
    },
  });
}

export default function AppWrapper(props: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(
    (Appearance.getColorScheme() as Theme) || themes.dark,
  );
  const themeValue = useMemo(() => ({theme, setTheme}), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}
