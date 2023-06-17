const reduceUA = require('reduce-user-agent')

const ignoreIPs = []
const ignoreURLs = [
  // '/favicon.ico', '/manifest.json', '/robots.txt',
  // '/static/', '/api/'
]

module.exports = async function (req, res, next) {
  const remoteAddress = (req.headers['cf-connecting-ip'] || req.ip)

  if (ignoreIPs.indexOf(remoteAddress) > -1) {
    next()
    return
  }

  if (ignoreURLs.find(url => req.url.indexOf(url) === 0)) {
    next()
    return
  }

  console.log(
    '- Request',
    '[' + (new Date().toLocaleString('en-GB')) + ']',
    '[' + remoteAddress, (req.headers['cf-ipcountry'] || null) + ']',
    // req.headers,
    '[' + req.method, req.url + ']',
    req.body,
    reduceUA(req.headers['user-agent'])
  )

  next()
}
