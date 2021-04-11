import { Request, Response, NextFunction } from 'express';
import responceCodes from '../responceCodes';

export function isTopicCreationDataExist(req:Request, res:Response, next:NextFunction):void {
  if (req.body && req.body.name && req.body.content) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}

export function isTopicDeletionDataExist(req:Request, res:Response, next:NextFunction):void {
  if (req.params.topic) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}

export function isTopicGetDataExist(req:Request, res:Response, next:NextFunction):void {
  if (req.params.topic) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}
export function istTopicUpdateDataExist(req:Request, res:Response, next:NextFunction):void {
  if (req.params.topic && req.body && (req.body.name || req.body.content)) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}
