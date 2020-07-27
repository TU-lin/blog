const { User } = require("../../model/user");
const bcrypt = require('bcrypt');
module.exports = async(req, res) => {
    req.app.locals.currentLink = 'user';
    const { message, id } = req.query;
    if (id) {
        //修改操作
        let user = await User.findOne({ _id: id });
        // res.send(user)
        res.render('admin/user-edit', { user: user, message: message, id: id, link: '/admin/user-modify?id=' + id, button: '修改' });

    } else {
        //添加操作
        //如果当前传递了id
        res.render('admin/user-edit', { message: message, link: '/admin/user-edit?page=1', button: '提交' });
    }
}