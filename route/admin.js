const express = require('express');
const admin = express.Router();
const bcrypt = require('bcrypt')
const { User } = require('../model/user');

//渲染登录页面
admin.get('/login', require('./admin/loginPage'));
//实现登录功能
admin.post('/login', require('./admin/login'));
//渲染用户页面
admin.get('/user', require('./admin/userPage'));
//渲染用户添加页面
admin.get('/user-edit', require('./admin/user-edit'));
//实现用户编辑功能
admin.post('/user-edit', require('./admin/user-edit-fn'));
//实现退出功能
admin.get('/logout', require('./admin/logout'));
//实现修改功能
admin.post('/user-modify', require('./admin/user-modify'));
//实现删除功能
admin.get('/user-delete', require('./admin/user-delete'));
//实现文章显示功能
admin.get('/article', require('./admin/article'));
//实现文章编辑功能
admin.get('/article-edit', require('./admin/article-edit'))
module.exports = admin;