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
      {id:'1',value:'国家级平台',screen:[
        {id:'1',value:'发表年度',data:[{id:'1',value:'2021'},{id:'2',value:'2020'},{id:'3',value:'2019'}]},
        {id:'2',value:'收录情况',data:[{id:'1',value:'统计源'},{id:'2',value:'国内核心期刊'},{id:'3',value:'暂无'}]},
        {id:'3',value:'华西分级',data:[{id:'1',value:'华西特技'},{id:'2',value:'hx1'},{id:'3',value:'hx2'}]},
        {id:'4',value:'学科领域',data:[{id:'1',value:'免疫学'},{id:'2',value:'内分泌学'},{id:'3',value:'微生物学'}]},
        {id:'5',value:'论文类型',data:[{id:'1',value:'临床研究'},{id:'2',value:'临床护理'},{id:'3',value:'其他'}]}
      ]},
      {id:'2',value:'省部级平台',screen:[
        {id:'1',value:'国家级',data:[{id:'1',value:'2021'},{id:'2',value:'2020'},{id:'3',value:'2019'}]},
        {id:'2',value:'省部级',data:[{id:'1',value:'统计源'},{id:'2',value:'国内核心期刊'},{id:'3',value:'暂无'}]},
        {id:'3',value:'厅局级',data:[{id:'1',value:'华西特技'},{id:'2',value:'hx1'},{id:'3',value:'hx2'}]},
        {id:'4',value:'校级',data:[{id:'1',value:'免疫学'},{id:'2',value:'内分泌学'},{id:'3',value:'微生物学'}]},
        {id:'5',value:'其他',data:[{id:'1',value:'临床研究'},{id:'2',value:'临床护理'},{id:'3',value:'其他'}]}
      ]},
      {id:'3',value:'研究院/研究中心',screen:[
        {id:'1',value:'000'},
        {id:'2',value:'企业委托科技研发项目'},
        {id:'3',value:'成果转化'},
        {id:'4',value:'药品器械临床'},
        {id:'5',value:'院外科技服务'}
      ]},
      {id:'4',value:'基础研究所/室',screen:[
        {id:'1',value:'省科学技术进步奖'},
        {id:'2',value:'国家科学技术进步奖'},
        {id:'3',value:'市学技术进步奖'},
        {id:'5',value:'省科学技术进步奖'}
      ]},
      {id:'5',value:'临床研究所/室',screen:[
        {id:'1',value:'专著',data:[{id:'1',value:'2021'},{id:'2',value:'2020'},{id:'3',value:'2019'}]},
        {id:'2',value:'编著',data:[{id:'1',value:'统计源'},{id:'2',value:'国内核心期刊'},{id:'3',value:'暂无'}]},
        {id:'3',value:'译著',data:[{id:'1',value:'华西特技'},{id:'2',value:'hx1'},{id:'3',value:'hx2'}]},
      ]},
      {id:'6',value:'院企合建实验室/平台',screen:[
        {id:'1',value:'发明专利'},
        {id:'2',value:'国际发明专利'},
      ]},
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
    this.setData({
      typeOptions:this.data.typeOptions.map((item)=>{
        return {...item,screen:
          [
            {id:'1',value:'全部',data:[{id:'1',value:'第一科研大楼'},{id:'2',value:'第二科研大楼'},{id:'3',value:'第三科研大楼'},{id:'4',value:'第四科研大楼'},{id:'5',value:'华西医院本部'},{id:'6',value:'前沿医学中心'}]}
          ]}
      }),
    },()=>{
      this.setData({
        currOption:this.data.typeOptions[0]
      })
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