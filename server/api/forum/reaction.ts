import { Request, Response } from 'express';
import responseCodes from '../responceCodes';
import CommentsReactions from '../../database/models/CommentsReactions';

class ReactionApi {
  createReaction(req: Request, res:Response) {
    if (req.user && req.user.id) {
      const { comment } = req.params;
      const { reactionId } = req.body;
      CommentsReactions.create({
        commentId: parseInt(comment, 10),
        reactionId,
        userId: req.user.id,
      }).then(() => {
        res.sendStatus(responseCodes.OK);
      }).catch(() => {
        res.sendStatus(responseCodes.ERROR);
      });
    } else {
      res.sendStatus(responseCodes.UNAUTH);
    }
  }

  removeReaction(req: Request, res:Response) {
    if (req.user && req.user.id) {
      const { reaction } = req.params;
      const { commentId } = req.body;
      CommentsReactions.destroy({
        where: {
          reactionId: parseInt(reaction, 10),
          commentId,
          userId: req.user.id,
        },
      }).then(() => {
        res.sendStatus(responseCodes.OK);
      }).catch(() => {
        res.sendStatus(responseCodes.ERROR);
      });
    }
  }
}
export default new ReactionApi();
