const express = require('express')
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs"
const Post = require("../models/Post.js")

/**
 * 첫 페이지
 * GET /home
 */
router.get(['/','/home'], async (req, res) => {
    const data = await Post.find().sort({createdAt: -1}) 
    res.render('index', {
        data,
        layout: mainLayout,
        title: 'Page Title',
        header: 'Page Header'
    });
})
/**
 * 최신글 보기
 * GET /post
 */
router.get('/posts/:id', async (req, res) =>{
    const data = await Post.findById(req.params.id)
    res.render('post', {
        data,
        layout:mainLayout,
        title: 'My site',
        header: 'Post Header'
    })
})
/**
 * About : 사이트 소개
 * GET /about
 */
router.get('/about', (req, res) => {
    res.render('about', {
        layout: mainLayout,
        title: 'About Title',
        header: 'About Header'
    });
})
/**
 * 
 */
router.get('/contact', (req, res) => {
    res.render('contact', {
        layout: mainLayout,
        title: 'Contact Title',
        header: 'Contact Header'
    });
})

module.exports = router;

// 임시 POST
// Post.insertMany([
//     {
//         title:"의무교육...",
//         content:"의무교육은 무상으로 한다. 대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다."
//     },
//     {
//         title:"타인의 범죄행위...",
//         content:"타인의 범죄행위로 인하여 생명·신체에 대한 피해를 받은 국민은 법률이 정하는 바에 의하여 국가로부터 구조를 받을 수 있다."
//     },
//     {
//         title:"헌법재판소에서...",
//         content:"헌법재판소에서 법률의 위헌결정, 탄핵의 결정, 정당해산의 결정 또는 헌법소원에 관한 인용결정을 할 때에는 재판관 6인 이상의 찬성이 있어야 한다."
//     }
// ])