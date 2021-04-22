const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const types = {
  "fx":[
    {id:'1',value:'科技论文',},
    {id:'2',value:'计划项目',},
    {id:'3',value:'横向项目',},
    {id:'4',value:'科研成果',},
    {id:'5',value:'科研专著',},
    {id:'6',value:'专利',},
  ],
  "hd":[
    {id:'1',value:'需求/分享',},
    {id:'2',value:'分享',},
    {id:'3',value:'需求',}
  ],
  "fw":[
    {id:'1',value:'科技服务',},
    {id:'2',value:'研究所/室介绍',},
    {id:'3',value:'公共平台',},
    {id:'4',value:'研究平台/设备',}
  ]
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
function debounce(func, wait=500) {
  let timeout;  // 定时器变量
  return function(event){
      clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
      event.persist && event.persist()   //保留对事件的引用
      //const event = e && {...e}   //深拷贝事件对象
      timeout = setTimeout(()=>{
          func(event)
      }, wait);  // 指定 xx ms 后触发真正想进行的操作 handler
  };
}
const basUrl = "http://tester.youbewon.com:8908"
var ajax_ = (params,callback) => new Promise((resolve, reject) => {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    method: params.method,
    url: basUrl+params.url,
    data: params.data || params.params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'token':wx.getStorageSync('token'),
      'X-Requested-With':'XMLHttpRequest'
    //   'Authorization': wx.getStorageSync('token')
    },
    success(res) {
      var data = res.data;
      if(callback){
        callback(res.data)
      }else{
        if(data.code == 0){
          resolve(data);
        }else if(data.code == -1){
          wx.reLaunch({
            url: '/pages/login/index',
          })
        }else{
          wx.showModal({
            content: '加载出错了',
            showCancel:false,
          })
          reject();
        }
      }
      
    },
    fail(e) {
      wx.showModal({
        content: '加载出错了',
        showCancel:false,
      })
      reject(e);
    },
    complete(){
      wx.hideLoading({})
    },
  });
});

const ajax = {
  post(url, options,callback) {
    var params = {};
    params.method = 'POST';
    params.url = url;
    params.data = options;
    return ajax_(params,callback);
  },
  get(url, options,callback) {
    var params = {};
    params.method = 'GET';
    params.url = url;
    params.data = options;
    return ajax_(params,callback);
  }
};
module.exports = {
  formatTime,
  debounce,
  ajax,
  basUrl
}
