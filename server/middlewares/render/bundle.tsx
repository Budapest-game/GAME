import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';

interface RenderBundleHTML{
  html?:string,
  redirectUrl?:string
}
interface RenderBundleArguments {
  location:string,
}

function getPageHtml(bundleHtml:string) {
  const html = renderToStaticMarkup(
        <html>
            <head/>
            <body>
              <div id="root" dangerouslySetInnerHTML={{ __html: bundleHtml }}/>
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

export default ({ location }:RenderBundleArguments): RenderBundleHTML => {
  const context: StaticRouterContext = {};
  const Index = getAppComponent();
  const bundleHtml = Index(location, context);
  if (context.url) {
    return { redirectUrl: context.url };
  }
  return { html: getPageHtml(bundleHtml) };
};
