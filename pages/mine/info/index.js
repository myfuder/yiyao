// pages/mine/info/index.js
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