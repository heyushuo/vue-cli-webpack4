// 使用方式 new Date().format("yyyy年MM月dd日 hh:mm:sss")
Date.prototype.format = function(fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function getUrlParam() {
  let search = window.location.search.substr(1)
  search = search.split('&')
  let result = {}
  for (let i = 0; i < search.length; i++) {
    let item = search[i].split('=')
    result[window.decodeURIComponent(item[0])] = window.decodeURIComponent(item[1])
  }
  return result
}

function obj2URLParams(basePath, obj) {
  let result = basePath;
  let isQuestionMarkEnd = basePath.endsWith('?');
  if (!isQuestionMarkEnd) {
    result += '?';
  }
  for (const key in obj) {
    result += `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}&`;
  }
  result = result.slice(0, result.length - 1);
  return result;
}

export {
  getUrlParam,
  obj2URLParams
}