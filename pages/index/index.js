//index.js
//获取应用实例
import { fetch, login} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent:[],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    isLoading:false,
    isload:false,
    pn:1,
    isMore:true,
    loadingDown:false
    },
  onLoad:function(){
    login()    
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
        isLoading: false,
        loadingDown:true                
      })
    })
  },
  getContent(){
    return new Promise((resolve,reject)=>{
      fetch.get("/category/books").then(res => {
        resolve()
        this.setData({
          mainContent: res.data,
          isLoading: false,
          pn: 1,
          isMore:true,
        })
      })
    })
  },
  jumpBook(event){
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`
    })
  },
  onPullDownRefresh(){
    this.getContent().then(
      wx.stopPullDownRefresh()
    )
  },
  getMoreContent() {
    return fetch.get('/category/books', {
      pn: this.data.pn
    })
  },
  onReachBottom(){
    if(this.data.isMore){
      this.setData({
        pn: this.data.pn + 1
      })
      this.getMoreContent().then(res => {
        let Array = [...this.data.mainContent, ...res.data]
        this.setData({
          mainContent: Array
        })
        if(res.data.length < 2){
          this.setData({
            isMore:false
          })
        }
      })
    }
  },
getMore(event){
  let id = event.currentTarget.dataset.id
  wx.navigateTo({
    url:`/pages/more/more?id=${id}`
  })
}
})
