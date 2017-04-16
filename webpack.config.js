const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const path = require('path');
const data = {
  title: 'Something',
  routes: [
    '/'
  ]
};

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

module.exports = function createConfig() {

  const config = {
    entry: './src/index.js',

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      libraryTarget: 'umd'
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          }),
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          loader: 'file-loader'
        },
        {
          test: /\.html$/,
          use: 'raw-loader'
        }
      ]
    },

    plugins: [
      new CopyWebpackPlugin([{
        from: path.resolve(__dirname, 'src/public')
      }]),
      new ExtractTextPlugin('styles.css'),
      new HtmlWebpackPlugin({
        template: './src/public/index.html'
      })
    ]
  };

  if (isProd) {
    config.plugins.push(
      // new StaticSiteGeneratorPlugin('bundle.js', data.routes, data)
    );
  }

  return config;
};
