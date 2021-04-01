// pages/details/detail1/index.js
import {
  ajax,debounce,basUrl
} from '../../../utils/util';
let _self
Page({
  /**
   * 页面的初始数据
   */
  data: {
    basUrl,
    detail:'',
    type:'',
    msg:'',
    commentList:[]
  },
  onChange:debounce((e)=>{
    _self.setData({
      msg:e.detail
    })
  }),
  sendComment(){
    ajax.get(`/api/comment/submit?toId=${this.data.detail.id}&text=${this.data.msg}`).then((res)=>{
      if(res.code == 0){
        this.getCommentList()
      }else{
        wx.showToast({
          icon:'none',
          title: res.message,
        })
      }
      _self.setData({
        msg:''
      })
    })
  },
  getCommentList(){
    ajax.get(`/api/comment/list?postId=${this.data.detail.id}`).then((res)=>{
      this.setData({
        commentList:res.content
      })
    })
  },
  getDetailInfo(id,type){
    // /api/find/detail
    ajax.get(`/api/find/detail?id=${id}&type=${type}`).then((res)=>{
      this.setData({
        detail:res.data.detail,
        joinuser:res.data.joinuser
      })
      this.getCommentList()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this
    wx.setStorageSync('color','#6915a1')
    this.setData({
      color:wx.getStorageSync('color'),
      type:options.type,
      id:options.id
    })
    wx.setNavigationBarColor({
      backgroundColor: wx.getStorageSync('color'),
      frontColor: '#ffffff',
    })
    this.getDetailInfo(options.id,options.type)
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