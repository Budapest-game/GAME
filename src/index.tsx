import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './components/app/app';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);
