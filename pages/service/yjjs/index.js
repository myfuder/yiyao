const app = getApp()
import {
  ajax,basUrl,debounce
} from '../../../utils/util';
let _self;
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
    typeOptions:[],
    currActive:'',
    yj_data:[],
    key:''
  },
  onChange: debounce(function(e){
    _self.setData({
      key: e.detail,
    });
    _self.getList(1)
  }),
  onChangeType(e){
    let item = e.currentTarget.dataset.item
    this.setData({
      typeActive:item.id,
      item
      // currOption:item
    })
    this.getList()
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
  onChangeScreen(event){
    this.setData({
      currActive: event.detail,
      showPopup: false
    });
    this.getList()
  },
  getOptionList(){
    ajax.get('/api/kjfw/filter').then((res)=>{
      console.log(res)
      this.setData({
        typeOptions:[{id:'',value:'全部'}].concat(res.data.depType.map((item)=>{
          return {id:item.depType,value:item.typeName}
        })),
        currOption:{screen:[{id:'',value:'全部'}].concat(res.data.address.map((item)=>{
          return {id:item.id,value:item.name}
        }))}
      })
    })
  },
  getList(){
    ajax.get(`/api/kjfw/department?depType=${this.data.typeActive}&parkId=${this.data.currActive}`).then((res)=>{
      console.log(res)
      this.setData({
        yj_data:res.data.content.map((item)=>{
          return {...item,researchDirection:item.researchDirection.replace(/<[^>]*>|/g,"")}
        })
      })
    })
    // ajax.get(`/api/find/search?pageNo=1&pageSize=100&range=服务&kw=${this.data.key}`).then((res)=>{
    //   this.setData({
    //     yj_data:res.data.resultVo.content.map((item)=>{
    //       return  {...item,content:item.content.replace(/[^\u4e00-\u9fa5]/gi,""),}
    //     })
    //   })
    // })
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
    _self = this
    this.getOptionList()
    this.getList()
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