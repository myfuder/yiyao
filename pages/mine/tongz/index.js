// pages/mine/tongz/index.js
import {ajax,basUrl} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basUrl,
    tabs:[{title:'系统通知',name:'xt'}, {title:'科技部通知',name:'kjb'}],
    active:'xt',
    list:[],
    kjbList:[]
  },
  onChange(e){
    this.setData({
      active:e.detail.name
    })
  },
  // /api/user/mymessage
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  },
  getKJBMessage(){
    // /api/kjb/message
    ajax.get(`/api/kjb/message`).then((res)=>{
      this.setData({
        kjbList:res.data.content.map((item)=>{
          return {...item,created:this.formatDate(item.created)}
        })
      })
    })
  },
  getList(){
    ajax.get(`/api/user/mymessage`).then((res)=>{
      this.setData({
        list:res.data.content.map((item)=>{
          return {...item,created:this.formatDate(item.created)}
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
    this.getKJBMessage()
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
    this.setData({
      color:wx.getStorageSync('color')
    })
    wx.setNavigationBarColor({
      backgroundColor: wx.getStorageSync('color'),
      frontColor: '#ffffff',
    })
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

  }
})