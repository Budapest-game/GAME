import { NextFunction, Request, Response } from 'express';
import renderBundle from './bundle';

export default (req: Request, res: Response, next: NextFunction):void => {
  res.renderBundle = () => {
    const { html } = renderBundle();
    res.send(html);
  };
  next();
};
