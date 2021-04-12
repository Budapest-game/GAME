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
export function isCommentCreationDataExist(req:Request, res:Response, next:NextFunction):void {
  if (req.body && req.body.topicId && req.body.content) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}
export function isCommentUpdateDataExist(req:Request, res:Response, next:NextFunction):void {
  if (req.params.comment && req.body && (req.body.replyTo || req.body.content)) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}
export function isCommentRemoveDataExist(req:Request, res:Response, next:NextFunction):void {
  if (req.params.topic) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}
export function isReactionCreationDataExist(req:Request, res:Response, next:NextFunction):void {
  if (req.params.comment && req.body && req.body.reactionId) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}
export function isReactionRemoveDataExist(req:Request, res:Response, next:NextFunction):void {
  if (req.params.reaction && req.body && req.body.commentId) {
    next();
    return;
  }
  res.sendStatus(responceCodes.BADREQ);
}
