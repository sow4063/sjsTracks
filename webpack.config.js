const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 8080,
      https: false 
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [`ngtemplate-loader`, `html-loader`]
        },
        {
          test: /(\.css|\.scss)$/,
          use: ExtractTextPlugin.extract({
            use: [
              { loader: `css-loader`, options: { sourceMap: true } },
              { loader: `sass-loader`, options: { sourceMap: true } },
            ]
          })
        },
        {
          test: /\.js$/,
          exclude: `/node_modules/`,
          use: [`ng-annotate-loader`, `babel-loader`]
        },
      ]
    },
    plugins: [
      new CopyWebpackPlugin([ 
        { 
          from: path.resolve( PATHS.app, 'index.html' ) 
        },
        { 
          context: path.resolve( PATHS.app, `img` ),
          from: `**/*`,
          to: path.resolve(PATHS.dist, `img`)
        } 
      ]),
      new ExtractTextPlugin(`[name].css`)
    ]
  };
}


