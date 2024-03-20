import {onError} from '@apollo/client/link/error';
import {showErrorToast} from './toast';
import {RetryLink} from '@apollo/client/link/retry';
import React from 'react';
import Text from './components/Text';
import styleDecorator from './styles/App_styles';
import useTheme from './hooks/useTheme';

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

export class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
}> {
  state = {hasError: false};
  static getDerivedStateFromError(error: Error) {
    return {hasError: true};
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          {this.props.children}
          <ErrorBanner></ErrorBanner>
        </>
      );
    }
    return this.props.children;
  }
}

const ErrorBanner = () => {
  const {style} = useTheme(styleDecorator);
  return (
    <Text
      style={{
        position: 'absolute',
        bottom: style.tabBar.height,
        right: 0,
        left: 0,
        padding: 3,
        backgroundColor: 'red',
        color: 'white',
        fontSize: 10,
        textAlign: 'center',
      }}>
      An error occured
    </Text>
  );
};
