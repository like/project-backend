require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logHTTP = require('tiny-log-http')
const ErrorHTTP = require('tiny-error-http')
const Backend = require('like-backend')

module.exports = Backend.launch(main)

async function main () {
  const app = express()

  app.set('trust proxy', true)
  app.set('json spaces', 2)

  app.disable('x-powered-by')
  app.disable('etag')

  app.use(cors({ maxAge: 600, credentials: true, origin: '*' }))
  app.use(express.text())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(logHTTP({ userAgent: !Backend.testing }))

  app.use(function (req, res, next) {
    // Pass state here like req.db = db
    next()
  })

  const api = express.Router()

  api.post('/example', require('./api/example.js'))

  app.use('/v1', api)
  app.use(ErrorHTTP.middleware)

  const PORT = process.env.PORT || 1337
  const HOST = process.env.HOST || '127.0.0.1'

  return new Backend({
    server: app.listen(Backend.testing ? 0 : PORT, HOST),
    goodbye: async function () {
      // Close resources here
    }
  })
}
