const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('Joi');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 16
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    //admin和normal
    role: {
        type: String,
        required: true
    },
    //0是启动,1是禁用
    state: {
        type: Number,
        default: 0
    }
});
const User = mongoose.model('User', userSchema);

async function usercreate() {
    let salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash('123456', salt);
    // User.create({
    //     username: 'iteheima',
    //     email: 'itheima@qq.com',
    //     password: pass,
    //     role: 'admin',
    //     state: 0
    // })
}
usercreate();
const VaildateUser = user => {
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不合法')),
        email: Joi.string().email().required().error(new Error('邮箱不合法')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不合法')),
        role: Joi.string().valid('admin', 'normal').required().error(new Error('角色不合法')),
        state: Joi.number().valid(0, 1).required().error(new Error('启动方式不合法'))
    }
    return Joi.validate(user, schema);
}
module.exports = {
    User,
    VaildateUser
};