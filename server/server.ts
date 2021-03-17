import express, { Express } from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.config';
import render from './middlewares/render/render';
import router from './router';

const app: Express = express();
const port = process.env.PORT || 8080;
const compiler = webpack(webpackConfig);
const instance = devMiddleware(compiler, { publicPath: '/static/' });

app.use(instance);
app.use(hotMiddleware(compiler, { path: '/__webpack_hmr' }));
app.use(render);
app.use(router);

app.listen(port, () => {
  console.log(`Сервер запущен, порт: ${port}`);
});
