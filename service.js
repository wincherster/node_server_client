/*
  业务模块
*/
const path = require('path');
const fs = require('fs');
const db = require('./db.js'); // 加载数据库模块
var sd = require('silly-datetime');

// 渲染主页面
exports.showIndex = (req, res) => {
  // res.sendfile(`${__dirname}/index.html`);
  res.json({
    code: '0000',
    msg: '服务器工作正常'
  });
}

exports.userInfo = (req, res) => {
  // res.sendfile(`${__dirname}/index.html`);
  // let info = req.body;
  // console.log(info);
  
  // 通过读取数据库获取数据
  // let sql = 'select * from user_info limit 0,5';
  // let sql = `select * from user_info order by id desc limit ${ (info.index -1) * info.size},${info.size};`;
  // let total = 'select count(1) from user_info';
  // let sql = `select count(1) from user_info where type=1`;
  let sql = `select * from user_info`; // 获取所有用户信息

  db.base(sql, null, (result) => {
    let data = {
      code: '0000',
      // data: {},
      data: result,
      // total: "",
      msg: 'ok'
    }
    res.send(data);
  });
}

exports.login = (req, res) => {
  let info = req.body;
  console.log(info);
  if (info.username === 'admin' && info.password === 'admin') {
    res.json({
      code: '0000',
      data: true,
      msg: '登录成功'
    });
  } else {
    res.json({
      code: '1304',
      msg: '用户名或密码错误'
    });
  }
}

exports.loginout = (req, res) => {
  res.json({
    code: '0000',
    data: true,
    msg: '退出登录成功'
  });
}
exports.getFund = (req, res) => {
  let info = req.body;
  // let sql = `select sum(fund_number) from fund where fund_type=${info.type}`; // 查询 收入 或 支出
  let sql = `select fund_type, sum(fund_number) amount from fund group by fund_type`; // 聚合查询 收入和支出
  db.base(sql ,null,(result)=>{
    let data = {
      code: '0000',
      data: result,
      msg: 'ok'
    }
    res.send(data);
  })
};

exports.getFundInfo = (req, res) => {
  let info = req.body;
  let sql = `select * from fund order by id DESC limit ${ (info.pageIndex -1) * info.pageSize},${info.pageSize};` ;

  let total = 'select count(1) from fund';

  db.base(sql ,null,(result)=>{ 
    console.log(result)
    let data = {
      code: '0000',
      data: result,
      total: "",
      msg: 'ok'
    }
    // res.send(data);
     // console.log(result);
    data.data = result;
    db.base(total ,null,(result)=>{
      console.log(result);
      data.total = result[0]['count(1)'];
       // 将返回函数 放在数据库回调中执行
      res.send(data);
    });
  });
}

exports.getLastInfo = (req, res) => {
  let sql = `select * from fund order by id DESC limit 1`;
  // let sql = `select * from fund order by id limit 1`;
  // let total = 'select count(1) from user_info';

  db.base(sql ,null,(result)=>{ 
    console.log(result)
    let data = {
      code: '0000',
      // data: {},
      data: result,
      // total: "",
      msg: 'ok'
    }
    res.send(data);
  });
}
exports.getFundFromType = (req, res) => {
  let sql = `select * from fund_from_type`;
  db.base(sql ,null,(result)=>{ 
    console.log(result)
    let data = {
      code: '0000',
      data: result,
      msg: 'ok'
    }
    res.send(data);
  });
}

function getPreCount(){
  
}
exports.addFundInfo = (req, res) => {
  let sql = `select * from fund order by id DESC limit 1`; // 获取上一条数据的 总额

  db.base(sql ,null,(last)=>{ 
    console.log(last,' 上一条数据')
    let preCount = last.length === 0 ? 0 : last[0].fund_count;

    let info = req.body;
    let fund = {};
    let currentTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
    for (let key in info) {
      fund[key] = info[key];
    }
    fund.created_time = currentTime;
    fund.fund_count = Number(preCount) + Number(fund.fund_number) ;
    let sql = 'insert into fund set ?';
    db.base(sql,fund,(result)=>{
      if(result.affectedRows == 1){
        res.send({
          code: '0000',
          msg: '添加成功'
        });
      }
    })
  });

  
}

exports.editFundInfo = (req, res) => {
  let info = req.body;
  console.log(info, '请求数据');
  // let currentTime = new Date();
  let currentTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
  // 插入数据操作  需要条件 id 不然就是更新所有数据【限定条件一定要加】
  let sql = 'update fund set created_time=?, description=?, fund_count=?, fund_from_type=?, fund_number=?, fund_type=?, update_time=?, user_name=? where id=?';
  // 传数组
  let data = [info.created_time, info.description, info.fund_count, info.fund_from_type, info.fund_number, info.fund_type, currentTime, info.user_name, info.id];

  db.base(sql,data,(result)=>{
    if(result.affectedRows == 1){
      res.send({
        code: '0000',
        msg: '更新成功'
      });



    }
  })

  updateItem(info.old_value, info.fund_number, info.id );
  
}

function updateItem(oldValue, newValue, id){
  if(oldValue == newValue){
    return false;
  }
  
  let sqlUpdate = `update fund set fund_count = fund_count + ${ newValue - oldValue }  where id >= ${id}`;
  db.base(sqlUpdate,null,(result)=>{
    if(result.affectedRows == 1){
      console.log(sqlUpdate,'差------');
      console.log(newValue - oldValue,'差');

    }
  })
}

exports.delFundInfo = (req, res) => {
    // 获取id
    // let id = req.query.id;
    // let sql = 'delete from fund where id=?';
    let id = req.body.id;
    let sql = 'delete from fund where id=?;';
    let data = [id];
    db.base(sql,data,(result)=>{
      if(result.affectedRows == 1){
        // res.redirect('/');
        res.send({
          code: '0000',
          msg: '删除成功'
        });
      }
    });
}