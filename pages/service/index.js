// pages/discovery/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus:[
      {icon:'youzan-shield',name:'科管服务',path:'/pages/service/kgfw/index',color:'#996699'},
      {icon:'diamond',name:'研究所/室介绍',path:'/pages/service/yjjs/index',color:'#9999CC'},
      {icon:'todo-list',name:'公共平台',path:'/pages/service/ggpt/index',color:'#99CC99'},
      {icon:'map-marked',name:'研究平台/设备',path:'/pages/service/yjptsb/index',color:'#FFCC99'}
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
  onShow(){
    app.setTabBar();
    wx.setNavigationBarColor({
      backgroundColor: wx.getStorageSync('color'),
      frontColor: '#ffffff',
    })
    this.setData({
      color:wx.getStorageSync('color'),
      path:"/"+getCurrentPages()[0].route
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