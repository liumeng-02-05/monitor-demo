// 注册事件
function onLoader() {
  // 发送sendPV
  // sendPV()
  addEventListener(document, 'tap', doTrace);
}
  // 使用image.src发送跨越请求
/*
  data: 埋点信息
  Url: 请求地址
  local_time: 本地上报时间
  event_type: 事件类型
  parameter： 自定义参数
*/
function imageSrc(data,Url,local_time,parameter,event_type) {
  var img = new Image();
  var src = `http://localhost:5002/${Url}?data=`+ data + '&local_time=' + local_time  +  (parameter ? '&custom=' + parameter : '') + (event_type ? '&event_type=' + event_type : '');
  img.src = src;
  img = null; // 删除临时变量的引用
}
// 绑定事件
var atta = !!document.attachEvent;
var s_attachEvent = 'attachEvent';
var s_addEventListener = 'addEventListener';
var onevent = atta ? s_attachEvent : s_addEventListener;
var s_HTML = 'HTML';
var s_BODY = 'BODY';
function addEventListener(obj, event_type, f) {
  if (event_type == 'tap') {
    tapEventBind(obj, f);
    return;
  }
  obj[onevent]((atta ? 'on' : '') + event_type, function (e) {
    e = e || win.event;
    var el = e.target || e.srcElement;

    f(el);
  });
}
function tapEventBind(element, fn) {
  var isTouch = 'ontouchend' in document.createElement('div'),
    tstart = isTouch ? 'touchstart' : 'mousedown';
  addEventListener(element, tstart, function (e) {
    fn && fn(e);
  });
}
// 点击事件执行
function doTrace(el) {
  const B = document.getElementsByTagName('body')[0].getAttribute('data-imooc-spm')
  const metaList = document.getElementsByTagName('meta')
  let A
  for(var i = 0; i < metaList.length ; i ++){
    if(metaList[i].getAttribute('name') == 'spm-id'){
      A = metaList[i].getAttribute('content')
    }
  }
  var tag_name;
  while (el && (tag_name = el.tagName)) {
    if (tag_name == 'A' || tag_name == 'AREA') {
      const parset = parentAttribute(el)
      const C = parset.getAttribute('data-imooc-spm')
      const D = 'main' + el.innerHTML
      // 点到了链接上
      const imoocSpm = A + '.' + B + '.' + C + '.' + D +'.' +randomString(6)
      imageSrc(imoocSpm,'hello', new Date().getTime());
    } else if (tag_name == s_BODY || tag_name == s_HTML) {
      break;
    }
    el = el.parentNode;
  }
}
// 获取父节点属性
function parentAttribute(el){
  if(!el.getAttribute('data-imooc-spm')){
    return parentAttribute(el.parentNode)
  }else{
    return el
  }
}

//生成指定长度的随机数字字符
function randomString(length) {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for(let i = 0; i<length; i++)
  {
    let id = Math.floor(Math.random() * str.length);
    result += str[id];
  }
  return result;
}
// PV（初始化发送埋点信息）
function sendPV(){
  const B = document.getElementsByTagName('body')[0].getAttribute('data-imooc-spm')
  const metaList = document.getElementsByTagName('meta')
  let A
  for(var i = 0; i < metaList.length ; i ++){
    if(metaList[i].getAttribute('name') == 'spm-id'){
      A = metaList[i].getAttribute('content')
    }
  }
  imageSrc(A + '.'+B,'sendPv', new Date().getTime())
}
// 发送自定义事件
function customEvent(el,exposure){
  const B = document.getElementsByTagName('body')[0].getAttribute('data-imooc-spm')
  const metaList = document.getElementsByTagName('meta')
  let A
  for(var i = 0; i < metaList.length ; i ++){
    if(metaList[i].getAttribute('name') == 'spm-id'){
      A = metaList[i].getAttribute('content')
    }
  }
  // 自定义参数信息
  const customParameter = urlencode('number=1&detailID=56789&pages=1')
  let event_type
  if(exposure){
    event_type = 'EXP'
    monitor(A,B,el,event_type,customParameter)
    append(el,'p')
  }else{
    event_type = 'CUSTOM'
    imageSrc(A + '.'+ B,'custom', new Date().getTime(),customParameter,event_type)
  }
}
function urlencode (str) {
  str = (str + '').toString();
  return encodeURIComponent(str)
}
// 监听元素
function monitor(A,B,el,event_type,customParameter){
  const config = { attributes: true, childList: true, subtree: true };
  const observer = new MutationObserver((mutationsList) => {
    const addElement = mutationsList[0].addedNodes
    // 添加特定的元素则触发曝光埋点事件
    if((mutationsList[0].addedNodes[0] && mutationsList[0].addedNodes[0].innerHTML == '默认内容')){
    //   // 发送曝光埋点事件
      imageSrc(A + '.'+ B,'custom', new Date().getTime(),customParameter,event_type)
    }
  });
  observer.observe(el, config);
}
// 添加元素
function append(parentElement,childElement,childElementContent){
  const child = document.createElement(childElement)
  child.innerHTML = childElementContent ? childElementContent : '默认内容'
  parentElement.appendChild(child)
}