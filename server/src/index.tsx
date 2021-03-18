import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import App from '../../src/components/app/app';

export function Index(location:string, context:StaticRouterContext):string {
  return renderToString(
    <StaticRouter context={context} location={location}>
        <App/>
    </StaticRouter>,
  );
}
