import { Router } from 'express';
import {
  appRoutes, privateAppRoutes, authenticatedAppRoutes,
  notFoundRoute, errorHandlerRoute,
} from './app';
import { staticRoutes } from './static';

const router: Router = Router();

appRoutes(router);
authenticatedAppRoutes(router);
privateAppRoutes(router);
staticRoutes(router);
notFoundRoute(router);
errorHandlerRoute(router);

export default router;
