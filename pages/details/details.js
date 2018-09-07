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
  getData(){
    return new Promise((resolve,reject)=>{
      fetch.get(`/book/${this.data.bookId}`).then(res => {
        resolve()
        this.setData({  
          bookData: res,
          isLoading: false,
        })
      })
    })   
  },
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
  collect(){
    if (!this.data.bookData.isCollect){
      fetch.post("/collection",{bookId:this.data.bookId}).then(res=>{
        wx.showToast({
          title: '已收藏',
        })
      })
      wx.startPullDownRefresh()
    }else{
      fetch.post("/collection/delete",{arr:[this.data.bookId]}).then(res=>{
        wx.showToast({
          title: '已删除',
        })
      })
    }
    wx.startPullDownRefresh()    
  },
  onShareAppMessage: function () {
    return{
    title: this.data.bookData.data.title,
    path: `/pages/details/details?id=${this.data.bookId}`,
    imageUrl: this.data.bookData.data.img
    }
  }
})