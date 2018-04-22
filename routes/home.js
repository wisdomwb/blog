const http = require('http')
const url = require('url')
const fs = require('fs')

let router = (res, pathname) => {
  //首页
  if (pathname === '/') {
    fs.readFile('../views/home.html', 'utf-8', (err, data) => {
      if (err) {
        throw err
      }
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(data)
    })
  }
}
module.exports = router