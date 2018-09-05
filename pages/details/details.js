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
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      this.setData({
        bookData:res,
        isLoading: false,        
      })
    })
  },
  jumpCatalog(){
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`,
    })
  },  
  onShareAppMessage: function () {
  
  }
})