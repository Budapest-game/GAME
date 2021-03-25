import {
  NextFunction, Request, Response, Router,
} from 'express';

const publicRoutes = [
  '/',
  '/game',
  '/leaderboard',
  '/controls-demo',
  '/page404',
  '/page500',
];
const privateRoutes = [
  '/profile',
  '/change-password',
  '/change-data',
  '/forum',
];

const authenticatedRoutes = [
  '/authorization',
  '/registration',
];

export function appRoutes(router: Router): void {
  router.get(publicRoutes, (req: Request, res: Response) => {
    res.renderBundle();
  });
}

export function authenticatedAppRoutes(router: Router): void {
  router.get(authenticatedRoutes, (req: Request, res: Response) => {
    if (req.isAuthenticated) {
      res.redirect('/');
    } else {
      res.renderBundle();
    }
  });
}

export function privateAppRoutes(router: Router): void {
  router.get(privateRoutes, (req: Request, res: Response) => {
    if (req.isAuthenticated) {
      res.renderBundle();
    } else {
      res.redirect('/authorization');
    }
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
