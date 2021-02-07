// pages/service/ggpt/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  onChangeScreen(e){
    let avg = e.currentTarget.dataset.item
    let newOption = this.data.currOption.screen.map((item)=>{
      if(avg.id == item.id){
        item.active = !item.active 
        if(item.data){
          item.data.map((itemc)=>{
            itemc.active = item.active
          })
        }
      }
      return {...item}
    })
    
    this.setData({
      currOption:{...this.data.currOption.currOption,screen:newOption}
    })
  },
  onChangeScreenItem(e){
    let avg = e.currentTarget.dataset.item
    let avgc = e.currentTarget.dataset.itemc
    
    let newOption = this.data.currOption.screen.map((item)=>{
      if(avg.id == item.id){
        let flag = true
        item.data.map((itemc)=>{
          if(avgc.id == itemc.id){
            itemc.active = !itemc.active
          }
          if(!itemc.active){
            flag = false
          }
        })
        item.active = flag
      }
      return {...item}
    })

    this.setData({
      currOption:{...this.data.currOption.currOption,screen:newOption}
    })
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