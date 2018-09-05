import {fetch} from "../../utils/util.js"
Page({
  data: {
    bookId:"",
    bookData:{}
  },
  onLoad: function (options) {
    this.setData({
      bookId: options.id
    })
    this.getData()
  },
  getData(){
    fetch.get(`/book/${this.data.bookId}`).then(res=>{
      this.setData({
        bookData:res
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