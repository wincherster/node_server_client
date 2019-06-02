/*
  路由模块
*/
const express = require('express');
const router = express.Router();
// 引入服务 处理
const service = require('./service.js');

// 路由处理
router.get('/api', service.showIndex);
router.post('/api/user', service.userInfo);
router.post('/api/login', service.login);
router.post('/api/logout', service.loginout);
router.post('/api/getFundInfo', service.getFundInfo); // 首页菜单 和 用户信息
router.post('/api/getLastInfo', service.getLastInfo); // 首页菜单 和 用户信息
router.post('/api/getFundFromType', service.getFundFromType); // 首页菜单 和 用户信息
router.post('/api/addFundInfo', service.addFundInfo); // 首页菜单 和 用户信息
router.post('/api/editFundInfo', service.editFundInfo); // 首页菜单 和 用户信息
router.post('/api/delFundInfo', service.delFundInfo); // 首页菜单 和 用户信息
router.post('/api/getFund', service.getFund); // 首页菜单 和 用户信息

// 导出路由模块
module.exports = router;