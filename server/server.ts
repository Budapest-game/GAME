import express, {
  Express, Request, Response, Router, static as staticRoute,
} from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import render from './middlewares/render/render';

const app: Express = express();
const port = process.env.PORT || 8080;
const compiler = webpack(webpackConfig);
const instance = devMiddleware(compiler);

//const router = Router();
// router.use('/static', staticRoute('dist'));

app.use(instance);
app.use(hotMiddleware(compiler, { path: '/__webpack_hmr' }));
app.use(render);
// app.use(router);
app.get('/static/main.css', (req, res) => {
  const fs = compiler.outputFileSystem;
  fs.readFile('/main.css', (err, result) => {
    if (!err) {
      res.set('content-type', 'text/css');
      res.send(result);
      res.end();
    } else {
      console.log(err);
      res.end('error');
    }
  });
});
app.get('/', (req: Request, res: Response) => {
  res.renderBundle('kek');
  // const fs = compiler.outputFileSystem;
  // fs.readFile('static/index.html', (err, result) => {
  //   if (!err) {
  //     res.set('content-type', 'text/html');
  //     res.send(result);
  //     res.end();
  //   } else {
  //     res.end('error');
  //   }
  // });
});

app.listen(port, () => {
  console.log(`Сервер запущен, порт: ${port}`);
});
