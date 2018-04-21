

//发送请求
function sendRequest(url, method) {
    const promise = new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest()
      // 指定通信过程中状态改变时的回调函数
      const handler = function () {
        // 4表示请求已完成并且响应已准备好
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(this.response)
            // document.querySelector('#resultBox').innerHTML = xhr.responseText
          } else {
            reject(new Error(this.statusText))
            // document.querySelector('#resultBox').innerHTML = xhr.responseText
          }
        }
      }
      xhr.onreadystatechange = handler
      xhr.onerror = function (e) {
        document.write(e)
      }
  
      // open方式用于指定HTTP动词、请求的网址、是否异步
      xhr.open(method, url, true)
  
      //请求头
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      let myVar = 'weizhen'
      // 发送HTTP请求
      xhr.send("name=value&anothername=" + encodeURIComponent(myVar) + "&so=on")
    })
    return promise
  }
  
  //绑定事件
  let el = document.querySelector('#tags')
  el.addEventListener('click', () => {
    //先清空结果
    document.querySelector('#resultBox').innerHTML = ''
  
    //发送请求
    let url = 'http://127.0.0.1:3000/tags', method = 'GET'
    sendRequest(url, method).then(json => {
      document.querySelector('#resultBox').innerHTML = json
    }, error => {
      document.querySelector('#resultBox').innerHTML = '出错了' + error
    })
  })