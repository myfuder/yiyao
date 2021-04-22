// pages/userDescInfo/index.js
import {
  ajax,basUrl
} from '../../utils/util';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:0,
    basUrl,
    userInfo:{},
    userId:wx.getStorageSync('userInfo').id,
    tabs:[
      {id:'',title:'需求/分享',tag:'gx'},
      {id:'1',title:'论文',value:'publicLW',tag:'lw'},
      {id:'2',title:'项目',value:'publicXM',tag:'xm'},
      {id:'4',title:'成果',value:'publicCG',tag:'cg'}
    ],
    activeTab:'gx',
    list:[]
  },
  onChange(e){
    this.setData({
      activeTab:this.data.tabs[e.detail.index].tag
    })
    this.getPostByTag(this.data.activeTab)
  },
  onBlurTags(e){
    let value = e.detail.value
    ajax.post(`/api/user/signature`,{signature:e.detail.value}).then((res)=>{
      wx.showToast({
        title: res.message,
      })
    })
  },
  getUserInfoById(userId){
    ajax.get(`/api/user/profile?userid=${userId}`).then((res)=>{
      this.setData({
        userInfo:{...res.data,signature:res.data.signature.replace(/[^\u4e00-\u9fa5]/gi,"")},
        tabs:this.data.tabs.filter((item)=>{
          return !item.value||res.data[item.value]
        })
      })
      this.selectComponent('#tabs').resize()
      this.getPostByTag(this.data.activeTab)
    })
  },
  toEditInfo(){
    wx.navigateTo({
      url: '/pages/mine/info/index',
    })
  },
  getPostByTag(tag){
    ajax.get(`/api/post`,{userid:this.data.userInfo.id,method:tag}).then((res)=>{
      this.setData({
        list:res.data.content.map((item)=>{return {...item,content:item.content.replace(/[^\u4e00-\u9fa5]/gi,"")}})
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTitleTop: app.globalData.navTitleTop,
      pixelRatio:app.globalData.pixelRatio,
      color:wx.getStorageSync('color')
    })
    this.getUserInfoById(options.userId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPageScroll(e){
    this.setData({
      scrollTop: e.scrollTop
    })
  }
})