import {fetch} from "../../utils/util.js"
const app = getApp()
Page({
  data: {
    titleId:"",
    article:"",
    bookId:"",
    catalog:[],
    isShow:false,
    essay:{}
  },
  onLoad: function (options) {
    const _ts = this;
    this.setData({
      titleId:options.id,
      bookId:options.bookId,
    })
    this.getData()
    this.getImp()
  },
  getData(){
    fetch.get(`/article/${this.data.titleId}`).then(res=>{
      let data = app.towxml.toJson(res.data.article.content,'markdown')
      this.setData({
        article: res.data.title,
        essay:data
      })
    })
  },
  getImp(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      console.log(res)
      this.setData({
        catalog:res.data
      })
    })
  },
  bindbtn(){
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
  onShareAppMessage: function () {
  
  }
})