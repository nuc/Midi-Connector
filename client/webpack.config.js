const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    publicPath: '/app',
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
      title: 'midi-connector',
      template: path.resolve(__dirname, 'src/index.ejs')
    })
  ]
}

module.exports = config

