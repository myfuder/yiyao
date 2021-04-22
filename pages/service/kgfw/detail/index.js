import {
  ajax
} from '../../../../utils/util';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail:'',
    type:''
  },

  getDetailInfo(path){
    ajax.get(`/api${path}`,{},(res)=>{
      this.setData({
        detail:res
      })
      wx.setNavigationBarTitle({
        title: res.title,
      })
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync('color','#6915a1')
    this.setData({
      color:wx.getStorageSync('color'),
      path:options.path
    })
    wx.setNavigationBarColor({
      backgroundColor: wx.getStorageSync('color'),
      frontColor: '#ffffff',
    })
    this.getDetailInfo(options.path)
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