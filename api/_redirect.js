module.exports = function (req, res, next) {
  /* if (req.headers.host && req.headers.host.indexOf('www.') === -1) {
    res.redirect('https://www.' + req.headers.host + req.url)
    return
  } */

  /* if (!req.secure && req.headers.host.indexOf('localhost') !== 0) {
    res.redirect('https://' + req.headers.host + req.url)
    return
  } */

  next()
}
