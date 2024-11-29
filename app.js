const express = require('express')
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts');
const mainRouter = require("./routes/mainRouter")

app.set("view engine", "ejs");
app.set("views", "./views");
app.set('layout','layouts/main.ejs')
app.use(expressLayouts);
app.use("/",mainRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})