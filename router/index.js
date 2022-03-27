const express = require('express')
const { runPython }  = require('../utils/formatter')
const { querySql } = require('../db')
// const { json } = require('express')
// 注册路由
const router = express.Router()

router.get('/', function(req, res) {
  res.send('欢迎访问监控测试平台')
})
router.get('/hello', (req, res) => {
  const dataList = req.query.data.split('.')
  const local_time = req.query.local_time
  const server_time = new Date().getTime()
  let dataSql =''
  dataList.map((params) => {
    dataSql += ',' + `"${params}"`
  })
  const Sql = 'INSERT INTO ceshi1 (id, buriedpoina, buriedpoinb, buriedpoinc, buriedpoind,buriedpoine, server_time,local_time) VALUES (' + parseInt(Math.random() * 100  + 1) + dataSql + ',' +  `"${server_time}"` + ',' +   `"${local_time}"` + ")";
  runPython(Sql,res)
  // 调用 .py文件
//   const spawn = require('child_process').spawn;
//   const py = spawn('python3', [`/Users/xx/Desktop/mlog/node-mlog/python/script.py`, Sql]);
//   let output='';
//   py.stdout.on("data", (data) => {
//         output += data;
//   });
//   py.stderr.on('data', function(data) {
//     // console.log('stderr: ' + data);
// });
//   py.stdout.on("close", () => {
//     res.sendStatus(200);
//   });
});
router.get('/getList', (req, res) => {
  const Sql = 'select * from ceshi1';
  querySql(Sql).then((params) => {
    res.send({code: 200, data: params})
  }).catch((err) => {
    console.log(err.message)
  })
});
router.get('/sendPv', (req, res) => {
  const dataList = req.query.data.split('.')
  const local_time = req.query.local_time
  const server_time = new Date().getTime()
  let dataSql =''
  dataList.map((params) => {
    dataSql += ',' + `"${params}"`
  })
  const Sql = 'INSERT INTO ceshi1 (id, buriedpoina, buriedpoinb,server_time,local_time) VALUES (' + parseInt(Math.random() * 100  + 1) + dataSql + ',' +  `"${server_time}"` + ','+  `"${local_time}"` + ")";
  runPython(Sql,res)
});

router.get('/custom', (req, res) => {
  const dataList = req.query.data.split('.')
  const local_time = req.query.local_time
  const server_time = new Date().getTime()
  let dataSql =''
  dataList.map((params) => {
    dataSql += ',' + `"${params}"`
  })
  const event_type = req.query.event_type
  const  custom = req.query.custom
  const Sql = 'INSERT INTO ceshi1 (id, buriedpoina, buriedpoinb,server_time,local_time,custom, event_type) VALUES ('
  + parseInt(Math.random() * 100  + 1) + dataSql + ',' +  `"${server_time}"`  + ',' +  `"${local_time}"`  + ',' +  `'${custom }'` +',' +  `"${event_type}"`  + ")";
  runPython(Sql,res)
});
// 直接获取 MaxCompute 的数据，内容格式修改暂时没有完成，已废弃
// router.get('/demo', (req, res) => {
//   // const Sql = 'select buriedpoina,buriedpoinb,buriedpoinc,buriedpoind,buriedpoine,createtime from ceshi1';
//   const Sql = 'select name,body  from ceshi';
//   const spawn = require('child_process').spawn;
//   const py = spawn('python3', [`/Users/liumeng/Desktop/mlog/node-mlog/python/demo.py`, Sql]);
//   let output = '';
//   py.stdout.on("data", (data) => {
//     const dataStr = data.toString()
//     // var str2 = dataStr.replace(/odps.Record/g, '')
//     // str2 = myReplaceOne(str2,/buriedpoina/, "'buriedpoina':")
//     // str2 = myReplaceOne(str2,/buriedpoinb/, "'buriedpoinb':")
//     // str2 = myReplaceOne(str2,/buriedpoinc/, "'buriedpoinc':")
//     // str2 = myReplaceOne(str2,/buriedpoind/, "'buriedpoind':")
//     // str2 = myReplaceOne(str2,/buriedpoine/, "'buriedpoine':")
//     // str2 = myReplaceOne(str2,/createtime/, "'createtime':")
//     // str2 = myReplaceOne(str2,/name/, "'name':")
//     // str2 = myReplaceOne(str2,/body/, "'body':")
//     // str2 = myReplaceOne(str2,/'\n/, "',")
//     // str2 = myReplaceOne(str2,/\n/,"")
//     // str2 = myReplaceOne(str2,/,}/,"}")
//     // output = JSON.parse(str2)
//   });
//     py.stderr.on('data', function(data) {
//       console.log('stderr: ' + data);
//   });
//   py.stdout.on("close", () => {
//     // const data = JSON.parse(output)
//     res.send({code: 200,data:eval(output)});
//   });
// });
// function myReplaceOne(sInput, sChar, sReplaceChar) {
//   if (sInput == "" || sInput == undefined) {
//       return "";
//   }
//   var oReg = new RegExp(sChar,"g");
//   return sInput.replace(oReg, sReplaceChar);
// }


module.exports = router