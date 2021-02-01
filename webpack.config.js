const path = require('path');

module.exports = {
  entry: [
    './src/app.ts',
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
  devServer: {
    contentBase: path.join(__dirname, 'static/'),
    port: 3000,
  },
};
