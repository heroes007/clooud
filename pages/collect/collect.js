import { fetch } from "../../utils/util.js"
Page({
  data: {
    collectBook:[],
    pn:1,
    isLoading:false
  },
  onLoad: function (options) {
    this.onCollect()
    this.setData({
      isLoading: true
    })
  },
  onCollect() {
    fetch.get("/collection",{pn:this.data.pn,size:6}).then(res => {
      let arr=res.data;
      arr=arr.slice()
      this.setData({
        collectBook: res.data,
        isLoading: false
      })
    })
  },
  onRead(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  getMore(){
    return new Promise((resolve,reject)=>{
      fetch.get("/collection", {
        pn: this.data.pn,
        size: 6
      }).then(res => {
        resolve()
        let collect = [...this.data.collectBook, ...res.data]
        this.setData({
          collectBook: collect
        })
      })
    })
  },
  onReachBottom() {
    this.setData({
      pn : this.data.pn + 1
    })
    this.getMore()
  },
  onShareAppMessage: function () {
  
  }
})