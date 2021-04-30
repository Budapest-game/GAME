import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/store';
import App from './components/app';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import { registerSW } from './registerSW';
import './index.css';

interface ExtWindow extends Window{
  isProd: string;
}
if (typeof window !== 'undefined'
  && (window as unknown as ExtWindow).isProd
  && (window as unknown as ExtWindow).isProd === 'true') {
  registerSW();
}
const store = configureStore();
ReactDOM.hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);

export type ApplicationState = ReturnType<typeof store.getState>;
