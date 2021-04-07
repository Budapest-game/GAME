import path from 'path';
import webpack from 'webpack';
import { isDev } from './env';
import ts from './loaders/typescript';
import css from './loaders/css';
import assets from './loaders/assets';
import files from './loaders/files';

const config: webpack.Configuration = {
  mode: isDev ? 'development' : 'production',
  entry: [
    './server/src/index.tsx',
  ],
  module: {
    rules: [
      ts,
      { ...css, use: ['null-loader'] },
      assets,
      { ...files, use: ['null-loader'] },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, '../ssr'),
    libraryTarget: 'commonjs2',
    filename: 'ssr.js',
    publicPath: '/static/',
  },
};
export default config;
