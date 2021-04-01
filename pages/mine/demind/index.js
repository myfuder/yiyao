// pages/mine/demind/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:'',title:'全部'},
      {id:'1',title:'需求'},
      {id:'2',title:'分享'},
      {id:'3',title:'临床热点/难点'},
      {id:'4',title:'评论'}
    ],
    activeId:''
  },
  edit(){
    wx.showToast({
      title: '点击了编辑',
    })
  },
  delete(e){
    let id = e.currentTarget.dataset.name
    let that = this
    wx.showModal({
      content: '确定删除吗？',
      success (res) {
        if (res.confirm) {
          that.selectComponent(id).close();
        }
      }
    })
  },
  onClick(event) {
    let id = event.detail.name
    this.setData({
      activeId:id
    })
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