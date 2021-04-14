import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';

export const history = createBrowserHistory();
export default function configureStore() {
  // eslint-disable-next-line no-underscore-dangle
  const preloadedState = window.__PRELOADED_STATE__ || {};

  // eslint-disable-next-line no-underscore-dangle
  delete window.__PRELOADED_STATE__;

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
      ),
    ),
  );

  return store;
}
