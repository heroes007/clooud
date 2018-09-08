//封装fetch函数

const baseUrl = 'https://m.yaojunrong.com'
const fetch = {
  http(url,method,data){
    return new Promise((resolve, reject) => { 
      let token = wx.getStorageSync('token')
      let header = { 'content-type': 'application/json' }
      if(token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        method,
        data,
        header,
        success(res) {
          if(res.header.Token){
            wx.setStorageSync('token', res.header.Token)
          }
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  get(url,data) {
    return this.http(url,'GET',data)   
  },
  post(url,data){
    return this.http(url, 'POST', data) 
  }
}

//登陆信息

const login = ()=>{
  wx.login({
    success(res){
      fetch.post('/login',{
        code:res.code,
        appid: "wxfced909c6c3c733f",
        secret: "90c4f53f1c9d8fa0a04ebc1f8293f4ec"
      }).then(res=>{
        console.log(res)
      })
    }
  })
}

//封装时间计算方法

const count = (timestamp)=>{
  let time = Math.floor((Date.parse(new Date()) - timestamp) / 1000)
  var times = ""
  if (time < 60) {
    times = "刚刚"
  } else if (time < 360) {
    times = Math.floor(time / 60) + "分钟前"
  } else if (time < 360 * 24) {
    times = Math.floor(time / 360) + "小时前"
  } else if (time < 360 * 24 * 30) {
    times = Math.floor(time / 360 * 24) + "天前"
  } else if (time < 360 * 24 * 30 * 12) {
    times = Math.floor(time / 360 * 24 * 30) + "个月前"
  } else if (time < 360 * 24 * 30 * 12 * 10) {
    times = Math.floor(time / 360 * 24 * 30) + "年前"
  } else {
    times = "很久很久以前"
  }
}
   

exports.fetch = fetch
exports.login = login
exports.count = count