// pages/search/index.js
import {debounce} from '../../utils/util'
let _self
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    option: [
      { text: '全网', value: "/pages/allOfSearch/index" },
      { text: '发现', value: "/pages/discovery/index"},
      { text: '服务', value: "/pages/service/index" },
      { text: '互动', value: "/pages/interaction/index" },
    ],
    searchvalue: "/pages/allOfSearch/index",
    history:[
      {name:'ewrwe'}, {name:'ewrweefdsfsfsf'}, {name:'ewrwedas'}, {name:'ewrwedasdasda'}, {name:'ewrweadadadadasdadadasda'}, {name:'ewrwedasda'}, {name:'ewrwe'}
    ],
    hots:[
      {name:'ewrwe'}, {name:'ewrweefdsfsfsf'}, {name:'ewrwedas'}, {name:'ewrwedasdasda'}, {name:'ewrweadadadadasdadadasda'}, {name:'ewrwedasda'}, {name:'ewrwe'}
    ],
    searchs:[
      {title:'样品'},{title:'样品'},{title:'样品'},{title:'样品'},
      {title:'样品'},{title:'样品'},{title:'样品'},{title:'样品'},
      {title:'样品'}
    ]
  },
  onChangeDrow(e){
    this.setData({
      searchvalue:e.detail
    })
  },
  onChange: debounce(function(e){
    _self.setData({
      value: e.detail,
    });
    console.log( _self.data.value)
  }),
  onSearch(e) {
    let value = e.currentTarget.dataset.value || this.data.value
    // wx.showToast({
    //   icon:'none',
    //   title: value,
    // })
    if(value == ''){
       wx.showToast({
        icon:'none',
        title: '搜索内容不能为空',
      })
    }else{
      wx.reLaunch({
        url: this.data.searchvalue+'?value='+value,
      })
    }
  },
  onCancel() {
    this.setData({
      value: '',
    });
    console.log( this.data.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this;
    this.setData({
      searchvalue:options.path||_self.data.option[0].value
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