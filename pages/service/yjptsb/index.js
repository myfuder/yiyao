// pages/service/yjptsb/index.js
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
        label:'设备',
        value:'0',
      },{
        label:'平台',
        value:'1'
      }
    ],
    optionsType:[
      {
        label:'所属园区',
        value:0,
        childOptions:[{ text: '全部园区', value: 0 },{ text: '第一大楼', value: 1 },{ text: '第二大楼', value: 2 }]

      },{
        label:'设备类型',
        value:0,
        childOptions:[{ text: '全部设备', value: 0 },{ text: '设备1', value: 1 },{ text: '设备2', value: 2 }]
      }
    ]
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