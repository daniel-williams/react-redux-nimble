const helpers = require('./helpers');
const webpack = require('webpack');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = function (options) {
  let ENV = JSON.stringify(options.env);

  return {
    entry: {
      'app': './src/app.jsx',
      'polyfills': './src/polyfills.js',
      'vendor': './src/vendor.js',
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new DefinePlugin({
        'ENV': ENV,
        'process.env.ENV': ENV,
        'process.env.NODE_ENV': ENV,
      }),
      new CommonsChunkPlugin({
        names: ['app', 'vendor', 'polyfills'],
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body',
        favicon: 'client/assets/images/favicon.png',
        showErrors: true
      }),
    ],
  };
};
