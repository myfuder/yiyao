// components/navbar/tabbar/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    color:{
      type:String,
      value:wx.getStorageSync('color')
    },
    tabBar:{
      type:Array,
      value:[]
    }
  },
  attached() {
    // this.setData({
    //   color: wx.getStorageSync('color'),
    // })
  },
  observers:{
    "tabBar":function(avg){
      console.log(avg)
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    color:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
