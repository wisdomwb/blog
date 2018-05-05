const http = require('http')
const url = require('url')
const fs = require('fs')

let router = (res, pathname) => {
  console.log('post页面')
  if (pathname.indexOf('post/')>-1) {//标签
    fs.readFile('./views/post.html', 'utf-8', (err, data) => {
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