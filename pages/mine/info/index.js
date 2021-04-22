// pages/mine/info/index.js
import {ajax,debounce,basUrl} from '../../../utils/util'
let _self;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    params:{
      username:'',
      sex:'',
      birthday:'',
      tel:'',
      email:'',
      graduateSchool:'',
      major:'',
      education:'',
      academicDegree:'',
      department:'',
      joinTime:'',
      technicalTitle:''
    },
    
    password:'',
    show:false,
    show1:false,
    date:'',
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    minDate: new Date(1970, 1, 1).getTime(),
    headImage:'https://img.yzcdn.cn/vant/cat.jpeg',
    tags:[],
    tagsEn:[],
    tagValue:'',
    tagValueEn:'',
  },
  onChangeInput:debounce(function(e){
    let name = e.currentTarget.dataset.name
    _self.setData({
      params:{..._self.data.params,[name]:e.detail},
    });
  }),
  onChangeRadio(event) {
    this.setData({
      params:{...this.data.params,sex:event.detail},
    });
  },
  formsubmit(e){
    console.log(e.detail.value)
    ajax.post(`/api/user/like?like=${this.data.tags.join(',')}&likeen=${this.data.tagsEn.join(',')}&email=${this.data.params.email}`).then((res)=>{
      wx.showToast({
        icon:'none',
        title: res.message,
      })
    })
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
    debugger
    this.setData({
      params:{...this.data.params,birthday:this.formatDate(event.detail)},
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
      params:{...this.data.params,joinTime:this.formatDate(event.detail)},
      show1: false
    });
  },
  onTagClose(event) {
    // this.setData({
    //   [`show.${event.target.id}`]: false,
    // });
    let key = event.currentTarget.dataset.key
    _self.setData({
      tags:_self.data.tags.filter((item)=>{return item!=key}),
      // params:{
      //   ..._self.params,
      //   mylike:
      // },
    })
  },
  onTagCloseEn(event){
    let key = event.currentTarget.dataset.key
    _self.setData({
      tagsEn:_self.data.tagsEn.filter((item)=>{return item!=key})
    })
  },
  afterRead(event) {
    console.log(event)
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.showLoading({
      title: '正在上传',
    })
    wx.uploadFile({
      url: basUrl+'/api/user/avatar', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      header:{
        'token':wx.getStorageSync('token'),
        'X-Requested-With':'X-Requested-With'
      },
      success:(res)=>{
        if(res.statusCode == 200){
          wx.showToast({
            title: '上传成功',
          })
          let data = JSON.parse(res.data)
          this.setData({
            headImage: basUrl+'/'+data.path
          })
        }else{
          wx.showToast({
            title: '上传失败',
          })
        }
      },
      fail:()=>{
        wx.showToast({
          title: '上传失败'
        })
      }
    });
  },
  onBlurTags(e){
    let value = e.detail.value
    if(value){
      _self.setData({
        tagValue:'',
        tags:[value].concat(_self.data.tags)
      })
    }
  },
  onBlurTagsEn(e){
    let value = e.detail.value
    if(value){
      _self.setData({
        tagValueEn:'',
        tagsEn:[value].concat(_self.data.tagsEn)
      })
    }
  },
  getUserInfo(){
    ajax.get(`/api/user/profile`).then((res)=>{
      let mylike = res.data.mylike.split("|")
      let tags = [],tagsEn = []
      this.setData({
        // this.formatDate(event.detail)
        params:{
          ...res.data,
          joinTime:this.formatDate(res.data.joinTime),
          birthday:this.formatDate(res.data.birthday),
        },
        headImage:basUrl+res.data.avatar,
        tags:mylike[0]&&mylike[0].split(",")||[],
        tagsEn:mylike[1]&&mylike[1].split(",")||[]
      })
    })
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