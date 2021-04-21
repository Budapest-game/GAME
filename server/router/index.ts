import { Router } from 'express';
import ForumAPIRoutes from '../api/forum/router';
import ThemeAPIRoutes from '../api/theme/router';
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
ForumAPIRoutes(router);
ThemeAPIRoutes(router);
notFoundRoute(router);
errorHandlerRoute(router);

export default router;
