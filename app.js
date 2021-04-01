// app.js
import {
  ajax
} from './utils/util';
App({
  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
        // this.globalData.height = t.statusBarHeight;
        // 导航高度
        let navHeight = res.statusBarHeight
        // 屏幕宽度/高度，单位px
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        // 状态栏的高度，单位px
        this.globalData.statusBarHeight = res.statusBarHeight
        // 设备像素比
        this.globalData.pixelRatio = res.pixelRatio
        // 可使用窗口宽度，单位px
        this.globalData.winWidth = res.windowWidth
        // 安卓时，胶囊距离状态栏8px，iOS距离4px
        if (res.system.indexOf('Android') !== -1) {
          this.globalData.navHeight = navHeight + 14 + 32
          this.globalData.navTitleTop = navHeight + 8
          // 视窗高度 顶部有占位栏时
          this.globalData.winHeight = res.screenHeight - navHeight - 14 - 32
          // tab主页视窗高度
          this.globalData.winHeightTab = res.windowHeight - navHeight - 14 - 32
        } else {
          this.globalData.navHeight = navHeight + 12 + 32
          this.globalData.navTitleTop = navHeight + 4
          // 视窗高度 顶部有占位栏时
          this.globalData.winHeight = res.screenHeight - navHeight - 12 - 32
          // tab主页视窗高度
          this.globalData.winHeightTab = res.windowHeight - navHeight - 12 - 32
        }
      }
    });
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        ajax.post(`/api/login?id=10001&password=123456`).then((res)=>{
          if(res.header&&res.header["Set-Cookie"]){
            wx.setStorageSync('cookie', res.header["Set-Cookie"])
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  setTabBar(){
    var curPageArr = getCurrentPages();    // 获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    // 获取当前页面的对象
    var pagePath = curPage.route;    // 当前页面url
    var activePagePath = '/' + pagePath;
    var tabBar = this.globalData.tabbar;
    for (var i = 0; i < tabBar.length; i++) {
      tabBar[i].active = false;
      var active = tabBar[i].pagePath;
      if (activePagePath === active) {
        tabBar[i].active = true;
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  globalData: {
    userInfo: null,
    tabbar:[
      {
        'pagePath': '/pages/index/index',
        'label':"首页",
        'value':'home',
        'icon':'iconfont icon-huaban33',
        active:true
      },
      {
        'pagePath': '/pages/discovery/index',
        'label':"发现",
        'value':'faxi',
        isTuchu:true,
        'icon':'icon-faxian',
      },
      {
        'pagePath': '/pages/service/index',
        'label':"服务",
        'value':'fuwu',
        isTuchu:true,
        'icon':'icon-fuwu',
      },
      {
        'pagePath': '/pages/interaction/index',
        'label':"互动",
        'value':'hudo',
        isTuchu:true,
        'icon':'icon-yuangonghudong',
      },
      {
        'pagePath': '/pages/mine/index',
        'label':"我的",
        'value':'mine',
        'icon':'icon-wode',
      }
    ],
  }
})
