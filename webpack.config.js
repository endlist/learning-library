const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

module.exports = function createConfig() {

  const config = {
    entry: './src/index.js',

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      publicPath: isProd ? '/learning-library/' : 'http://localhost:8080/',
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
        template: './src/index.html'
      })
    ]
  };

  return config;
};
