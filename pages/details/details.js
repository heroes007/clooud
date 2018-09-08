import {fetch} from "../../utils/util.js"
Page({
  data: {
    bookId:"",
    bookData:{},
    isLoading:false,
  },
  onLoad: function (options) {
    this.setData({
      isLoading: true,      
      bookId: options.id
    })
    this.getData()
  },

  //获取书籍信息

  getData(){
    return new Promise((resolve,reject)=>{
      fetch.get(`/book/${this.data.bookId}`).then(res => {
        resolve()
        this.setData({  
          bookData: res,
          isLoading: false,
        })
        //获取更新时间

      let bookData = res
        let timestamp = Date.parse(new Date(bookData.data.updateTime))
        let time = Math.floor((Date.parse(new Date()) - timestamp) / (60 * 1000))
        var times = ""
        if (time < 60) {
          times = "刚刚"
        } else if (time < 360) {
          times = Math.floor(time / 60) + "分钟前"
        } else if (time < (360 * 24)) {
          times = Math.floor(time / 360) + "小时前"
        } else if (time < (360 * 24 * 30)) {
          times = Math.floor(time / (360 * 24)) + "天前"
        } else if (time < (360 * 24 * 30 * 12)) {
          times = Math.floor(time / (360 * 24 * 30)) + "个月前"
        } else if (time < (360 * 24 * 30 * 12 * 10)) {
          times = Math.floor(time / (360 * 24 * 30)) + "年前"
        } else {
          times = "很久很久以前"
        }
        bookData.data.times = times
        this.setData({
          bookData
        })
      })
    })   
  },

  //获取图书室目录

  jumpCatalog(){
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  },  
  onPullDownRefresh: function () {
    this.getData().then(
      wx.stopPullDownRefresh()
    )
  },

  //收藏按钮

  collect(){
    if (!this.data.bookData.isCollect){
      fetch.post("/collection",{bookId:this.data.bookId}).then(res=>{
        wx.showToast({
          title: '已收藏',
        })
        let bookData = this.data.bookData
        bookData.isCollect = !bookData.isCollect
        this.setData({
          bookData
        })
      })
    }else{
      fetch.post("/collection/delete",{arr:[this.data.bookId]}).then(res=>{
        wx.showToast({
          title: '已删除',
        })
      })
      let bookData = this.data.bookData
      bookData.isCollect = !bookData.isCollect
      this.setData({
        bookData
      })
    }
  },

  //分享好友

  onShareAppMessage: function () {
    return{
    title: this.data.bookData.data.title,
    path: `/pages/details/details?id=${this.data.bookId}`,
    imageUrl: this.data.bookData.data.img
    }
  }
})