const express = require('express')
const app = express()
const port = 3000
const path = require("path")
const dotenv = require('dotenv')
dotenv.config() //env 설정된 환경변수와 값을 읽어옴
const connectDB = require("./config/database")
const expressLayouts = require('express-ejs-layouts');
const mainRouter = require("./routes/mainRouter")

connectDB();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set('layout','layouts/main.ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use("/",mainRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})