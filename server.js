const http = require('http')
const url = require('url')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3000

let homeRouter = require('./routes/home')
let tagsRouter = require('./routes/tags')
let postRouter = require('./routes/post')

let result = {
  data: [1, 2, 3],
  status: 0
}

exports.start = () => {
  http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname
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
    } else {//非js、css文件
      if (/home|^\/$/.test(pathname)) {//首页
        homeRouter(res, pathname)
      } else if (/tags/.test(pathname)) {//标签
        tagsRouter(res, pathname)
      } else if (/post\/\d*/.test(pathname)) {//文章
        console.log('postRouter')
        postRouter(res, pathname)
      }
    }

  }).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
  })
} 