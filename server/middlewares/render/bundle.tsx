import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

function getPageHtml(bundleHtml:string) {
  const html = renderToStaticMarkup(
        <html>
            <head>
             <link rel="stylesheet" href="static/main.css"/>
            </head>
            <body>
              <div id="root" dangerouslySetInnerHTML={{ __html: bundleHtml }}/>
            </body>
        </html>,
  );

  return `<!doctype html>${html}`;
}

interface RenderBundleArguments {
  location:string
}
interface RenderBundleHTML{
  html?:string,
  redirectUrl?:string
}

export default ({ location }:RenderBundleArguments): RenderBundleHTML => {
  const context: StaticRouterContext = {};
  const sheet = new ServerStyleSheet();
  const Authorization = require( '../../../src/pages/authorization/authorization').default;
  const bundleHtml = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
    <StaticRouter context={context} location={location}>
      <Authorization />
    </StaticRouter>
    </StyleSheetManager>,
  );
  if (context.url) {
    return { redirectUrl: context.url };
  }
  return { html: getPageHtml(bundleHtml) };
};
