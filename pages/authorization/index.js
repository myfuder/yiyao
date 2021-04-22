// pages/authorization/index.js
import {ajax,debounce,basUrl} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  submitEasy(){
    ajax.post(`/api/user/openid/bind`,{openid:wx.getStorageSync('openid'),sessionkey:wx.getStorageSync('session_key')}).then((res)=>{
      if(res.code == 0){
        ajax.post(`/api/wxlogin`,{openid:wx.getStorageSync('openid'),sessionkey:wx.getStorageSync('session_key')}).then((res)=>{
          if(res.code == 0){
            wx.setStorageSync('userInfo', res.data.profile)
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }else{
            wx.showToast({
              icon:'none',
              title: res.message,
            })
          }
        })
      }else{
        wx.showToast({
          icon:'none',
          title: res.message,
        })
      }
    })
  },
  cancel(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      color:wx.getStorageSync('color'),
    })
    wx.setNavigationBarColor({
      backgroundColor: wx.getStorageSync('color')|'',
      fontColor: '#ffffff',
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