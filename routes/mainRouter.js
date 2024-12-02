const express = require('express')
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs"

router.get('/', (req, res) => {
    res.render ('index', {
        layout: mainLayout,
        title: 'Page Title',
        header: 'Page Header'
    });
})
router.get('/signup', (req, res) => {
    res.render('join')
})


module.exports = router;