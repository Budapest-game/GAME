const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = {
  entry: [
    './src/index.tsx',
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        },
        include: path.resolve(__dirname, 'src/'),
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
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
    path: path.resolve(__dirname, 'static/'),
    filename: 'main.bundle.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './www/index.html',
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      update: true,
      fileTypes: ['js', 'jpg', 'png', 'html', 'css'],
      includeAllFileTypes: false,
      removeFullPathAutoPrefix: true,
    }),
  ],
};
