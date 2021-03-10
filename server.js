const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const port = process.env.PORT || 8080;
const compiler = webpack(webpackConfig);
const instance = devMiddleware(compiler);

app.use(instance);
app.use(hotMiddleware(compiler, { path: '/__webpack_hmr' }));
app.get('*', (req, res) => {
  const stream = compiler.outputFileSystem.createReadStream('static/index.html');
  stream.pipe(res);
});

app.listen(port, () => {
  console.log(`Сервер запущен, порт: ${port}`);
});
