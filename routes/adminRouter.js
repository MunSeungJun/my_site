const express = require('express')
const router = express.Router()
const mainLayout = "../views/layouts/main.ejs"
const adminLayout = "../views/layouts/admin.ejs"
const User = require("../models/user.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET; // secretOrPrivate Key
const cookieParser = require("cookie-parser");


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
router.post('/admin', async (req, res) => {
    try {
        const { user_id, user_pw } = req.body;
        // console.log(user_id, user_pw);
        const user = await User.find({ user_id });
        // console.log(user);
        if (!user) {
            return res.status(401).json({ message: "존재하지 않는 사용자입니다" });
        }

        const isValid = bcrypt.compare(user_pw, user[0].user_pw);

        if (!isValid) {
            return res.status(401).json({ message: "아이디, 비밀번호를 다시 확인하세요" });
        }

        const token = jwt.sign({ id: user.user_id }, jwtSecret); // 관리자 토큰 (이름,로그인날짜,시간제한,..각종 정보)
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/allPosts");

    } catch (error) {
        console.log(error);
    }
})
/**
 * 관리자 전용 화면 : 작성한 전체 게시물 목록 화면 [수정,삭제,추가,목록...] + 로그아웃 [버튼]
 * GET /allPosts
*/

const 토큰체크MW = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.redirect('/admin'); // 토큰 값 없으면, 관리자 로그인 폼으로 리다이렉트
    }
    next();
}
router.get("/allPosts", 토큰체크MW, (req, res) => {
    // 토큰 체크 : 관리자 유무 확인
    res.render("admin/allPosts", {
        layout: adminLayout,
        title: 'allPosts Title',
        header: 'allPosts Header'
    });
})
/**
 * 관리자 로그아웃
 * GET /logout
 */
router.get('/logout', (req, res) => {
    res.clearCookie("token")
    res.redirect("/")
})
/**
 * 회원가입
 * GET
 */
router.get('/register', (req, res) => {
    res.render("register", {
        layout: mainLayout,
        title: 'register Title',
        header: 'register Header'
    })
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
            user_pw: hashedPw,
            user_email,
            user_nick
        })
        const savedUser = await user.save()

        if (!savedUser) {
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