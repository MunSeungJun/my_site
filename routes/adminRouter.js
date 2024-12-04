const express = require('express')
const router = express.Router()
const mainLayout = "../views/layouts/main.ejs"
const User = require("../models/user.js");
const bcrypt = require("bcrypt")


/**
 * 관리자 로그인 요청
 * GET /admin
 */
router.get('/admin', (req, res) => {
    res.render('admin/index', {
        layout: mainLayout,
        title: 'Admin Title',
        header: 'Admin Header'
    })
})
/**
 * 관리자 로그인 요청
 */
router.post('/admin', async(req, res) => {
    const {user_id, user_pw} = req.body
    const user = await User.find({user_id})
    if(!user){
        throw new Error('not found')
    }
    console.log(user)
    res.render('admin/index', {
        layout: mainLayout,
        title: 'Admin Title',
        header: 'Admin Header'
    })
})
/**
 * 회원가입
 * GET
 */
router.get('/register', (req, res) => {
    res.send("회원가입 폼을 보여줍니다")
})
/**
 * 회원가입 요청
 * POST
 */
router.post('/register', async (req, res) => {
    try {
        const { user_id, user_nick, user_email, user_pw } = req.body
        const hashedPw = await bcrypt.hash(user_pw, 10)
        const user = new User({
            user_id,
            user_pw:hashedPw,
            user_email,
            user_nick
        })
        const savedUser = await user.save()
     
        if(!savedUser){
            throw new Error('계정 생성 실패!')
        }
        res.status(200).json({
            message: "user account is created",
            data: user
        })
    } catch (err) {
        console.log(err);
    }
})
/**
 * 아이디 비밀번호 찾기
 * POST
 */
router.post('/find', (req, res) => {
    res.send("이름 또는 이메일 정보로 회원 id/pw찾기")
})

module.exports = router