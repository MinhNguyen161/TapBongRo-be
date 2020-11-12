const mongoose = require("mongoose")
const Schema = mongoose.Schema

//================================
//
//  Model for a blog
//
//
//================================
const schema = Schema({
    title: { type: String, required: true },
    pictureUrl: [{ type: String, required: false }],
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    content: { type: String, required: true },
    reviewCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    likeCount: { type: Number, default: 0 }
},
    { timestamps: true })
const Blog = mongoose.model("Blog", schema);
module.exports = Blog;
