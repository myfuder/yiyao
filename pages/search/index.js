// pages/search/index.js
import {ajax,debounce} from '../../utils/util'
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
    tuij:[
      {name:'基因'}, {name:'lung cancer'}, {name:'cancer'}
    ],
    hots:[],
  },
  onChangeType(e){
    let item = e.currentTarget.dataset.item
    this.setData({
      typeActive:item.id,
    })
    // this.getSomeDataFromServer()
  },
  onChangeDrow(e){
    this.setData({
      searchvalue:e.detail
    })
    // this.getSomeDataFromServer()
  },
  getSomeDataFromServer(){
    wx.showToast({
      title: this.data.searchvalue+' '+this.data.value+' '+this.data.typeActive,
    })
  },
  onChange: debounce(function(e){
    _self.setData({
      value: e.detail,
    });
    console.log( _self.data.value)
    // _self.getSomeDataFromServer()
  }),
  onSearch(e) {
    let value = e.currentTarget.dataset.value || this.data.value
    // _self.setData({
    //   value: value,
    // });
    // this.getSomeDataFromServer()
    if(value == ''){
       wx.showToast({
        icon:'none',
        title: '搜索内容不能为空',
      })
    }else{
      wx.navigateTo({
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
  // /api/wordcloud
  getWordCloud(){
    ajax.get(`/api/wordcloud`).then((res)=>{
      this.setData({
        hots:Object.keys(res.data)
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this;
    this.setData({
      searchvalue:options.path||_self.data.option[0].value
    })
    this.getWordCloud()
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