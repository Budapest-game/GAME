import { Request, Response, NextFunction } from 'express';
import responceCodes from '../api/responceCodes';

export default (req: Request, res: Response, next: NextFunction):void => {
  if (req.isAuthenticated) {
    next();
    return;
  }
  res.sendStatus(responceCodes.UNAUTH);
};
