// pages/mine/demind/index.js
import {ajax,debounce} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {id:'lw',title:'论文',},
      {id:'cg',title:'成果'},
      {id:'xm',title:'项目'},
      {id:'xq',title:'需求',isEdit:true,isDelete:true},
      {id:'fx',title:'分享',isEdit:true,isDelete:true},
      {id:'rd',title:'临床热点/难点',isEdit:true,isDelete:true},
      {id:'pl',title:'评论',isDelete:true,isEdit:false},
    ],
    currTab:{},
    activeId:'lw',
    list:[],
    toPagePath:''
  },
  edit(e){
    let {id,type,name} = e.currentTarget.dataset
    this.selectComponent(name).close();
    // wx.showToast({
    //   title: '点击了编辑',
    // })
    wx.navigateTo({
      url: '/pages/mine/demind/editDetail/index?id='+id+'&type='+type,
    })
  },
  delete(e){
    let {name,id} = e.currentTarget.dataset
    let that = this
    wx.showModal({
      content: '确定删除吗？',
      success (res) {
        if (res.confirm) {
          that.selectComponent(name).close();
          if(that.data.activeId == 'pl'){
            ajax.post(`/api/comment/delete?id=${id}`).then((res)=>{
              wx.showToast({
                icon:'none',
                title: res.message,
              })
              that.getPlList()
            })
          }else{
            ajax.post(`/api/inter/post/del?id=${id}`).then((res)=>{
              wx.showToast({
                icon:'none',
                title: res.message,
              })
              that.getList()
            })
          }
        }
      }
    })
  },
  onClick(event) {
    let name = event.detail.name
    this.setData({
      currTab:name,
      activeId:name.id
    })
    if(name.id == 'pl'){
      this.setData({
        toPagePath:name.post&&name.post.type == '科技论文'?'/pages/details/detail1/index':'/pages/service/kgfw/detail/index'
      })
      this.getPlList()
    }else{
      this.getList()
    }
  },
  getPlList(){
    this.setData({
      list:[]
    })
    ajax.get(`/api/mycomments?pageNo=1&pageSize=1000`,{type:'other',}).then((res)=>{
      this.setData({
        list:res.data.content
      })
    })
  },
  // /api/post/
  getList(){
    this.setData({
      list:[]
    })
    ajax.get(`/api/post`,{userid:wx.getStorageSync('userInfo').id,method:this.data.activeId}).then((res)=>{
      this.setData({
        list:res.data.content.map((item)=>{return {...item,content:item.content.replace(/[^\u4e00-\u9fa5]/gi,"")}})
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      color:wx.getStorageSync('color')
    })
    wx.setNavigationBarColor({
      backgroundColor: wx.getStorageSync('color'),
      frontColor: '#ffffff',
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
    this.getList()
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