//index.js
//获取应用实例
import {fetch} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent:[],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
    },
  onLoad:function(){
    this.getData()
    this.getContent()
  },
  getData(){
    fetch.get('/swiper').then(res=>{
      this.setData({
        swiperData:res.data
      })
    })
  },
  getContent(){
    fetch.get("/category/books").then(res=>{
      this.setData({
        mainContent:res.data       
      })
    })
  },
  jumpBook(event){
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  }
})
