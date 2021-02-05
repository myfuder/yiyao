// components/card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showTitle:{
      type:'Boolean',
      value:true
    },
    title:{
      type:'String',
      value:''
    }
  },
  attached() {
    // 在组件实例进入页面节点树时执行
    // 获取顶部导航高度
    this.setData({
      color: wx.getStorageSync('color')
    })
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
