const { User, VaildateUser } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {

    try {
        await VaildateUser(req.body);
    } catch (ex) {
        //ex.message可以得到错误信息验证没通过return res.redirect('/admin/user-edit?message='+ex.message)
        return next(JSON.stringify({ path: '/admin/user-edit', message: ex.message }))
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        // return res.redirect('/admin/user-edit?message=用户邮箱已存在，请重新添加');
        return next(JSON.stringify({ path: '/admin/user-edit', message: '用户邮箱已存在，请重新添加' }))
    } else {
        let salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(req.body.password, salt);
        req.body.password = password;
        await User.create(req.body);
        res.redirect('/admin/user');
        res.send(req.body);
    }

}