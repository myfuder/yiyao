const app = getApp()
import {
  ajax,debounce
} from '../../utils/util';

let _self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeActive:'',
    direction:0,  //0列表 1方格
    key:'',
    value:'',
    tagValue:'',
    tagItemValue:'',
    pageNo:'',
    
    options:[
    ],
    hd_data:[
      // {
      //   type:'分享信息',
      //   articleTitle:'求隐睾患者样品',
      //   content:'目前本人及合作者通过2个隐睾家系锁定了几个候选变异。希望能通过进一步扩大隐睾的样品，以精确锁定相关致病基因和变异。现诚寻临床样本合作者，来提高变异鉴定的准确性。为祖国科研做贡献。',
      //   createTime:'2021-01-13'
      // },
    ]
  },
  onChange: debounce(function(e){
    _self.setData({
      key: e.detail,
    });
    _self.getList(1)
    console.log( _self.data.key)
    // _self.getSomeDataFromServer()
  }),
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
    this.getList(1)
    // this.setData({ showPopup: false });
  },
  onTagItemChange(e){
    this.setData({
      tagItemValue:e.detail
    })
    this.getList(1)
  },
  // /api/inter/filter
  getOptions(){
    ajax.get(`/api/inter/filter`).then((res)=>{
      let subs = res.data
      this.setData({
        options:res.data.map((item)=>{
          return {
            label:item.name,
            value:item.value,
            childOptions:item.subvalue.map((itemc)=>{
              return { text: itemc.name, value: itemc.name }
            })
          }
        })
      })
    })
  },
  getList(pageNo,key){
    ajax.get(`/api/find/search?pageNo=${pageNo}&pageSize=100&range=互动&type=${this.data.tagValue}&subtype=${this.data.tagItemValue}&kw=${this.data.key}`).then((res)=>{
      this.setData({
        hd_data:res.data.resultVo.content.map((item)=>{
          return  {...item}
        })
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this;
    this.setData({
      key:options.value||'',
    })
    this.getOptions()
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
      backgroundColor: '#254A8A'||wx.getStorageSync('color'),
      frontColor: '#ffffff',
    })
    this.setData({
      color:'#254A8A'||wx.getStorageSync('color'),
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