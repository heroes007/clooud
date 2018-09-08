import { fetch , login , count } from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent:[],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    isLoading:false,
    isload:false,
    pn:1,
    isMore:true,
    loadingDown:false,
    isRefresh:false,
    },
  onLoad:function(){
    login()    
    this.getData()
    this.getContent()
  },

  //初始化轮播图及刷新动画

  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get('/swiper').then(res=>{
      this.setData({
        swiperData:res.data,
        isLoading: false,
        loadingDown:true                
      })
    })
  },

  //获取图书信息

  getContent(){
    return new Promise((resolve,reject)=>{
      fetch.get("/category/books").then(res => {
        resolve()
        this.setData({
          mainContent: res.data,
          isLoading: false,
          pn: 1,
          isMore: true,
        })
        let mainContent = this.data.mainContent
        for(let i=0;i<mainContent.length;i++){
          for (let j = 0; j < mainContent[i].books.length; j++){
            let timestamp = Date.parse(new Date(mainContent[i].books[j].updateTime))
            let time = Math.floor((Date.parse(new Date()) - timestamp) / (60*1000))
            var times = ""
            if (time < 60) {
              times = "刚刚"
            } else if (time < 360) {
              times = Math.floor(time / 60) + "分钟前"
            } else if (time < (360 * 24) ) {
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
            mainContent[i].books[j].times = times
          }
        }
        this.setData({
          mainContent
        })
      })
    })
  },

  //跳转书籍详情页

  jumpBook(event){
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  },

  //下拉刷新

  onPullDownRefresh(){
    wx.showNavigationBarLoading()
    this.getContent().then(
      wx.stopPullDownRefresh(),
      wx.hideNavigationBarLoading()
    )  
  },

  //上拉加载获取新页面

  getMoreContent() {
    return fetch.get('/category/books', {
      pn: this.data.pn
    })
  },

  //上拉加载

  onReachBottom(){
    if(this.data.isMore){
      this.setData({
        pn: this.data.pn + 1
      })
      this.getMoreContent().then(res => {
        let mainContent = res.data
        for (let i = 0; i < mainContent.length; i++) {
          for (let j = 0; j < mainContent[i].books.length; j++) {
            let timestamp = Date.parse(new Date(mainContent[i].books[j].updateTime))
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
            mainContent[i].books[j].times = times
          }
        }
        let Array = [...this.data.mainContent, ...mainContent]
        this.setData({
          mainContent: Array
        })
        if(res.data.length < 2){
          this.setData({
            isMore:false
          })
        }
      })
    }
  },

  //更多图书按钮

  getMore(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url:`/pages/more/more?id=${id}`
    })
  }
})
