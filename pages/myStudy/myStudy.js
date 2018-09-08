import {fetch} from "../../utils/util.js"
Page({
  data: {
    catalog:[],
    percent:"",
    bookId:"",
    percent:"",
    isLoading:false
  },
  onLoad: function (options) {
    this.getData()
    this.setData({
      isLoading:true
    })
  },

  //获取正在阅读书籍信息
  getData(){
    return new Promise((resolve,reject)=>{
      fetch.get("/readList").then(res => {        
        this.setData({
          catalog: res.data,
          isLoading:false
        })

        //获取更新时间

        let catalogt = res.data
        for (let i = 0; i < catalogt.length; i++) {
          let timestamp = Date.parse(new Date(catalogt[i].updatedTime))
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
          catalogt[i].times = times         
        }
        this.setData({
          catalog: catalogt
        })

        //对进度百分比取整

        let catalog = this.data.catalog
        for (let i = 0; i < catalog.length; i++) {
          let result = Math.floor(catalog[i].title.index * 100 / catalog[i].title.total)
          catalog[i].result = result
        }
        this.setData({
          catalog
        })
      })
    })
  },

  //上拉刷新

  onPullDownRefresh(){
    this.getData().then(
      wx.stopPullDownRefresh()
    )
  },

  //继续阅读按钮

  continue(event){
    console.log(event)
    let id = event.currentTarget.dataset.id
    let bookId = event.currentTarget.dataset.bookId
    wx.navigateTo({
      url: `/pages/book/book?bookId=${bookId}&id=${id}`,
    })
  },

  //查看文档按钮
  
  check(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${id}`,
    })  
  },
  onShareAppMessage: function () {
  
  }
})