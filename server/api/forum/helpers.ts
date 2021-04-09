import { Request, Response, NextFunction } from 'express';
import responceCodes from '../responceCodes';

export function checkTopicCreationData(req:Request, res:Response, next:NextFunction):void {
  if (req.body && req.body.name && req.body.content) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}

export function checkTopicDeletionData(req:Request, res:Response, next:NextFunction):void {
  if (req.params.topic) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}

export function checkTopicGetData(req:Request, res:Response, next:NextFunction):void {
  if (req.params.topic) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}
export function checkTopicUpdateData(req:Request, res:Response, next:NextFunction):void {
  if (req.params.topic && req.body && (req.body.name || req.body.content)) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}
