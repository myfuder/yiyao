// pages/service/ggpt/index.js
const app = getApp()
import {
  ajax,basUrl
} from '../../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basUrl,
    typeActive:'',
    direction:0,  //0列表 1方格
    showPopup:false,
    currOption:{},
    typeOptions:[
      {id:'',value:'全部',},
      {id:'1',value:'第一科研大楼'},
      {id:'2',value:'第二科研大楼'},
      {id:'3',value:'第三科研大楼'},
      {id:'4',value:'第四科研大楼'},
      {id:'5',value:'华西医院本部'},
      {id:'6',value:'前沿医学中心'}
    ],
    pt_data:[
    ],
    pageNo:1
  },
  onChangeType(e){
    let item = e.currentTarget.dataset.item
    this.setData({
      typeActive:item.id,
      currOption:item
    })
    this.getList(1)
  },
  onClickPailie(e){
    this.setData({
      direction:this.data.direction==0?1:0
    })
  },
  getOptionList(){
    ajax.get('/api/kjfw/filter').then((res)=>{
      this.setData({
        typeOptions:[{id:'',value:'全部'}].concat(res.data.address.map((item)=>{
          return {id:item.id,value:item.name}
        })),
      })
    })
  },
  getList(pageNo){
    ajax.get(`/api/kjfw/platform?pageSize=100&pageNo=${pageNo}&parkId=${this.data.typeActive}`).then((res)=>{
      console.log(res)
      this.setData({
        pt_data:res.data.content.map((item)=>{
          return {...item,researchDirection:item.researchDirection.replace(/<[^>]*>|/g,"")}
        })
      })
    })
  },
  onFocus(){
    wx.navigateTo({
      url: '/pages/allOfSearch/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOptionList()
    this.getList(1)
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
      backgroundColor: '#D3D3D3'||wx.getStorageSync('color'),
      frontColor: '#ffffff',
    })
    this.setData({
      color:'#D3D3D3'||wx.getStorageSync('color'),
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