export default {
  test: /\.css$/i,
  sideEffects: true,
  use: ['style-loader', 'css-loader', 'postcss-loader'],
};
