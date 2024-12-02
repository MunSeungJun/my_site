const express = require('express')
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs"

/**
 * 
 */

router.get('/', (req, res) => {
    res.render ('index', {
        layout: mainLayout,
        title: 'Page Title',
        header: 'Page Header'
    });
})
/**
 * About : 사이트 소개
 * GET /about
 */
router.get('/about', (req, res) => {
    res.render('about', {
        layout:mainLayout,
        title: 'About Title',
        header: 'About Header'
    });
})
/**
 * 
 */
router.get('/contact', (req, res) => {
    res.render('contact', {
        layout:mainLayout,
        title: 'Contact Title',
        header: 'Contact Header'
    });
})


module.exports = router;