const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
// const HappyPack = require('happypack')
// const happyThreadPool = HappyPack.ThreadPool({size: 4})
const merge = require('webpack-merge')
const base = require('./_base.js')
const cwd = process.cwd()

const publicPath = '/'
const getEntry = require('./utils/getEntry.js')
const entryList = getEntry(path.resolve(cwd, 'src/*.js'), 'dev')

const config = {
  entry: entryList,
  output: {
    path: path.join(cwd, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    sourceMapFilename: '[name].map',
    publicPath: publicPath
  },
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {loader: 'style-loader', options: {sourceMap: true}},
          {loader: 'css-loader', options: {sourceMap: true}},
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [
                autoprefixer({
                  browsers: ['android >= 4', '> 5%', 'ios >= 7']
                })
              ]
            }
          },
          {loader: 'sass-loader', options: {sourceMap: true}}

        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}
module.exports = merge(base, config)
