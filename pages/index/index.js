// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    navTitle:'test',
    tabBar:[],
    scrollTop:0,
    banners:[
      {picPath:"http://match.oss.coolgua.com/4cc21d05-5508-40e5-b10d-ec9f30c7467c.png"},
      {picPath:"http://match.oss.coolgua.com/ef16a6cd-7dab-4f7e-ae26-4136b2fe56b9.png"},
    ],
    menus: [{
      name: "发现",
      image: 'https://xgyz.coolgua.com/icon/c2537.png',
      toPage: '/pages/discovery/index'
    },
    {
      name: "服务",
      image: 'https://xgyz.coolgua.com/icon/c2537.png',
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
    xw_data:[
      {
        fileUrl:'https://xgyz.coolgua.com/icon/c2537.png',
        articleTitle:'测试文章',
        createTime:'2021-01-13'
      },
      {
        fileUrl:'https://xgyz.coolgua.com/icon/c2537.png',
        articleTitle:'测试文章2',
        createTime:'2021-01-13'
      },
      {
        fileUrl:'https://xgyz.coolgua.com/icon/c2537.png',
        articleTitle:'测试文章3',
        createTime:'2021-01-13'
      }
    ],
    fx_data:[
      {
        fileUrl:'https://xgyz.coolgua.com/icon/c2537.png',
        articleTitle:'测试文章',
        createTime:'2021-01-13'
      },
      {
        fileUrl:'https://xgyz.coolgua.com/icon/c2537.png',
        articleTitle:'测试文章2',
        createTime:'2021-01-13'
      },
      {
        fileUrl:'https://xgyz.coolgua.com/icon/c2537.png',
        articleTitle:'测试文章3',
        createTime:'2021-01-13'
      }
    ],
    hd_data:[
      {
        fileUrl:'https://xgyz.coolgua.com/icon/c2537.png',
        articleTitle:'测试文章',
        createTime:'2021-01-13'
      },
      {
        fileUrl:'https://xgyz.coolgua.com/icon/c2537.png',
        articleTitle:'测试文章2',
        createTime:'2021-01-13'
      },
      {
        fileUrl:'https://xgyz.coolgua.com/icon/c2537.png',
        articleTitle:'测试文章3',
        createTime:'2021-01-13'
      }
    ]
  },
  onShow(){
    app.setTabBar()
  },
  onLoad() {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTitleTop: app.globalData.navTitleTop
    })
    wx.setStorageSync('color','#6915a1')
    this.setData({
      color:wx.getStorageSync('color')
    })
    // wx.setNavigationBarColor({
    //   backgroundColor: wx.getStorageSync('color'),
    //   frontColor: '#ffffff',
    // })
    // wx.setNavigationBarTitle({
    //   title: '首页',
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
