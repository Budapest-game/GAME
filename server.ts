import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { renderStaticAuthPage } from './src/ssr/renderPage';
// eslint-disable-next-line
const webpackConfig: any = require('./webpack.config.js');

const app = express();
const port = process.env.PORT || 8080;
const compiler = webpack(webpackConfig as any) as any;
const instance = devMiddleware(compiler);

app.use(instance);
app.use(hotMiddleware(compiler, { path: '/__webpack_hmr' }));
app.get('*', (req: any, res: any) => {
  /** SSR for authorization page */
  if (req.url === '/authorization') {
    const html = renderStaticAuthPage();
    res.send(html);
    return;
  }
  /** END SSR for authorization page */

  const stream = compiler.outputFileSystem.createReadStream('static/index.html');
  stream.pipe(res);
});

app.listen(port, () => {
  console.log(`Сервер запущен, порт: ${port}`);
});
