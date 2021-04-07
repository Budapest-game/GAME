import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export type AdvancedRoute = {
  redirectTo: string,
} & RouteProps;

type RedirectRouteProps = {
  redirectTo: string,
  redirectFlag: boolean
} & RouteProps;

export default function RedirectRoute({
  component: Component,
  redirectTo, redirectFlag, ...rest
}:RedirectRouteProps):JSX.Element | null {
  if (!Component) return null;
  return (
    <Route {...rest} render={(props) => {
      return (
        redirectFlag
          ? <Component {...props} />
          : <Redirect to={redirectTo} />
      );
    }} />
  );
}
