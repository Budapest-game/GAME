import path from 'path';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';

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
  html: string;
}

export default ():RenderBundleArguments => {
  const context: StaticRouterContext = {};
  const sheet = new ServerStyleSheet();
  console.log(path.join(__dirname, '../../../src/index'));
  const Index = require( '../../../src/index').default;
  console.log(Index);
  const bundleHtml = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
    <StaticRouter context={context} location='/'>
      <Index />
    </StaticRouter>
    </StyleSheetManager>,
  );
  return {
    html: getPageHtml(bundleHtml),
  };
};
