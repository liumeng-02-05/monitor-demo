function getTime(timeStamp) {
  const Data = new Date(timeStamp)
  var Year =  Data.getFullYear(); //获取完整的年份(4位,1970-????)
  var Month =  Data.getMonth() + 1; //获取当前月份(0-11,0代表1月)
  var Today =  Data.getDate(); //获取当前日(1-31)
  var Hour =  Data.getHours(); //获取当前小时数(0-23)
  var Minute =  Data.getMinutes(); //获取当前分钟数(0-59)
  var Second =  Data.getSeconds(); //获取当前秒数(0-59)
  var nowTime;

  nowTime = Year + '年' + fillZero(Month) + '月' + fillZero(Today) + '日' + ' ' + fillZero(Hour) + ':' +
      fillZero( Minute) + ':' + fillZero( Second);
  return nowTime
}

function fillZero(str) {
  var realNum;
  if (str < 10) {
      realNum = '0' + str;
  } else {
      realNum = str;
  }
  return realNum;
}
module.exports = {
  getTime,
}