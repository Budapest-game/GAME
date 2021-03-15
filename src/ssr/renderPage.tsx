import * as React from 'react';
import { StaticRouter } from 'react-router';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import Authorization from '../pages/authorization/authorization';

interface PageHtmlParams {
    bundleHtml: string;
}

function getPageHtml({ bundleHtml }: PageHtmlParams) {
  const html = renderToStaticMarkup(
      <html>
          <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            <title>3 в ряд</title>
          </head>
          <body>
              <div id="root" dangerouslySetInnerHTML={{ __html: bundleHtml }}/>
          </body>
      </html>,
  );

  return `<!doctype html>${html}`;
}

export function renderStaticAuthPage(): string {
  const bundleHtml = renderToString(
    <StaticRouter location='/authorization'>
      <Authorization/>
    </StaticRouter>,
  );
  return getPageHtml({ bundleHtml });
}
