const http = require('http')
const url = require('url')
const fs = require('fs')

let router = (res, pathname) => {
  if (pathname === '/tags') {//标签
    fs.readFile('views/tags.html', 'utf-8', (err, data) => {
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