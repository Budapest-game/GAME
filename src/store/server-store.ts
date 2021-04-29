import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import createRootReducer from './reducers';
import { ThemeResponse } from '../api/types';

export default (url = '/', isAuthenticated: boolean, user: Express.UserInfo | undefined, theme: ThemeResponse) => {
  const history = createMemoryHistory({
    initialEntries: [url],
  });

  const initialState = { authorisation: { isAuthenticated, user }, theme };

  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunk,
      ),
    ),
  );
  return {
    store,
    history,
  };
};
