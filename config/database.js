const mongoose = require("mongoose")

const connectDB = async() => {
    try{
        const conn = mongoose.connect(process.env.MONGODB_URI)
        console.log('---------db 연결 성공---------')
        if (!conn) {
            console.log('---------db 연결 실패---------')
        }
    } catch (err) {
        console.log('---------db 연결 오류---------')
        console.log(err)
    }
}

module.exports = connectDB