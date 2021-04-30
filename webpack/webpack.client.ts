import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';
import webpack from 'webpack';
import { isDev } from './env';
import ts from './loaders/typescript';
import css from './loaders/css';
import assets from './loaders/assets';
import files from './loaders/files';

const config: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',
  entry: [
    isDev && 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './src/index.tsx',
  ].filter(Boolean) as string[],
  module: {
    rules: [
      { ...ts, include: path.resolve(__dirname, '../../src/') },
      css,
      assets,
      files,
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, '../static'),
    library: 'Client',
    libraryTarget: 'var',
    globalObject: 'this',
    filename: 'main.bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    isDev && new ReactRefreshWebpackPlugin(),
    isDev && new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
    new InjectManifest({ swSrc: './sw.ts' }),
  ].filter(Boolean) as webpack.WebpackPluginInstance[],
};
export default config;
