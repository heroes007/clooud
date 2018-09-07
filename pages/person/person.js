import {fetch} from "../../utils/util.js"
Page({
  data: {
    collectNum:"",
    isLoading:false
  },
  onLoad: function (options) {
    this.collcetNum()
    this.setData({
      isLoading:true
    })
  }, 
  collcetNum() {
    fetch.get("/collection/total").then(res => {
      this.setData({
        collectNum: res.data,
        isLoading: false
      })
    })
  },
  collect(){
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },
  onShareAppMessage: function () {
  
  }
})