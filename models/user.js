const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        trim: true
    },
    user_pw: String,
    user_nick: String,
    user_email: String,
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User