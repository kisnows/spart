/**
 * Created by kisnows on 2017/2/24.
 */
const glob = require('glob')
const path = require('path')
const cwd = process.cwd()
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (htmlPath, env) {
  const pluginList = []
  const htmlFileList = glob.sync(htmlPath)
  const reg = /src\/(\S+).html$/
  htmlFileList.forEach((v) => {
    const filename = v.match(reg)[1]
    pluginList.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `../../src/${filename}.html`),
        filename: `${filename}.html`,
        hash: false,
        // favicon: path.join(__dirname, '../../src/assets/images/logo.png'),
        include: ['vendors', 'commons', `${filename}`],
        minify: process.env.NODE_ENV !== 'production' ? false : {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          html5: true,
          minifyCSS: true,
          removeComments: true
        }
      })
    )
  })
  return pluginList
}
