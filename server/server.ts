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
import Topic from './database/models/Topic';
import Comment from './database/models/Comment';
import Reaction from './database/models/Reaction';
import CommentsReactions from './database/models/CommentsReactions';

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

async function testCRUD() {
  await sequelize.sync();
  // Данные для теста
  // await Topic.create({
  //   name: 'Тест',
  //   content: 'Контент',
  //   userId: 1,
  // });
  // await Comment.create({
  //   topicId: 1,
  //   content: 'Коммент',
  //   userId: 2,
  //   replyTo: null,
  // });
  // await Comment.create({
  //   topicId: 1,
  //   content: 'Коммент 2',
  //   userId: 2,
  //   replyTo: null,
  // });
  // await Comment.create({
  //   topicId: 1,
  //   content: 'Реплай 2',
  //   userId: 2,
  //   replyTo: 1,
  // });
  // await Reaction.create({
  //   reactionType: 'thumbsup',
  //   userId: 3,
  // });
  // await Reaction.create({
  //   reactionType: 'thumbsdown',
  //   userId: 3,
  // });
  // await CommentsReactions.create({
  //   commentId: 1,
  //   reactionId: 1,
  // });
  // await CommentsReactions.create({
  //   commentId: 1,
  //   reactionId: 2,
  // });
  // await CommentsReactions.findAll({
  //   include: [{
  //     model: Reaction,
  //   }],
  // });
  const topics = await Topic.findAll({
    include: [{
      model: Comment,
      include: [
        {
          model: Reaction,
          as: 'reactions',
        },
        {
          model: Comment,
          as: 'replies',
        },
      ],
    }],
    raw: true,
  });
  // console.log(topics);
}

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
