import {fetch} from "../../utils/util.js"
Page({
  data: {
    collectNum:"",
    isLoading:false
  },

  //初始化数据

  onLoad: function (options) {
    this.collcetNum()
    this.setData({
      isLoading:true
    })

    //获取用户信息
    wx.getUserInfo({
      success:res=>{
      }
    })
    
  }, 

  //获取收藏书的个数

  collcetNum() {
    return new Promise((resolve,reject)=>{
      resolve()
      fetch.get("/collection/total").then(res => {
        this.setData({
          collectNum: res.data,
          isLoading: false
        })
      })
    })
  },

  //下拉刷新

  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.collcetNum().then(
      wx.stopPullDownRefresh(),
      wx.hideNavigationBarLoading()
    )
  },

  //跳转收藏界面

  collect(){
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },
  onShareAppMessage: function () {
  
  }
})