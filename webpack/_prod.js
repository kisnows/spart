const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const merge = require('webpack-merge')
const base = require('./_base.js')
const cwd = process.cwd()

const cndConfig = require('../config')
const publicPath = `//${cndConfig.cdnHost}${cndConfig.cdnPath}`

const getEntry = require('./utils/getEntry.js')
const entrys = getEntry(path.resolve(cwd, 'src/*.js'), 'prod')

entrys['vendors'] = [
  'babel-polyfill', 'react-hot-loader/patch', 'react', 'react-dom',
  'redux', 'redux-actions', 'redux-thunk',
  'react-redux', 'react-router', 'react-router-redux',
  'classnames'
]

const config = {
  entry: entrys,
  output: {
    path: path.join(cwd, 'dist'),
    filename: '[name]-[chunkhash:8].js',
    chunkFilename: '[name]-[chunkhash:8].js',
    sourceMapFilename: '[name].map',
    publicPath: publicPath
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?minimize=true',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer({
                    browsers: ['Android 4', 'last 5 versions', '> 5%', 'iOS 7']
                  })
                ]
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors', 'manifest'] // Specify the common bundle's name.
    }),
    new ExtractTextPlugin({
      filename: 'css/[name]-[contenthash:8].css'
      // 是否从所有追加的 chunk 中提取样式文件
      // allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
        // 不要去修改函数的名称
      },
      compress: {
        screw_ie8: true,
        // 压缩选项，去掉对 ie8 的支持
        warnings: false,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
module.exports = merge(base, config)
