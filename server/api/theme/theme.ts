import { Request, Response } from 'express';
import responseCodes from '../responceCodes';
import Theme from '../../database/models/Theme';

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
}
export default new ThemeAPI();
