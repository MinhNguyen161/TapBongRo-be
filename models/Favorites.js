const mongoose = require("mongoose")
const Schema = mongoose.Schema

//================================
//
//  Model for  cart
//
//
//================================

const schema = Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    products: [{
        itemId: {
            type: Schema.Types.ObjectId, required: false, ref: "Product",
        },
        isLiked: { type: Boolean, required: false, default: true }
    }]
},
    { timestamps: true })


const Cart = mongoose.model("Favorites", schema);
module.exports = Cart;


