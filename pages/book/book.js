import {fetch} from "../../utils/util.js"
const app = getApp()
Page({
  data: {
    titleId:"",
    bookId:"",
    catalog:[],
    isShow:false,
    essay:"",
    font:35,
    index:"",
    isLoading:false
  },
  onLoad: function (options) {
    const _ts = this;
    this.setData({
      titleId:options.id,
      bookId:options.bookId,
      isLoading: true,      
    })
    this.getData()
    this.getImp()
  },
  getData(){
    fetch.get(`/article/${this.data.titleId}`).then(res=>{
      this.setData({
        essay: res.data.article.content,
        index : res.data.article.index,
        isLoading:false,
      })
    })
  },
  getImp(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      this.setData({
        catalog:res.data
      })
    })
  },
  btnmenu(){
    let state = !this.data.isShow
    this.setData({
      isShow:state
    })
  },
  close(){
    this.setData({
      isShow:false
    })
  },
  handmenu(event){
    const id = event.currentTarget.dataset.id
    this.setData({
      titleId:id
    })
    this.getData()
    this.close()
  },
  handleadd(){
    let font = this.data.font
    if(font < 50){
      this.setData({
        font: font + 2
      })
    }else{
        wx.showToast({
          title: '已到最大',
          duration:1000
        })
    }
  },
  handledecrease() {
    let font = this.data.font    
    if (font > 25) {
      this.setData({
        font: font - 2
      })
    } else {
      wx.showToast({
        title: '已到最小',
        duration: 1000
      })
    }
  },
  handlelast(){
    let catalog = this.data.catalog
    if(this.data.index > 1){
      this.setData({
        isLoading:true,
        titleId: catalog[this.data.index - 1]._id
      })
      this.getData()
    }else{
      wx.showToast({
        title: '已是首页',
        duration:1000
      })
    }
  },
  handlenext() {
    let catalog = this.data.catalog
    if (this.data.index < catalog.length - 1) {
      this.setData({
        isLoading: true,
        titleId: catalog[this.data.index + 1]._id
      })
      this.getData()
    } else {
      wx.showToast({
        title: '已是最后一页',
        duration: 1000
      })
    }
  },
  onShareAppMessage: function () {
  }
})