import React from 'react';
import { Store } from 'redux';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import serialize from 'serialize-javascript';
import configureStore from '../../../src/store/server-store';
import UserTheme from '../../database/models/UserTheme';
import Theme from '../../database/models/Theme';

interface RenderBundleHTML {
  html?: string,
  redirectUrl?: string
}
interface RenderBundleArguments {
  location: string,
  isAuthenticated: boolean,
  user: Express.UserInfo | undefined,
}

const renderObject = (data: unknown) => {
  return serialize(data).replace(/</g, '\\\u003c');
};

function getPageHtml(bundleHtml: string, store: Store) {
  const html = renderToStaticMarkup(
        <html>
            <head>
              <link rel="stylesheet" href="/static/main.bundle.css"/>
            </head>
            <body>
              <div id="root" dangerouslySetInnerHTML={{ __html: bundleHtml }}/>
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.__PRELOADED_STATE__ = ${renderObject(store.getState())}`,
                }}
              />
              <script src="/static/main.bundle.js"/>
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
async function getUserTheme(user: Express.UserInfo | undefined) {
  if (user) {
    try {
      const res = await UserTheme.findOne({
        where: { userId: user.id },
        include: [Theme],
      });
      if (res && res.theme.theme) return res.theme.theme;
      return '';
    } catch {
      return '';
    }
  } else {
    return '';
  }
}

export default async ({
  location,
  isAuthenticated,
  user,
}: RenderBundleArguments): Promise<RenderBundleHTML> => {
  const theme = await getUserTheme(user);
  const { store } = configureStore(location, isAuthenticated, user, theme);
  const context: StaticRouterContext = {};
  const Index = getAppComponent();
  const bundleHtml = Index(location, context, store);
  if (context.url) {
    return { redirectUrl: context.url };
  }
  return { html: getPageHtml(bundleHtml, store) };
};
