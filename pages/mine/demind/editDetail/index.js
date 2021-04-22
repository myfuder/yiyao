// pages/mine/demind/editDetail/index.js
import {ajax,debounce} from '../../../../utils/util'
let _self
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    show1: false,
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date(1970, 1, 1).getTime(),
    tagValue:'',
    params:{
      type:'',
      subtype:'',
      title:'',
      reqEndTime:'',
      tags:[],
      content:'',
    },
    actions: [
      {
        name: '选项',
      },
      {
        name: '选项',
      },
      {
        name: '选项',
      },
    ],
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
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onDisplay(){
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    this.setData({ 
      show: false ,
      params:{...this.data.params,subtype:event.detail.name}
    });
  },
  onBlurTags(e){
    let value = e.detail.value
    if(value && this.data.params.tags.length<4){
      _self.setData({
        params:{...this.data.params,tags:[value].concat(_self.data.params.tags)}
      })
    }
    _self.setData({
      tagValue:''
    })
  },
  onTagClose(event){
    let key = event.currentTarget.dataset.key
    _self.setData({
      'params.tags': _self.data.params.tags.filter((item)=>{return item!=key})
    })
  },
  onDisplay1(){
    this.setData({ show1: true });
  },
  onClose1() {
    this.setData({ show1: false });
  },
  onCancle1(){
    this.setData({ show1: false });
  },
  onConfirm1(event){
    this.setData({
      params:{...this.data.params,reqEndTime:this.formatDate(event.detail)},
      show1: false
    });
  },
  formsubmit(){
    let p = this.data.params
    for(let key in p){
      if(key!='reqEndTime'&&key!='content'&&p[key] == ''||p[key].length==0){
        wx.showToast({
          title: '请将信息填写完整',
        })
        return
      }
    }
    ajax.post('/api/inter/post/submit',{id:this.data.id,...p,tags:p.tags.join(',')}).then((res)=>{
      console.log(res)
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
  getSubfilter(){
    ajax.get(`/api/inter/subfilter`).then((res)=>{
      this.setData({
        actions:res.data
      })
    })
  },
  getDetailById(id,type){
    let p = {}
    ajax.get(`/api/find/detail?id=${id}&type=${type}`).then((res)=>{
      for(let key in this.data.params){
        p[key] = res.data.detail[key]
      }
      this.setData({
        params:{...p,tags:res.data.detail.summary.split(',')}
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this
    this.getSubfilter()
    if(options.id){
      this.setData({
        id:options.id,
        type:options.type
      })
      this.getDetailById(options.id,options.type)
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
      title: '发布需求/分享',
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