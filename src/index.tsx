import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/store';
import App from './components/app/app';
import { ErrorBoundary } from './components/errorBoundary/errorBoundary';
import './index.css';
// TODO Добавить условие на включение sw в prod
// import { registerSW } from './registerSW';
// registerSW();

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
