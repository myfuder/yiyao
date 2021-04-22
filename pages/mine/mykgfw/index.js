// pages/mine/mykgfw/index.js
import {ajax,debounce} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  edit(e){
    let {name,id} = e.currentTarget.dataset
    this.selectComponent(name).close();
    wx.navigateTo({
      url: '/pages/mine/mykgfw/editfw/index?id='+id,
    })
  },
  delete(e){
    let id = e.currentTarget.dataset.id
    let that = this
    wx.showModal({
      content: '确定删除吗？',
      success (res) {
        if (res.confirm) {
          // that.selectComponent(id).close();
          // /api/kjfw/del
          ajax.get(`/api/kjfw/del?id=${id}`).then((res)=>{
            that.getList()
            wx.showToast({
              icon:'none',
              title: res.message,
            })
          })
        }
      }
    })
  },
  toEditPage(e){
    wx.navigateTo({
      url: '/pages/mine/mykgfw/editfw/index',
    })
  },
  // /api/user/kjfw\
  getList(){
    ajax.get(`/api/user/kjfw?userid=${wx.getStorageSync('userInfo').id}`).then((res)=>{
      this.setData({
        list:res.data.content
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getList()
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