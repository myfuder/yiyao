// pages/mine/index.js
import {ajax,basUrl} from '../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basUrl,
    checked:true,
    userInfo:''
  },

  toPage(){
    wx.navigateTo({
      url: '/pages/userDescInfo/index?userId='+wx.getStorageSync('userInfo').id,
    })
  },
  logout(){
    wx.showModal({
      content: '确定注销登录吗？',
      success (res) {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.redirectTo({
            url: '/pages/login/index',
          })
        }
      }
    })
   
  },
  getUserInfo(){
    // ajax.get(`/api/user/profile`).then((item)=>{
    //   debugger
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
    app.setTabBar()
    this.setData({
      color:wx.getStorageSync('color')
    })
    wx.setNavigationBarColor({
      backgroundColor: wx.getStorageSync('color'),
      frontColor: '#ffffff',
    })
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
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo
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