import { NextFunction, Request, Response } from 'express';
import renderBundle from './bundle';

export default (req: Request, res: Response, next: NextFunction):void => {
  res.renderBundle = () => {
    const location = req.url;
    const { isAuthenticated, user } = req;
    renderBundle({ location, isAuthenticated, user }).then((info) => {
      const { html, redirectUrl } = info;

      if (redirectUrl) {
        res.redirect(redirectUrl);
        return;
      }
      res.send(html);
    });
  };
  next();
};
