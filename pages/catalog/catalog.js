import { fetch } from "../../utils/util.js"
Page({
  data: {
    bookInof: "",
    cataData: [],    
    isLoading:false,
  },

  //初始化数据
  
  onLoad: function (options) {
    this.setData({
      bookInof: options.id,
      isLoading:true
    })
    this.getData()
  },

  //获取该书籍目录

  getData() {
    fetch.get(`/titles/${this.data.bookInof}`).then(res => {
      this.setData({
        cataData: res.data,
        isLoading: false,        
      })
    })
  },

  onShareAppMessage: function () {

  }
})