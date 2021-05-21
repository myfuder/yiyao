// pages/jurisdiction/index.js
import {ajax,debounce,basUrl} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '',
    checkbox:[]
  },
  submit(){
    ajax.post(`/api/user/confirm`,{chkqx:this.data.radio,chklw:this.data.checkbox.filter(x=>x=='lw').length>0,chkxm:this.data.checkbox.filter(x=>x=='xm').length>0,chkcg:this.data.checkbox.filter(x=>x=='cg').length>0}).then((res)=>{
      console.log(res)
      if(res.code == '0'){
        wx.showToast({
          icon:'none',
          title: res.message,
        })
        wx.reLaunch({
          url: "/pages/index/index",
        })
      }
    })
  },
  onChangeRadio(event) {
    this.setData({
      radio: event.detail,
    });
  },
  onChangebox(event){
    this.setData({
      checkbox: event.detail,
    });
    console.log(this.data.checkbox)
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