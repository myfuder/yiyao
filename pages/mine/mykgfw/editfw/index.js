// pages/mine/mykgfw/editfw/index.js
import {ajax,debounce} from '../../../../utils/util'
let _self
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date(1970, 1, 1).getTime(),
    params:{
      title:'',
      type:'',
      styField:'',
      joinNum:'',
      address:'',
      addressQt:'',
      reqStartTime:'',
      reqEndTime:'',
      needSuporrt:'',
      content:''
    },
    show:false,
    show1:false
  },
  onChangeInput:debounce(function(e){
    let name = e.currentTarget.dataset.name
    _self.setData({
      params:{..._self.data.params,[name]:e.detail},
    });
  }),
  onChangeRadio(event) {
    let name = event.currentTarget.dataset.name
    this.setData({
      params:{...this.data.params,[name]:event.detail},
    });
  },
  onDisplay() {
    this.setData({ show: true });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  },
  onCancle(){
    this.setData({ show: false });
  },
  onClose(){
    this.setData({ show: false });
  },
  onConfirm(event){
    this.setData({
      params:{...this.data.params,reqStartTime:this.formatDate(event.detail)},
      show: false
    });
  },
  onDisplay1() {
    this.setData({ show1: true });
  },
  onCancle1(){
    this.setData({ show1: false });
  },
  onClose1(){
    this.setData({ show1: false });
  },
  onConfirm1(event){
    this.setData({
      params:{...this.data.params,reqEndTime:this.formatDate(event.detail)},
      show1: false
    });
  },
  formsubmit(e){
    for(let key in this.data.params){
      if(key!=='addressQt'&key!=='needSuporrt'&&!this.data.params[key]){
        wx.showToast({
          title: '请将信息填写完整',
        })
        return
      }
    }
    ajax.post('/api/kjfw/post/submit',{id:this.data.id,...this.data.params}).then((res)=>{
      wx.showToast({
        title: res.message,
        success(){
          if(res.code == 0){
            wx.navigateBack()
          }
        }
      })
    })
  },
  // /api/kjfw/detail
  getDetailById(){
    ajax.get('/api/kjfw/detail?id='+this.data.id).then((res)=>{
      let p = {}
      for(let key in this.data.params ){
        p[key] = res.data[key]
      }
      this.setData({
        params:{...p, reqStartTime:this.formatDate(p.reqStartTime), reqEndTime:this.formatDate(p.reqEndTime)}
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this
    if(options.id){
      this.setData({
        id:options.id
      })
      this.getDetailById()
    }
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
    wx.setNavigationBarTitle({
      title: '新建服务',
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