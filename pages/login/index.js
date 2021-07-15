// pages/login/index.js
import {ajax,debounce,basUrl} from '../../utils/util'
let _self
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      username:'',
      password:'',
      openid:''
    }
  },
  onChangeInput:debounce(function(e){
    let name = e.currentTarget.dataset.name
    _self.setData({
      params:{..._self.data.params,[name]:e.detail},
    });
  }),
  submit(){
    ajax.post(`/api/login`,{id:this.data.params.username,password:this.data.params.password},(res)=>{
      console.log(res)
      if(res.code == 0){
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('userInfo', res.data.profile)
        if(res.data.profile.openid){
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }else{
          wx.navigateTo({
            url: '/pages/authorization/index',
          })
        }
      }else{
        wx.showToast({
          icon:'none',
          title: res.message,
        })
      }
    })
  },
  submitEasy(){
    let user = wx.getStorageSync('userInfo')
    let openid = wx.getStorageSync('openid')
    if(user&&user.openid&&user.openid == openid){
      ajax.post(`/api/wxlogin`,{openid:wx.getStorageSync('openid'),sessionkey:wx.getStorageSync('session_key')}).then((res)=>{
        if(res.code == 0){
          wx.setStorageSync('token', res.data.token)
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
    }else if(user&&!user.openid){
      wx.reLaunch({
        url: '/pages/authorization/index',
      })
    }else{
      wx.showModal({
        content: '账号与微信用户不一致，请使用账号密码登录',
        showCancel:false,
      })
      this.setData({
        openid:''
      })
    }
  },
  getSession(){
    let that = this
    wx.login({
      success: res => {
        ajax.get(`/api/wx/code2session?js_code=${res.code}`,{},(resS)=>{
          wx.setStorageSync('openid', resS.data.openid)
          wx.setStorageSync('session_key', resS.data.sessionkey)
        })
        // wx.request({
        //   url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code="+ res.code+ "&grant_type=authorization_code",
        //   success(resc){
        //     wx.setStorageSync('openid', resc.data.openid)
        //     wx.setStorageSync('session_key', resc.data.session_key)
        //   },
        //   fail(){
        //     wx.showToast({
        //       icon:'none',
        //       title: '获取信息失败，请重试',
        //     })
        //   }
        // })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')
    _self = this
    this.getSession()
    this.setData({
      color:wx.getStorageSync('color')||'',
      openid:userInfo&&userInfo.openid
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