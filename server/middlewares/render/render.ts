import { NextFunction, Request, Response } from 'express';
import renderBundle from './bundle';

export default (req: Request, res: Response, next: NextFunction):void => {
  res.renderBundle = () => {
    const location = req.url;
    const { html, redirectUrl } = renderBundle({ location });

    if (redirectUrl) {
      res.redirect(redirectUrl);
      return;
    }
    res.send(html);
  };
  next();
};
