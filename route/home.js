const express = require('express');
const home = express.Router();
home.get('/article', (req, res) => {
    res.render('home/article');
});
home.get('/default', (req, res) => {
    res.render('home/default');
})
module.exports = home;