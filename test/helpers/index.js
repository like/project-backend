const fetch = require('like-fetch')

module.exports = {
  request
}

function request (backend, endpoint, opts = {}) {
  return fetch('http://127.0.0.1:' + backend.port + endpoint, {
    ...opts,
    requestType: opts.requestType || 'json',
    responseType: opts.responseType || 'json'
  })
}
