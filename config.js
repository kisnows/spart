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
  remoteApi: env.remoteApi || '10.165.124.53',
  cdnHost: 'i.epay.126.net',
  cdnPath: '/m/qh/'
}
