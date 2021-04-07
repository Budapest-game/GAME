import React from 'react';
import { Store } from 'redux';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import serialize from 'serialize-javascript';
import configureStore from '../../../src/store/server-store';

interface RenderBundleHTML {
  html?: string,
  redirectUrl?: string
}
interface RenderBundleArguments {
  location: string,
  isAuthenticated: boolean,
  user: Express.UserInfo | null,
}

const renderObject = (data: unknown) => {
  return serialize(data).replace(/</g, '\\\u003c');
};

function getPageHtml(bundleHtml: string, store: Store) {
  const html = renderToStaticMarkup(
        <html>
            <head/>
            <body>
              <div id="root" dangerouslySetInnerHTML={{ __html: bundleHtml }}/>
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.__PRELOADED_STATE__ = ${renderObject(store.getState())}`,
                }}
              />
              <script src="static/main.bundle.js"/>
            </body>
        </html>,
  );

  return `<!doctype html>${html}`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function getAppComponent() {
// eslint-disable-next-line global-require, import/no-unresolved, @typescript-eslint/no-var-requires
  const { renderAppToString } = require('../../../ssr/ssr');
  return renderAppToString;
}

export default ({ location, isAuthenticated, user }: RenderBundleArguments): RenderBundleHTML => {
  const { store } = configureStore(location, isAuthenticated, user);
  const context: StaticRouterContext = {};
  const Index = getAppComponent();
  const bundleHtml = Index(location, context, store);
  if (context.url) {
    return { redirectUrl: context.url };
  }
  return { html: getPageHtml(bundleHtml, store) };
};
