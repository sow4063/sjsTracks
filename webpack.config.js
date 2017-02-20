const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  app: path.resolve(__dirname, 'client', 'app'),
  dist: path.resolve(__dirname, 'dist')
}

module.exports = env => {
  return {
    entry: {
      app: path.resolve(PATHS.app, 'root.component.js')
    },
    output: {
      path: PATHS.dist,
      filename: `[name].js`
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: `/node_modules/`,
          use: `babel-loader`
        },
        {
          test: /\.html$/,
          use: [`ngtemplate-loader`, `html-loader`]
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


