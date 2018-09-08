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

  //获取该分类全部书籍信息

  getData(){
    fetch.get(`/category/${this.data.moreId}/books`).then(res=>{
      console.log(res)
      this.setData({
        catalog:res.data
      })
    })   
  },

  //点击书籍查看书籍详情

  jumpBook(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  
  onShareAppMessage: function () {
  
  }
})