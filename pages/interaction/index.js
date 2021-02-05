// pages/discovery/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeActive:'',
    direction:0,  //0列表 1方格
    value:'',
    tagValue:'0',
    options:[
      {
        label:'分享',
        value:'0',
        childOptions:[{ text: '全部', value: 0 },{ text: '分享信息', value: 1 },{ text: '技术合作', value: 2 }]
      },{
        label:'需求',
        value:'1',
        childOptions:[{ text: '全部', value: 0 },{ text: '需求信息', value: 1 },{ text: '其他', value: 2 }]
      }
    ],
  },
  onChangeType(e){
    let item = e.currentTarget.dataset.item
    this.setData({
      typeActive:item.id,
      currOption:item
    })
  },
  onClickPailie(e){
    this.setData({
      direction:this.data.direction==0?1:0
    })
  },
  onClickPopup(){
    this.setData({ showPopup: true });
  },
  onClosePopup() {
    this.setData({ showPopup: false });
  },
  onHandleTag(e){
    this.setData({
      tagValue:e.detail
    })
    // this.setData({ showPopup: false });
  },
  onTagItemChange(e){
    console.log(e.detail)
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
  onShow(){
    app.setTabBar();
    wx.setNavigationBarColor({
      backgroundColor: wx.getStorageSync('color'),
      frontColor: '#ffffff',
    })
    this.setData({
      color:wx.getStorageSync('color'),
      path:"/"+getCurrentPages()[0].route
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