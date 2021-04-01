// pages/service/kgfw/index.js
import {
  ajax,basUrl
} from '../../../utils/util';
let _self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basUrl,
    kg_data:[
    ]
  },
  getList(){
    ajax.get('/api/kjfw/guides').then((res)=>{
      console.log(res)
      this.setData({
        kg_data:res
      })
    })
  },
  pageToDetail(e){
    wx.navigateTo({
      url: '/pages/service/kgfw/detail/index?path='+e.currentTarget.dataset.path,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.getList()
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
    wx.setNavigationBarColor({
      backgroundColor: '#D3D3D3'||wx.getStorageSync('color'),
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