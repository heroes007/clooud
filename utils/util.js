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
exports.fetch = fetch
exports.login = login