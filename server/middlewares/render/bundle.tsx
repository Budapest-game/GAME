import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

function getPageHtml(bundleHtml:string) {
  const html = renderToStaticMarkup(
        <html>
            <head>
             <link rel="stylesheet" href="static/main.bundle.css"/>
            </head>
            <body>
              <div id="root" dangerouslySetInnerHTML={{ __html: bundleHtml }}/>
              <script src="static/main.bundle.js"/>
              <script
                    dangerouslySetInnerHTML={{
                      __html: 'Client.Index();',
                    }}
                />
            </body>
        </html>,
  );

  return `<!doctype html>${html}`;
}
interface RenderBundleArguments {
  location:string,
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function getAppComponent() {
// eslint-disable-next-line global-require, import/no-unresolved, @typescript-eslint/no-var-requires
  const app = require('../../../static/main.bundle').Application;
  return app;
}

interface RenderBundleHTML{
  html?:string,
  redirectUrl?:string
}

export default ({ location }:RenderBundleArguments): RenderBundleHTML => {
  const context: StaticRouterContext = {};
  const sheet = new ServerStyleSheet();
  const bundleHtml = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <StaticRouter context={context} location={location}>
        getAppComponent();
      </StaticRouter>
    </StyleSheetManager>,
  );
  if (context.url) {
    return { redirectUrl: context.url };
  }
  return { html: getPageHtml(bundleHtml) };
};
