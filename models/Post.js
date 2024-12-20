const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');

const postSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4
    },
    title: String,
    content: String
},{
    timestamps:true
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post