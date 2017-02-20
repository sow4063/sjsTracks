const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  app: path.resolve(__dirname, 'client', 'app'),
  dist: path.resolve(__dirname, 'dist')
}

module.exports = env => {
  return {
    entry: {
      app: path.resolve(PATHS.app, 'root.module.js')
    },
    output: {
      path: PATHS.dist,
      filename: `[name].js`
    },
    module: {
      rules: [
        {
          test: /\.js/,
          use: `babel-loader`
        }
      ]
    },
    plugins: [
       new CopyWebpackPlugin([
         {from: path.resolve( PATHS.app, 'index.html' )}
      ])
    ]
  };
}


