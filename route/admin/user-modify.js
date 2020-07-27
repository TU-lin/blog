const { User } = require('../../model/user')
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {
    const id = req.query.id;
    const { username, email, password, role, state } = req.body;
    let user = await User.findOne({ _id: id });
    let isVaild = await bcrypt.compare(password, user.password);
    //这一部分与老师有所不同，但isVaild为true时弹出修改失败，为false可运行下一步存储在数据库中
    if (isVaild) { //修改失败
        let obj = { path: '/admin/user-edit', message: '账号修改失败', id: id }
        next(JSON.stringify(obj));
        // res.send('修改失败');
    } else {
        //修改成功
        let salt = await bcrypt.genSalt(10);
        let pass = await bcrypt.hash(password, salt)
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            password: pass,
            role: role,
            state: state
        });
        res.redirect('/admin/user');
    }

}