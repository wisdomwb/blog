const http = require('http')
const url = require('url')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3000

let result = {
  data: [1, 2, 3],
  status: 0
}

exports.start = () => {
  http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname
    console.log(pathname, 'pathname')
    //请求public目录
    let regex0 = /\/javascripts|\/stylesheets|\/images/
    //获取后缀
    let ext = /(\.[^.]+|)$/.exec(pathname)[0]
    if (ext === '.css' || ext === '.js') {
      fs.readFile(`.publick/${pathname}`, 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.setHeader('Content-Type', 'text/html')
      })
    } else {
      fs.readFile('./views/home.html', 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        // res.setHeader('Access-Control-Allow-Origin', '*')
        let post = ''
        req.on('data', (chunk) => {
          post += chunk
        })
        req.on('end', () => {
          res.end(data)
        })
      })
    }

  }).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
  })
} 