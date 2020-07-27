const { User } = require('../../model/user');
module.exports = async(req, res) => {
    req.app.locals.currentLink = 'user';
    let page = req.query.page; //接收客户端传输过来的参数
    const pagesize = 5;
    const count = await User.countDocuments({})
    const total = Math.ceil(count / pagesize);
    // res.send('总页数' + total)
    let startpage = (page - 1) * pagesize;
    //先查找所有的用户然后限制每条进入的数量和传入的开始位置
    let users = await User.find({}).limit(pagesize).skip(startpage);

    // res.send(users)
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    }); // { msg: req.session.username }用在common上，如果使用这个方法会很麻烦，所以要用app.locals.userInfo

}