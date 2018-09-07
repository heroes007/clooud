import {fetch} from "../../utils/util.js"
Page({
  data: {
    moreId:"",
    catalog:"",
  },
  onLoad: function (options) {
    this.setData({
      moreId:options.id
    })
    this.getData()
  },
  getData(){
    fetch.get(`/category/${this.data.moreId}/books`).then(res=>{
      console.log(res)
      this.setData({
        catalog:res.data
      })
    })   
  },
  jumpBook(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  onShareAppMessage: function () {
  
  }
})