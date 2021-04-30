import { Router, static as staticRoute } from 'express';
import path from 'path';

export function staticRoutes(router: Router):void {
  router.use('/sw.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../static/sw.js'));
  });
  router.use('/static', staticRoute(path.resolve(__dirname, '../../static')));
}
