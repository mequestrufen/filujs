const path = require('path');

module.exports = {
  entry: './src/filu.js',
  output: {
    filename: 'filu.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'eval-source-map'
};