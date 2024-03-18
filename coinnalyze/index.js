import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {api_uri} from './src/globals';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {Provider} from 'react-redux';
import store from './src/redux_schema/store';
import ThemedStatusBar from './src/components/ThemedStatusBar';
import './src/redux_schema/setup'; // Import file so initial state can be set
import {loadErrorMessages, loadDevMessages} from '@apollo/client/dev';

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

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
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          news: {
            keyArgs: false,
            merge(existing, incoming) {
              let results = incoming.results;
              if (existing) {
                results = [...existing.results, ...results];
              }
              return {
                __typename: 'NewsResponse',
                nextPage: incoming.nextPage,
                results,
              };
            },
          },
        },
      },
    },
  }),
});

function AppWrapper() {
  return (
    <Provider store={store}>
      <ThemedStatusBar />
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </ApolloProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => AppWrapper);
