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
import sequelize from './database/db';
import User from './database/models/User';

const { PORT = 5000, NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';
const app: Express = express();

if (isDev) {
  const compiler = webpack(webpackConfig);
  const instance = devMiddleware(compiler, { publicPath: '/static/' });
  app.use(instance);
  app.use(hotMiddleware(compiler, { path: '/__webpack_hmr' }));
}

app.use(authChecker);
app.use(render);
app.use(router);

if (isDev) {
  https.createServer({
    key: fs.readFileSync(path.join(__dirname, '../../certificates/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '../../certificates/server.cert')),
  }, app).listen(PORT, () => {
    console.log(`dev-сервер запущен, порт: ${PORT}`);
    testCRUD();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Сервер запущен, порт: ${PORT}`);
    testCRUD();
  });
}
// Пример работы sequelize
async function testCRUD() {
  await sequelize.sync();
  await User.sync();
  await User.create({ id: 1 });
  const user = await User.findOne({
    where: {
      id: 1,
    },
  });
  console.log('sequelize findOne result', user);
}
