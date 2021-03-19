import express, { Express } from 'express';
import https from 'https';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.client';
import render from './middlewares/render/render';
import authChecker from './middlewares/authChecker';
import router from './router';

const app: Express = express();
const port = process.env.PORT || 8080;
const compiler = webpack(webpackConfig);
const instance = devMiddleware(compiler, { publicPath: '/static/' });

app.use(instance);
app.use(hotMiddleware(compiler, { path: '/__webpack_hmr' }));
app.use(render);
app.use(authChecker);
app.use(router);

https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../../certificates/server.key')),
  cert: fs.readFileSync(path.join(__dirname, '../../certificates/server.cert')),
}, app).listen(port, () => {
  console.log(`Сервер запущен, порт: ${port}`);
});
