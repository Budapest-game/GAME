import React, { Component, Fragment, ComponentType } from 'react';
import DefaultFallback from './defaultFallback';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
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

  static getDerivedStateFromError(): StateFromError {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
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
      : <Fragment>{this.props.children}</Fragment>;
  }
}

export type StateFromError = {
  hasError: boolean;
}

export type ErrorBoundaryFallbackProps = {
  errorMessage: string;
  componentStack: string;
  stack: string;
  title: string;
};

export type ErrorBoundaryProps = {
  FallbackComponent?: ComponentType<ErrorBoundaryFallbackProps>;
};

export type Error = {
  message: string,
  stack: string,
  name: string;
}

export type ErrorInfo = {
  componentStack: string;
}

export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error;
  errorInfo: ErrorInfo;
};
