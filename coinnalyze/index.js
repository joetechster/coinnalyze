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
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';

const httpLink = new HttpLink({
  uri: api_uri,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: api_uri,
  }),
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
// Initialize Apollo Client
const client = new ApolloClient({
  link: splitLink,
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
