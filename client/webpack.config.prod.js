const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const config = {
  devtool: '',
  entry: [
    'babel-polyfill',
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new HtmlWebpackPlugin({
      title: 'midi-connector',
      template: path.resolve(__dirname, 'src/index.ejs')
    })
  ]
}

module.exports = config


