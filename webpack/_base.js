const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
// 代码分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const cwd = process.cwd()

const publicPath = '/'

const getInjectJS = require('./utils/getInjectJS.js')

const htmlPluginList = require('./utils/getHtml')(path.resolve(cwd, 'src/*.html'), 'dev')
const AssetInjectHtmlPlugin = require('asset-inject-html-webpack-plugin')

const injectConfig = {
  texts: getInjectJS([
    'rem'
  ])
}

const plugins = [
  // 代码分析
  // new BundleAnalyzerPlugin(),
  new webpack.ProvidePlugin({
    fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
  }),
  new AssetInjectHtmlPlugin(injectConfig)

].concat(htmlPluginList)

module.exports = {
  output: {
    path: path.join(cwd, 'dist'),
    filename: '[name]-[chunkhash:8].js',
    chunkFilename: '[name]-[chunkhash:8].js',
    sourceMapFilename: '[name].map',
    publicPath: publicPath
  },
  resolve: {
    mainFields: ['jsnext:main', 'main'],
    extensions: ['.js', '.jsx', '.json', '.web.js', '.css', '.scss'],
    modules: [path.join(cwd, 'src'), 'node_modules'],
    alias: {
      utils: path.resolve(cwd, 'src/utils'),
      font: path.resolve(cwd, 'src/assets/font')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'images/[path][name]-[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.(ttf|woff|woff|eot|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'font/[path][name]-[hash:8].[ext]'
          }
        }
      }, {
        test: /\.html$/,
        use: [{
          loader: 'raw-loader'
        }]
      }
    ]
  },
  context: cwd,
  plugins: plugins
}
