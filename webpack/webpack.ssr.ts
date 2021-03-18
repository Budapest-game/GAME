import path from 'path';
import webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'development',
  entry: [
    './server/src/index.tsx',
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, '../../src/tsconfig_client.json'),
          },
        },
      },
      {
        test: /\.css$/i,
        sideEffects: true,
        use: ['null-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
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
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
export default config;
