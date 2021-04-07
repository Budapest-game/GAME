import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import createRootReducer from './reducers/createRootReducer';

export default (url = '/', isAuthenticated: boolean, user: Express.UserInfo | null) => {
  const history = createMemoryHistory({
    initialEntries: [url],
  });

  const initialState = { auth: { isAuthenticated, user } };

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
