import {
  NextFunction, Request, Response, Router,
} from 'express';

const routes = [
  '/',
  '/authorization',
  '/registration',
  '/game',
  '/forum',
  '/leaderboard',
  '/profile',
  '/change-password',
  '/change-data',
  '/controls-demo',
  '/page404',
  '/page500',
];

export function appRoutes(router: Router): void {
  router.get(routes, (req: Request, res: Response) => {
    res.renderBundle();
  });
}

export function notFoundRoute(router: Router): void {
  router.get('*', (req: Request, res: Response) => {
    res.redirect('/page404');
  });
}

export function errorHandlerRoute(router: Router): void {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.redirect('/page500');
  });
}
