import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  test: /\.css$/i,
  sideEffects: true,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
};
