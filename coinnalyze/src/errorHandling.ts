import {onError} from '@apollo/client/link/error';
import {showErrorToast} from './toast';
import {RetryLink} from '@apollo/client/link/retry';

// Log any GraphQL errors or network error that occurred
export const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({message, locations, path}) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
      showErrorToast(`Oops`, 'An error occured');
    });
  if (networkError) {
    showErrorToast(`Network error`, 'Please check your internet connection');
  }
});
