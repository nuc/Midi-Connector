const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app-bundle.js',
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]'
  },
  resolve: {
    extensions: ['.js', '.json', '.styl', '.css']
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Image poster',
      template: path.resolve(__dirname, 'src/index.ejs')
    })
  ]
}

module.exports = config

