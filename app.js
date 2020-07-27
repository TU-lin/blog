const express = require('express');
const path = require('path');
const app = express();
require('./model/connect');
//第三方post模块
const bodyParser = require('body-parser');
//引入session模块，负责存放数据
const session = require('express-session');

//引入admin和home文件
const admin = require('./route/admin');
const home = require('./route/home');
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); //要放在所有app.use才有效
//session模块的声明
app.use(session({
    secret: 'secret-key',
    saveUninitialized: false,
    cookie: { maxAge: 12 * 60 * 60 * 1000 }
}));
app.use(express.static(path.join(__dirname, 'public'))); //静态文件处理（专门是css，js等）
app.set('views', path.join(__dirname, 'views')); //模板存放的默认区域
app.set('view engine', 'art');
app.engine('art', require('express-art-template'));
//拦截请求判断登录页面和登录状态
app.use('/admin', require('./middleware/loginGuard'));

app.use('/admin', admin);
app.use('/home', home);
//采用中间件判断错误（错误处理中间件）
app.use((err, req, res, next) => {
    const result = JSON.parse(err);
    let params = [];
    for (var atrr in result) {
        if (atrr != 'path') {
            params.push(atrr + '=' + result[atrr]);
        }
    }
    res.redirect(`${result.path}?` + params.join('&'));
    // res.redirect(`${result.path}?message=${result.message}`);
});
//渲染模板

app.listen(3000);
console.log('服务器响应成功');