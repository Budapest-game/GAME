import { Request, Response } from 'express';
import responseCodes from '../responceCodes';
import Topic from '../../database/models/Topic';
import Comment from '../../database/models/Comment';
import Reaction from '../../database/models/Reaction';

interface TopicUpdateData{
  name?: string,
  content?: string
}

class TopicAPI {
  createTopic(req: Request, res:Response) {
    if (req.user && req.user.id) {
      const { name, content } = req.body;
      Topic.create({
        name,
        content,
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

  deleteTopic(req: Request, res:Response) {
    if (req.user && req.user.id) {
      const { topic } = req.params;
      Topic.destroy({
        where: {
          topicId: parseInt(topic, 10),
          userId: req.user.id,
        },
      }).then(() => {
        res.sendStatus(responseCodes.OK);
      }).catch(() => {
        res.sendStatus(responseCodes.ERROR);
      });
    }
  }

  getTopic(req: Request, res:Response) {
    const { topic } = req.params;
    Topic.findOne({
      where: { topicId: parseInt(topic, 10) },
      include: [{
        model: Comment,
        include: [
          {
            model: Comment,
            as: 'replies',
          },
          {
            model: Reaction,
            as: 'reactions',
          },
        ],
      }],
    }).then((data) => {
      res.json(data);
    }).catch((err) => {
      console.log(err);
      res.sendStatus(responseCodes.ERROR);
    });
  }

  getAllTopics(req: Request, res:Response) {
    Topic.findAll({
      include: [{
        model: Comment,
        include: [
          {
            model: Comment,
            as: 'replies',
          },
        ],
      }],
    }).then((data) => {
      res.json(data);
    }).catch(() => {
      res.sendStatus(responseCodes.ERROR);
    });
  }

  updateTopic(req: Request, res: Response) {
    if (req.user && req.user.id) {
      const { topic } = req.params;
      const { name, content } = req.body;
      const upd:TopicUpdateData = {};

      if (typeof name === 'string') upd.name = name;
      if (typeof content === 'string') upd.content = content;

      Topic.update(
        upd,
        {
          where: {
            topicId: parseInt(topic, 10),
            userId: req.user.id,
          },
        },
      ).then(() => {
        res.sendStatus(responseCodes.OK);
      }).catch(() => {
        res.sendStatus(responseCodes.ERROR);
      });
    } else {
      res.sendStatus(responseCodes.UNAUTH);
    }
  }
}
export default new TopicAPI();
