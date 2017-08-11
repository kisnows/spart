const glob = require('glob')
const path = require('path')
const cwd = process.cwd()

const BootstrapPublicPath = path.join(cwd, 'webpack/utils/bootstrapPublicPath.js')
module.exports = function (path, env) {
  const entrys = {}
  const entryFiles = glob.sync(path)
  const reg = /src\/(\S+).js$/

  /**
   * get entryCopy name from path
   * 'C:/Users/kisnows/Project/Loan-SY/src/index.js'.match(/\s?\/(\w+).js$/)
   * [ '/index.js',  'index',  index: 36,  input: 'C:/Users/kisnows/Project/Loan-SY/src/index.js' ]
   */

  if (env === 'dev') {
    entryFiles.forEach((v, k) => {
      const entry = v.match(reg)[1]

      // 添加 bootstrap-public-path.js 是为了解决 css background-image 引用图片时
      // 相对路径会出错的原因
      entrys[entry] = ['webpack-hot-middleware/client?noInfo=true', BootstrapPublicPath, 'react-hot-loader/patch', v]
    })
  } else {
    entryFiles.forEach((v, k) => {
      const entry = v.match(reg)[1]
      entrys[entry] = [v]
    })
  }
  return entrys
}
