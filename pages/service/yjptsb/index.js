// pages/service/yjptsb/index.js
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
    direction:0,  //0列表 1方格
    value:'',
    tagValue:'0',
    options:[
      {
        label:'科研设备',
        value:'0',
      },{
        label:'研究平台',
        value:'1'
      }
    ],
    yqOptions:[{ text: '全部园区', value: 0 },{ text: '第一大楼', value: 1 },{ text: '第二大楼', value: 2 }],
    yqActive:'',
    sbOptions:[{ text: '全部设备', value: 0 },{ text: '设备1', value: 1 },{ text: '设备2', value: 2 }],
    sbActive:'',
    sb_data:[],
    pt_data:[],
    pageNo:1,
    isEnd:false
  },
  onClickPailie(e){
    this.setData({
      direction:this.data.direction==0?1:0
    })
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
  yqdropChange(event){
    console.log(event.detail)
    this.setData({
      yqActive:event.detail,
      pageNo:1,
      isEnd:false,
      sb_data:[]
    })
    this.getSbList(this.data.pageNo)
  },
  sbdropChange(event){
    console.log(event.detail)
    this.setData({
      sbActive:event.detail,
      pageNo:1,
      isEnd:false,
      sb_data:[]
    })
    this.getSbList(this.data.pageNo)
  },
  getOptionList(){
    ajax.get('/api/kjfw/filter').then((res)=>{
      console.log(res)
      this.setData({
        yqOptions:[{value:'',text:'全部'}].concat(res.data.address.map((item)=>{
          return {value:item.id,text:item.name}
        })),
        sbOptions:[{value:'',text:'全部'}].concat(res.data.equMoel.map((item)=>{
          return {value:item.id,text:item.name}
        }))
      })
    })
  },
  getSbList(pageNo){
    ajax.get(`/api/kjfw/equipment?pageSize=10&pageNo=${pageNo}&parkId=${this.data.yqActive}&modelId=${this.data.sbActive}`).then((res)=>{
      console.log(res)
      this.setData({
        isEnd:this.data.pageNo == res.data.totalPages,
        sb_data:this.data.sb_data.concat(res.data.content.map((item)=>{return {...item,url:item.url?item.url.indexOf('storage')>0?basUrl+item.url:'http://kyjdxt.cd120.com'+item.url:basUrl+'/dist/images/kyjd/no6.png'}}))
      })
    })
  },
  getPtList(){
    ajax.get(`/api/kjfw/equplat`).then((res)=>{
      console.log(res)
      this.setData({
        pt_data:res.data
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
    this.getSbList(this.data.pageNo)
    this.getPtList()
  },
  scroll(e){
    if(!this.data.isEnd){
      if(this.data.tagValue == 0){
        this.setData({
          pageNo:this.data.pageNo + 1
        })
        this.getSbList(this.data.pageNo)
      }
      else{

      }
    }
    console.log(e)
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