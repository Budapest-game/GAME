import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import App from '../../src/components/app/app';

export function renderAppToString(
  location: string,
  context: StaticRouterContext,
  store: Store,
): string {
  return renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={location}>
        <App/>
      </StaticRouter>
    </Provider>,
  );
}
