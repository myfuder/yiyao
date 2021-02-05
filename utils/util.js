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
module.exports = {
  formatTime,
  debounce
}