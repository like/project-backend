require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const ErrorHTTP = require('tiny-error-http')
const Backend = require('like-backend')

module.exports = Backend.launch(setup)

async function setup () {
  const app = express()

  app.set('trust proxy', true)
  app.set('json spaces', 2)

  app.disable('x-powered-by')
  app.disable('etag')

  app.use(cors({ maxAge: 600, credentials: true, origin: '*' }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())

  app.use(require('./api/_request.js'))

  app.post('/api/example', require('./api/example.js'))

  app.use(ErrorHTTP.middleware)

  return new Backend({
    app,
    host: '127.0.0.1',
    port: 1337,
    logs: true
  })
}
