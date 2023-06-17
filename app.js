require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const graceful = require('graceful-http')
const goodbye = require('graceful-goodbye')
const ErrorHTTP = require('./lib/error-http.js')
// const jwt = require('./like-jwt.js')

main()

async function main () {
  const app = express()

  app.set('trust proxy', true)
  app.disable('x-powered-by')
  app.disable('etag')

  app.use(require('./api/_firewall.js'))

  app.use(cors({ maxAge: 600, credentials: true })) // { ..., origin: process.env.SERVER_URL }
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  // app.use(jwt.middleware(JWT_KEY))

  app.use(require('./api/_request.js'))
  app.use(require('./api/_redirect.js'))

  app.post('/api/example', require('./api/example.js'))
  app.post('/api/pixel', require('./api/pixel.js'))

  app.use(ErrorHTTP.middleware)

  const server = app.listen(1337, '0.0.0.0', function () {
    console.log('Server listening')

    if (process.env.PM2_HOME && process.env.wait_ready) process.send('ready')
  })

  server.on('close', function () {
    console.log('Server closed')
  })

  const close = graceful(server)
  goodbye(() => close())
}
