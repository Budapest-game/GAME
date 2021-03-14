import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import Index from '../../../src/index';

function getPageHtml(bundleHtml:string) {
  const html = renderToStaticMarkup(
        <html>
            <head />
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
  const bundleHtml = renderToString(
    <StaticRouter context={context} location='/'>
      <Index />
    </StaticRouter>,
  );
  return {
    html: getPageHtml(bundleHtml),
  };
};
