const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库启动成功'))
    .catch(err => console.log('数据库启动失败'))