import express, { Express, Request, Response } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

const app: Express = express();
const port = process.env.PORT || 8080;
const compiler = webpack(webpackConfig);
const instance = devMiddleware(compiler);

app.use(instance);
app.use(hotMiddleware(compiler, { path: '/__webpack_hmr' }));
app.get('*', (req: Request, res: Response) => {
  const fs = compiler.outputFileSystem;
  fs.readFile('static/index.html', (err, result) => {
    if (!err) {
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    } else {
      res.end('error');
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен, порт: ${port}`);
});
