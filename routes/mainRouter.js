const express = require('express')
const router = express.Router();
const mainLayout = require("../views/layouts/main.ejs")

router.get('/', (req, res) => {
    var locals = {
        title: 'Page Title',
        description: 'Page Description',
        header: 'Page Header'
    };
    res.render('index', {layout:mainLayout, locals})
})
router.get('/signup', (req, res) => {
    res.render('join')
})


module.exports = router;