const express = require('express')
const app = express()
const port = 3000
const path = require("path")
const dotenv = require('dotenv')
dotenv.config() //env 설정된 환경변수와 값을 읽어옴
const connectDB = require("./config/database")
const expressLayouts = require('express-ejs-layouts');
const mainRouter = require("./routes/mainRouter.js")
const adminRouter = require("./routes/adminRouter.js")
const cookieParser = require('cookie-parser')

connectDB();

app.use(expressLayouts);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set('layout','layouts/main.ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use("/",mainRouter)
app.use("/",adminRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})