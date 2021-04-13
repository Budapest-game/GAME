import { Request, Response } from 'express';
import responseCodes from '../responceCodes';
import Comment from '../../database/models/Comment';

interface CommentUpdateData {
  content?: string,
  replyTo?: number,
}

class CommentApi {
  createComment(req: Request, res:Response) {
    if (req.user && req.user.id) {
      const { topicId, content, replyTo } = req.body;
      Comment.create({
        topicId,
        content,
        userId: req.user.id,
        replyTo,
      }).then(() => {
        res.sendStatus(responseCodes.OK);
      }).catch(() => {
        res.sendStatus(responseCodes.ERROR);
      });
    } else {
      res.sendStatus(responseCodes.UNAUTH);
    }
  }

  updateComment(req: Request, res:Response) {
    if (req.user && req.user.id) {
      const { comment } = req.params;
      const { content, replyTo } = req.body;
      const upd:CommentUpdateData = {};
      if (typeof content === 'string') upd.content = content;
      if (typeof replyTo === 'number') upd.replyTo = replyTo;
      Comment.update(upd, {
        where: {
          commentId: parseInt(comment, 10),
          userId: req.user.id,
        },
      }).then(() => {
        res.sendStatus(responseCodes.OK);
      }).catch(() => {
        res.sendStatus(responseCodes.ERROR);
      });
    } else {
      res.sendStatus(responseCodes.UNAUTH);
    }
  }

  removeComment(req: Request, res:Response) {
    if (req.user && req.user.id) {
      const { comment } = req.params;
      Comment.destroy({
        where: {
          commentId: parseInt(comment, 10),
          userId: req.user.id,
        },
      }).then(() => {
        res.sendStatus(responseCodes.OK);
      }).catch(() => {
        res.sendStatus(responseCodes.ERROR);
      });
    } else {
      res.sendStatus(responseCodes.UNAUTH);
    }
  }
}
export default new CommentApi();
