const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@githubApi': path.resolve(__dirname, 'src/github-api'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@model': path.resolve(__dirname, 'src/model'),
      '@util': path.resolve(__dirname, 'src/util'),
    },
  },
  plugins: [
    new CopyPlugin([
      {
        from: '*.json',
        context: 'public',
      },
    ]),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: true,
      appMountId: 'app',
    }),
  ],
};

module.exports = config;
