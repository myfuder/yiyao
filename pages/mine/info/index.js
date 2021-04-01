// pages/mine/info/index.js
import {ajax,debounce} from '../../../utils/util'
let _self;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    show:false,
    date:'',
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date(1970, 1, 1).getTime(),
    headImage:'https://img.yzcdn.cn/vant/cat.jpeg',
    tags:[],
    tagValue:''
  },
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
  formsubmit(e){
    console.log(e.detail.value)
  },
  onDisplay() {
    this.setData({ show: true });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  },
  onCancle(){
    this.setData({ show: false });
  },
  onClose(){
    this.setData({ show: false });
  },
  onConfirm(event){
    this.setData({
      date:this.formatDate(event.detail),
      currentDate: event.detail,
      show: false
    });
  },
  onTagClose(event) {
    // this.setData({
    //   [`show.${event.target.id}`]: false,
    // });
  },
  afterRead(event) {
    console.log(event)
    const { file } = event.detail;
    this.setData({
      headImage: file.url
    })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        // const { fileList = [] } = this.data;
        // fileList.push({ ...file, url: res.data });
        // this.setData({ fileList });
      },
    });
  },
  onBlurTags(e){
    let value = e.detail.value
    _self.setData({
      tagValue:'',
      tags:[value].concat(_self.data.tags)
    })
  },
  getUserInfo(){
    ajax.get(`/api/user/profile`).then((item)=>{
      debugger
    })
  },
  das(e){
    debugger
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this
    this.getUserInfo()
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