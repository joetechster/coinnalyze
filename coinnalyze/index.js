import 'react-native-gesture-handler';
import {AppRegistry, Appearance} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {useMemo, useState} from 'react';
import {api_uri, background, onBackground, themes} from './src/globals';
import ThemeContext from './src/context/ThemeContext';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: api_uri,
  cache: new InMemoryCache(),
});

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
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <NavigationContainer theme={MyTheme}>
            <App />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloProvider>
    </ThemeContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => AppWrapper);
