import { fetch } from "../../utils/util.js"
Page({
  data: {
    collectBook:[],
    pn:1,
    isLoading:false,
    isMore:true
  },
  onLoad: function (options) {
    this.onCollect()
    this.setData({
      isLoading: true
    })
  },

  //获取收藏书籍

  onCollect() {
    return new Promise((resolve,reject)=>{
      resolve()
      fetch.get("/collection", { pn: this.data.pn, size: 6 }).then(res => {
        let arr = res.data;
        arr = arr.slice()
        this.setData({
          collectBook: res.data,
          isLoading: false
        })
      })
    })
  },

  //阅读书籍

  onRead(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },

  //加载方法

  getMore(){
    return new Promise((resolve,reject)=>{
      fetch.get("/collection", {
        pn: this.data.pn,
        size: 6
      }).then(res => {
        if(res.data.length < 6){
          this.setData({
            isMore:false
          })
        }
        resolve()
        let collect = [...this.data.collectBook, ...res.data]
        this.setData({
          collectBook: collect
        })
      })
    })
  },

  //上拉加载

  onReachBottom() {
    if(this.data.isMore){
      this.setData({
        pn: this.data.pn + 1
      })
      this.getMore()
    }
  },

  //下拉刷新 

  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.onCollect().then(
      wx.stopPullDownRefresh(),
      wx.hideNavigationBarLoading()
    )
  },

  onShareAppMessage: function () {
  
  }
})