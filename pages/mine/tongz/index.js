// pages/mine/tongz/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {id:'',title:'科技部',content:'一个未读消息',datetime:'2021-03-03 11:11'},
      {id:'',title:'科技部',content:'一个未读消息',datetime:'2021-03-03 11:11'},
      {id:'',title:'系统消息',content:'一个未读消息',datetime:'2021-03-03 11:11'},
      {id:'',title:'科技部',content:'一个未读消息',datetime:'2021-03-03 11:11'},
      {id:'',title:'预约提醒',content:'一个未读消息',datetime:'2021-03-03 11:11'},
      {id:'',title:'科技部',content:'一个未读消息',datetime:'2021-03-03 11:11'},
      {id:'',title:'科技部',content:'一个未读消息',datetime:'2021-03-03 11:11'},
      {id:'',title:'版本更新',content:'一个未读消息',datetime:'2021-03-03 11:11'},
      {id:'',title:'科技部',content:'一个未读消息',datetime:'2021-03-03 11:11'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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