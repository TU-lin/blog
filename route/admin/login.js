const { User } = require('../../model/user');
const bcrypt = require('bcrypt')
module.exports = async(req, res) => {
    const { email, password } = req.body;
    //console.log(req.body);
    if (email.trim().length == 0 || password.trim().length == 0) {
        // return res.status(400).send('<h4>邮箱或密码输入错误</h4>');
        return res.status(400).render('admin/error', { msg: '邮箱或密码输入错误' });
    }
    let user = await User.findOne({ email });
    if (user) {
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            req.session.username = user.username;
            // res.send('登陆成功');
            //成功后重定向网站
            //可以直接弄app.locals.userInfo去存储user，但是要引入app声明，其实不用因为req的可以
            req.app.locals.userInfo = user;
            res.redirect('/admin/user?page=1');
        } else {
            return res.status(400).render('admin/error', { msg: '邮箱或密码输入错误' });
        }
    } else {
        return res.status(400).render('admin/error', { msg: '邮箱或密码输入错误' });
    }
}