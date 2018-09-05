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
    duration: 1000,
    isLoading:false
    },
  onLoad:function(){
    this.getData()
    this.getContent()
  },
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get('/swiper').then(res=>{
      this.setData({
        swiperData:res.data,
        isLoading: false                
      })
    })
  },
  getContent(){
    fetch.get("/category/books").then(res=>{
      console.log(res.data)
      this.setData({
        mainContent:res.data,
        isLoading: false                   
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
