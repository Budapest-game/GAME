import path from 'path';

export default {
  test: /\.tsx?$/,
  use: {
    loader: 'ts-loader',
    options: {
      configFile: path.resolve(__dirname, '../../../src/tsconfig_client.json'),
    },
  },
};
