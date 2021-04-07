import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/store';
import App from './components/app/app';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import './index.css';

const store = configureStore();
ReactDOM.hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ErrorBoundary>
          <App/>
        </ErrorBoundary>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);

export type ApplicationState = ReturnType<typeof store.getState>;
