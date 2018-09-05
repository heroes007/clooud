import { fetch } from "../../utils/util.js"
Page({
  data: {
    bookInof: "",
    cataData: [],    
  },
  onLoad: function (options) {
    this.setData({
      bookInof: options.id,
    })
    this.getData()
  },
  getData() {
    fetch.get(`/titles/${this.data.bookInof}`).then(res => {
      this.setData({
        cataData: res.data
      })
    })
  },
  onShareAppMessage: function () {

  }
})