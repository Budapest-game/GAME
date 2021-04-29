import { Request, Response } from 'express';
import responseCodes from '../responceCodes';
import Theme from '../../database/models/Theme';
import UserTheme from '../../database/models/UserTheme';

class ThemeAPI {
  getTheme(req: Request, res: Response) {
    const { name } = req.params;
    Theme.findOne({
      where: { id: name },
    }).then((data) => {
      if (!data) {
        res.json({ theme: '' });
      } else {
        res.json(data);
      }
    }).catch(() => {
      res.sendStatus(responseCodes.ERROR);
    });
  }

  setThemeForUser(req: Request, res: Response) {
    if (req.user && req.user.id) {
      const { id } = req.user;
      const { name } = req.params;
      UserTheme.upsert({
        userId: id,
        themeId: name,
      }).then(() => {
        res.sendStatus(responseCodes.OK);
      }).catch(() => {
        res.sendStatus(responseCodes.ERROR);
      });
    } else {
      res.sendStatus(responseCodes.ERROR);
    }
  }

  getUserTheme(req: Request, res: Response) {
    if (req.user && req.user.id) {
      const { id } = req.user;
      UserTheme.findOne({
        where: { userId: id },
        include: [Theme],
      }).then((data) => {
        res.json(data);
      }).catch(() => {
        res.sendStatus(responseCodes.ERROR);
      });
    } else {
      res.sendStatus(responseCodes.ERROR);
    }
  }
}
export default new ThemeAPI();
