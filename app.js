const express = require('express')
const router = require('./router')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router)

const server = app.listen('5002', function() {
  const { address, port } = server.address()
  console.log('HTTP服务启动成功：http://%s:%s', address, port)
})

