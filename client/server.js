const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')

const HOST = 'localhost'
const PORT = '8080'

new WebpackDevServer(webpack(webpackConfig), {
  hot: true,
  historyApiFallback: true,
  overlay: false,
  stats: {
    hash: false,
    cached: false,
    cachedAssets: false,
    colors: true
  }
}).listen(PORT, HOST, err => {
  if (err) {
    console.log(err)
  }
  console.log(`🚀  Launched under http://${HOST}:${PORT}/\n`)
})

