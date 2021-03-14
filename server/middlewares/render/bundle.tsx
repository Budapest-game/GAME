import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

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
  const bundleHtml = renderToString(
      <span>
         THIS IS SSSSSR
      </span>,
  );
  return {
    html: getPageHtml(bundleHtml),
  };
};
