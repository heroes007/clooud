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
    isLoading:false,
    titleName:""
  },

  //初始化数据
  
  onLoad: function (options) {
    this.setData({
      titleId:options.id,
      bookId:options.bookId,
      isLoading: true, 
      titleName:options.title
    })
    this.getData()
    this.getImp()
    // this.change()

  },

  //获取该书籍目录

  getData(){
    return new Promise((resolve,reject)=>{
      fetch.get(`/article/${this.data.titleId}`).then(res => {
        this.setData({
          essay: res.data.article.content,
          index: res.data.article.index,
          isLoading: false,
        })
        wx.setNavigationBarTitle({
          title: res.data.title
        })
      })
      resolve()
    })
  },

  //获取概书籍正文

  getImp(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      this.setData({
        catalog:res.data
      })
    })
  },

  //目录按钮

  btnmenu(){
    let state = !this.data.isShow
    this.setData({
      isShow:state
    })
  },

  //关闭目录按钮事件

  close(){
    this.setData({
      isShow:false
    })
  },

  //点击目录进行跳转

  handlemenu(event){
    const id = event.currentTarget.dataset.id
    this.setData({
      titleId:id
    })
    this.getData()
    this.close()
  },

  //加大字体

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

  //缩小字体

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

  //向前翻页按钮

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

  //向后翻页按钮

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