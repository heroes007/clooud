import { fetch } from "../../utils/util.js"
Page({
  data: {
    bookInof: "",
    cataData: [],    
    isLoading:false,
  },
  onLoad: function (options) {
    this.setData({
      bookInof: options.id,
      isLoading:true
    })
    this.getData()
  },
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