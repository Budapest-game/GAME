import { Request, Response, Router } from 'express';

const routes = ['/', '/authorization', '/registration', '/game',
  '/forum', '/leaderboard', '/profile', '/change-password',
  '/change-data',
  '/controls-demo',
];
export function appRoutes(router: Router):void {
  router.get(routes, (req: Request, res: Response) => {
    res.renderBundle();
  });
}
