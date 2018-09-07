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
  getData(){
    return new Promise((resolve,reject)=>{
      fetch.get("/readList").then(res => {
        console.log(res.data)
        this.setData({
          catalog: res.data,
          isLoading:false
        })
      })
    })
  },
  traverse(){
    let catalog = this.data.catalog
    this.setData({
      catalog
    })
  },
  onPullDownRefresh(){
    this.getData().then(
      wx.stopPullDownRefresh()
    )
  },
  continue(event){
    let id = event.currentTarget.dataset.id
    let bookId = event.currentTarget.dataset.bookid
    wx.navigateTo({
      url: `/pages/book/book?bookId=${bookId}&id=${id}`,
    })
  },
  check(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${id}`,
    })  
  },
  onShareAppMessage: function () {
  
  }
})