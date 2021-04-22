// components/tagSwatch/tagSwatch.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    normalstyle:{
      type:"String",
      value:''
    },
    activestyle:{
      type:"String",
      value:'border-bottom:2px solid '+wx.getStorageSync('color')
    },
    between:{
      type:'Boolean',
      value:false
    },
    right:{
      type:"String",
      value:'124rpx'
    },
    default:{
      type:"String",
      value:''
    },
    options:{
      type:Array,
      value:[],
      observer:function(newVal,oldVal,change){
        this.setData({
          optionsC:newVal,
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    color:''
  },
  attached() {
    // 在组件实例进入页面节点树时执行
    this.setData({
      value: this.properties.default||(this.properties.options&&this.properties.options[0].value),
      optionsC:this.properties.options,
      color:wx.getStorageSync('color'),
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleclick(e){
      let value = e.currentTarget.dataset.value
      this.setData({
        value:value
      },()=>{
        this.triggerEvent('handleEvent', value)
      })
    },
    onChange(e){
      this.triggerEvent('onTagItemChange', e.detail)
    }
  }
})
