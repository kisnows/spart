/**
 * @author kisnows
 * @create 2016/8/3.
 */
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const historyApiFallback = require('connect-history-api-fallback')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const request = require('request')

const cwd = process.cwd()
const webpackConfig = require('../webpack')
const config = require(path.resolve(cwd, './config'))
const mockRoutes = require(path.resolve(cwd, './data'))

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use('/', router)

const compiler = webpack(webpackConfig)
const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  // display no info to console (only warnings and errors)

  publicPath: webpackConfig.output.publicPath,

  stats: {
    colors: true
  }
})
app.use(devMiddleware)
app.use(webpackHotMiddleware(compiler))
app.use(historyApiFallback())

if (process.env.NODE_ENV === 'development') {
  mockRoutes(router)
  router.get('/ga.js', function(req, res) {
    request('https://8.163.com/ga.js').pipe(res)
  })
} else if (process.env.NODE_ENV === 'api') {
  const REMOTE_API = config.remoteApi
  router.get('/open/wechat/jsapi', (req, res) => {
    const url = `http://${REMOTE_API}${req.url}`
    request({
      qs: req.body,
      method: req.method,
      url: url,
      headers: req.headers
    }).pipe(res)
  })
  router.use('/', (req, res, next) => {
    const url = `http://${REMOTE_API}${req.url}`
    if (req.headers['accept'] === 'application/json' || (/\/m\//.test(url))) {
      req.headers['accept'] = 'application/json'
      if (req.method.toUpperCase() === 'GET') {
        delete req.headers.host
        let r = request({
          qs: req.body,
          method: req.method,
          url: url,
          headers: req.headers
        }, function(err) {
          if (err) {
            console.log(err)
            res.json(Object.assign(err, { code: -1, msg: err.code }))
          }
        })
        r.pipe(res)
      } else if (req.method.toUpperCase() === 'POST') {
        let r = request({
          json: true,
          body: req.body,
          method: req.method,
          url: url,
          headers: req.headers
        }, function(err) {
          if (err) {
            console.log(err)
            res.json(Object.assign(err, { code: -1, msg: err.code }))
          }
        })
        r.pipe(res)
      }
    } else if (/\/user\/login\//.test(url)) {
      let r = request({
        qs: req.body,
        method: req.method,
        url: url,
        headers: req.headers
      }, function(err) {
        if (err) {
          console.log(err)
          res.json(Object.assign(err, { code: -1, msg: err.code }))
        }
      })
      r.pipe(res)
    } else {
      next()
    }
  })
}

// 404
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

app.listen(config.port, err => {
  if (err) {
    console.error(err)
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', config.port, config.port)
  }
})
