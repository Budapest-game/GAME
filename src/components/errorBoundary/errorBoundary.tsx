/* eslint-disable no-unused-vars, no-undef, react/display-name */
/* eslint max-classes-per-file: 'off' */

import React from 'react';

class DefaultFallback extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Something went wrong!
        </h1>
      </div>
    );
  }
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: {
        message: '',
        stack: '',
        name: '',
      },
      errorInfo: {
        componentStack: '',
      },
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const FallbackComponent = this.props.FallbackComponent || DefaultFallback;
    return hasError
      ? <FallbackComponent
          title={error.name}
          componentStack={errorInfo.componentStack}
          errorMessage={error.message}
          stack={error.stack} />
      : <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

// eslint-disable-next-line max-len
export type WithFallback = <P = Record<string, never>>(Component: React.ComponentType<P>, FallbackComponent?: React.ComponentType<any>) => React.ComponentType<P>;

export type ErrorBoundaryFallbackProps = {
  errorMessage: string;
  componentStack: string;
  stack: string;
  title: string;
};

export type ErrorBoundaryProps = {
  FallbackComponent?: React.ComponentType<ErrorBoundaryFallbackProps>;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error: {message: string, stack: string, name: string};
  errorInfo: {componentStack: string};
};
