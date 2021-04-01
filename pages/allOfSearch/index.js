// pages/discovery/index.js
import {
  ajax,debounce
} from '../../utils/util';
let _self;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeActive:'全部',
    direction:0,  //0列表 1方格
    showPopup:false,
    key:'',
    taginfo:[],
    currOption:{},
    typeOptions:[
      // {id:'',value:'全部',},
      // {id:'科技论文',value:'科技论文',screen:[
      //   {id:'发表年度',value:'发表年度',data:[{id:'2021',value:'2021'},{id:'2020',value:'2020'},{id:'2019',value:'2019'}]},
      //   {id:'收录情况',value:'收录情况',data:[{id:'统计源',value:'统计源'},{id:'2',value:'国内核心期刊'},{id:'3',value:'暂无'}]},
      //   {id:'3',value:'华西分级',data:[{id:'1',value:'华西特技'},{id:'2',value:'hx1'},{id:'3',value:'hx2'}]},
      //   {id:'4',value:'学科领域',data:[{id:'1',value:'免疫学'},{id:'2',value:'内分泌学'},{id:'3',value:'微生物学'}]},
      //   {id:'5',value:'论文类型',data:[{id:'1',value:'临床研究'},{id:'2',value:'临床护理'},{id:'3',value:'其他'}]}
      // ]},
      // {id:'计划项目',value:'计划项目',screen:[
      //   {id:'1',value:'国家级',data:[{id:'1',value:'2021'},{id:'2',value:'2020'},{id:'3',value:'2019'}]},
      //   {id:'2',value:'省部级',data:[{id:'1',value:'统计源'},{id:'2',value:'国内核心期刊'},{id:'3',value:'暂无'}]},
      //   {id:'3',value:'厅局级',data:[{id:'1',value:'华西特技'},{id:'2',value:'hx1'},{id:'3',value:'hx2'}]},
      //   {id:'4',value:'校级',data:[{id:'1',value:'免疫学'},{id:'2',value:'内分泌学'},{id:'3',value:'微生物学'}]},
      //   {id:'5',value:'其他',data:[{id:'1',value:'临床研究'},{id:'2',value:'临床护理'},{id:'3',value:'其他'}]}
      // ]},
      // {id:'横向项目',value:'横向项目',screen:[
      //   {id:'1',value:'000'},
      //   {id:'2',value:'企业委托科技研发项目'},
      //   {id:'3',value:'成果转化'},
      //   {id:'4',value:'药品器械临床'},
      //   {id:'5',value:'院外科技服务'}
      // ]},
      // {id:'科研成果',value:'科研成果',screen:[
      //   {id:'1',value:'省科学技术进步奖'},
      //   {id:'2',value:'国家科学技术进步奖'},
      //   {id:'3',value:'市学技术进步奖'},
      //   {id:'5',value:'省科学技术进步奖'}
      // ]},
      // {id:'科研专著',value:'科研专著',screen:[
      //   {id:'1',value:'专著',data:[{id:'1',value:'2021'},{id:'2',value:'2020'},{id:'3',value:'2019'}]},
      //   {id:'2',value:'编著',data:[{id:'1',value:'统计源'},{id:'2',value:'国内核心期刊'},{id:'3',value:'暂无'}]},
      //   {id:'3',value:'译著',data:[{id:'1',value:'华西特技'},{id:'2',value:'hx1'},{id:'3',value:'hx2'}]},
      // ]},
      // {id:'专利',value:'专利',screen:[
      //   {id:'1',value:'发明专利'},
      //   {id:'2',value:'国际发明专利'},
      // ]},
    ],
    fx_data:[],
  },
  onChange: debounce(function(e){
    _self.setData({
      key: e.detail,
    });
    _self.getList(1,true)
    // _self.getSomeDataFromServer()
  }),
  onChangeType(e){
    let item = e.currentTarget.dataset.item
    this.setData({
      typeActive:item.id,
      currOption:item
    })
    this.getList(1)
    console.log(this.data.typeActive,this.data.currOption)
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
    let taginfo = []
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
      currOption:{...this.data.currOption.currOption,screen:newOption},
    })
    this.getList(1)
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
    this.getList(1)
  },
  /**
   * @param {*} pageNo 
   * @param {*} isTypeChange 是否重新加载typeOptions
   */
  getList(pageNo,isTypeChange){
    let taginfo = []
    if( this.data.currOption.screen){
      this.data.currOption.screen.map((item)=>{
        item.data.map((itemc)=>{
          if(itemc.active){
            taginfo.push(item.id+":"+itemc.id)
          }
        })
      })
    }
    ajax.get(`/api/find/search?pageNo=${pageNo}&pageSize=100&range=&type=${this.data.typeActive}&taginfo=${taginfo.join("@")}&kw=${this.data.key}`).then((res)=>{
      console.log(res)
      let {resultVo,statisVO} = res.data
      if(isTypeChange){
        this.setData({
          typeOptions:Object.keys(statisVO).map((key)=>{
            let screen = []
            let {tagNodes,subNodes} = statisVO[key]
            let tags = Object.keys(tagNodes)
            let subs = Object.keys(subNodes)
            if(tags.length>0){
              tags.map((tag)=>{
                screen.push({id:tag,value:tag,data:Object.keys(tagNodes[tag]).map((d)=>{return {id:d,value:d}})})
              })
              screen.push({id:"论文类型",value:"论文类型",data:subs.map((tag)=>{
                return {id:tag,value:tag,data:Object.keys(subNodes[tag].subNodes).map((d)=>{return {id:d,value:d}})}
              })})
            }else{
              subs.map((tag)=>{
                screen.push({id:tag,value:tag,data:Object.keys(subNodes[tag].subNodes).map((d)=>{return {id:d,value:d}})})
              })
            }
            return {
              id:key,value:key,screen:screen
            }
          })
        })
      }
      this.setData({
        fx_data:resultVo.content.map((item)=>{
          return  {...item,content:item.content.replace(/[^\u4e00-\u9fa5]/gi,""),}
        }),
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    _self = this
    this.setData({
      key:options.value||'',
      navHeight: app.globalData.navHeight,
      navTitleTop: app.globalData.navTitleTop
    })
    this.getList(1,true)
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
    wx.setNavigationBarTitle({
      title: '搜索',
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