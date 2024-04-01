import {onError} from '@apollo/client/link/error';
import {showErrorToast} from './toast';
import React from 'react';

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

export interface ErrorBoundaryProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  message?: string;
}
export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = {hasError: false};
  static getDerivedStateFromError(error: Error) {
    return {hasError: true};
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error);
    this.props.message && showErrorToast(this.props.message);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
