// 获取应用实例
const app = getApp()
import {
  ajax
} from '../../utils/util';

Page({
  data: {
    navTitle:'华西临床基础交叉合作',
    tabBar:[],
    scrollTop:0,
    banners:[
      {picPath:"http://match.oss.coolgua.com/4cc21d05-5508-40e5-b10d-ec9f30c7467c.png"},
      {picPath:"http://match.oss.coolgua.com/ef16a6cd-7dab-4f7e-ae26-4136b2fe56b9.png"},
    ],
    menus: [{
      name: "发现",
      image: 'https://xgyz.coolgua.com/icon/c2543.png',
      toPage: '/pages/discovery/index'
    },
    {
      name: "服务",
      image: 'https://xgyz.coolgua.com/icon/c2538.png',
      toPage:'/pages/service/index'
    },
    {
      name: "互动",
      image: 'https://xgyz.coolgua.com/icon/c2537.png',
      toPage: '/pages/interaction/index'
    }
    ],
    frinds:[
      {
        photo:'https://xgyz.coolgua.com/icon/c2537.png',
        name:'ttt'
      }, {
        photo:'https://xgyz.coolgua.com/icon/c2537.png',
        name:'ttt'
      }, {
        photo:'https://xgyz.coolgua.com/icon/c2537.png',
        name:'ttt'
      }, {
        photo:'https://xgyz.coolgua.com/icon/c2537.png',
        name:'ttt'
      }, {
        photo:'https://xgyz.coolgua.com/icon/c2537.png',
        name:'ttt'
      }, {
        photo:'https://xgyz.coolgua.com/icon/c2537.png',
        name:'ttt'
      }
    ],
    fx_data:[
    ],
    hd_data:[
    ],
    loading:false
  },
  getFxList(){
    ajax.get(`/api/find/search?pageNo=1&pageSize=3&range=发现`).then((res)=>{
      this.setData({
        loading:true,
        fx_data:res.data.resultVo.content.map((item)=>{
          return  {...item,content:item.content.replace(/[^\u4e00-\u9fa5]/gi,""),}
        }),
      })
    })
  },
  getHdList(){
    ajax.get(`/api/find/search?pageNo=1&pageSize=3&range=互动`).then((res)=>{
      console.log(res)
      this.setData({
        loading:true,
        hd_data:res.data.resultVo.content.map((item)=>{
          return  {...item,content:item.content.replace(/[^\u4e00-\u9fa5]/gi,""),}
        }),
      })
    })
  },
  getUserInfo(){
    return new Promise((resolve,reject)=>{
      if(wx.getStorageSync('token')){
        ajax.get(`/api/user/profile`).then((res)=>{
          if(res.code == 0){
            wx.setStorageSync('userInfo', res.data)
            resolve(res.data)
          }else{
            wx.reLaunch({
              url: '/pages/login/index',
            })
          }
        })
      }else{
        wx.reLaunch({
          url: '/pages/login/index',
        })
      }
    })
   
  },
  onShow(){
    
  },
  onLoad() {
    if(wx.getStorageSync('token')){
      this.getFxList()
      this.getHdList()
      app.setTabBar()
      this.setData({
        navHeight: app.globalData.navHeight,
        navTitleTop: app.globalData.navTitleTop
      })
      wx.setStorageSync('color','#6915a1')
      this.setData({
        color:wx.getStorageSync('color')
      })
    }else{
      wx.reLaunch({
        url: '/pages/login/index',
      })
    }
    // this.getUserInfo().then(()=>{
    // })
  },
  onReady(){
    // let isLogin = 
    // wx.reLaunch({
    //   url: 'pages/authorize/index',
    // })
  },
  onPageScroll(e){
    this.setData({
      scrollTop: e.scrollTop
    })
  }
})
