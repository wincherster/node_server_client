// 启动Express 服务器 
const express = require('express')
// var cors = require('cors')
// 引入 path 路径模块
const path = require('path');
// 引入 自定义路由文件
const router = require('./router.js');
const bodyParser = require('body-parser');

// 使用模板引擎
// const template = require('art-template');
const app = express()
// var expressWs = require('express-ws')(app);

// 启动静态资源服务
// app.use('/www', express.static('public'));

// 1.设置模板的路径
// app.set('views', path.join(__dirname, 'views'));
// 2.设置模板引擎
// app.set('view engine', 'art');
// 3.使express兼容 art-template 模板引擎
// app.engine('art', require('express-art-template'));
// app.use(cors())
// 挂载参数处理中间件 （post 请求）
app.use(bodyParser.urlencoded({
  extended: false
}));
// 处理json格式参数
app.use(bodyParser.json());

const url = require("url"); // 解析url为对象
const querystring = require('querystring'); // 解析如‘a=1&b=2’为对象

// 配置路由
app.use(router);

// app.ws('/ws', function (ws, req) {

//   ws.on('message', function (msg) {
//     console.log(msg);
//     let data = {
//       code: '0000',
//       data: '您有一条新的审方信息，请注意审核~',
//       msg: '通讯中...'
//     }
//     setInterval(function () {
//       ws.send(JSON.stringify(data));
//     }, 5000)

//   });
// }); // 首页菜单 和 用户信息

let PORT = 8888;
let HOST = '127.0.0.1';

//3. 绑定端口
app.listen(PORT, HOST);
console.log(`打开浏览器访问：http://${HOST}:${PORT}`);