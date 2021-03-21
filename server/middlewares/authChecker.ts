import fetch from 'node-fetch';
import { Request, Response, NextFunction } from 'express';
import { BASE_API_URL } from '../../src/api/constants';

export default async (req: Request, res:Response, next:NextFunction): Promise<void> => {
  req.isAuthenticated = false;
  req.user = null;
  if (req.headers.cookie) {
    const resp = await fetch(`${BASE_API_URL}/auth/user`, { headers: { cookie: req.headers.cookie } });
    if (resp.status === 200) {
      try {
        const userData = await resp.json();
        req.user = userData;
        req.isAuthenticated = true;
      } catch (e) {
        console.log(`Ошибка при разборе ответа из API ${e}`);
      }
    }
  }
  next();
};
