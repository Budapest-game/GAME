import { Router, static as staticRoute } from 'express';
import path from 'path';

export function staticRoutes(router: Router):void {
  router.use('/static', staticRoute(path.join(__dirname, '..', 'static')));
}
