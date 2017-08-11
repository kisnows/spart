const fs = require('fs')
const path = require('path')
const Uglify = require('uglify-js')

function getInjectJS(jsNames, minify) {
  const files = {}

  jsNames.forEach(function (name) {
    const filepath = path.join(__dirname, '../../src/inject/js', name + '.js')
    let code = files[name] = fs.readFileSync(filepath, { encoding: 'UTF-8' })
    if (minify) {
      code = Uglify.minify(code).code
    }
    files[name] = code
  })
  return files
}

module.exports = getInjectJS
