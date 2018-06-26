/**
 * @author kisnows
 * @create 2016/8/4.
 */
let env
try {
  env = require('./env.js')
} catch (err) {
  env = {}
}

module.exports = {
  port: env.localPort || 8080,
  remoteApi: env.remoteApi || '192.xxx.xxx.xxx',
  cdnHost: 'xxx.xxx.xxx',
  cdnPath: '/x/xx/'
}
