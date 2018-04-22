const http = require('http')
const url = require('url')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3000

let homeRouter = require('./routes/home')
let tagsRouter = require('./routes/tags')

let result = {
  data: [1, 2, 3],
  status: 0
}

exports.start = () => {
  http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname
    // console.log(pathname, 'pathname')
    //请求public目录
    let regex0 = /\/javascripts|\/stylesheets|\/images/
    //获取后缀
    let ext = /(\.[^.]+|)$/.exec(pathname)[0]
    // console.log(ext, 'ext')
    if (ext === '.css' || ext === '.js') {//加载js、css文件
      fs.readFile(`public/${pathname}`, 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        res.statusCode = 200
        if (ext === '.css') {
          res.setHeader('Content-Type', 'text/css')
        } else if (ext === '.js') {
          res.setHeader('Content-Type', 'application/javascript')
        }
        res.end(data)
      })
    } else {
      if (/home|\/$/.test(pathname)) {
        homeRouter(res, pathname)
        /* fs.readFile('./views/home.html', 'utf-8', (err, data) => {
          if (err) {
            throw err
          }
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html')
          res.end(data)
        }) */
      } else if (/tags/.test(pathname)) {
        fs.readFile('./views/home.html', 'utf-8', (err, data) => {
          if (err) {
            throw err
          }
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html')
          res.end(data)
        })
      }
    }

  }).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
  })
} 