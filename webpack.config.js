const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index.tsx',
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: {
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, 'tsconfig.json'),
        },
      },
      include: path.resolve(__dirname, 'src/'),
    },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'static/js/'),
    filename: 'main.bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './www/index.html',
    }),
  ],
};
