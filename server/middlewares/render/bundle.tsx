import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';

function getPageHtml(bundleHtml:string) {
  const html = renderToStaticMarkup(
        <html>
            <head/>
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
  const { Index } = require('../../../ssr/ssr');
  return Index;
}

interface RenderBundleHTML{
  html?:string,
  redirectUrl?:string
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
