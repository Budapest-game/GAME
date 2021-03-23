import { Router } from 'express';
import { appRoutes, notFoundRoute, errorHandlerRoute } from './app';
import { staticRoutes } from './static';

const router: Router = Router();

appRoutes(router);
staticRoutes(router);
notFoundRoute(router);
errorHandlerRoute(router);

export default router;
