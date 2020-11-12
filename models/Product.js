const mongoose = require("mongoose")
const Schema = mongoose.Schema

//================================
//
//  Model for a product like a shirt
//
//
//================================
const schema = Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount_price: { type: Number, required: false, select: false },
    pictureUrl: [{ type: String, required: true }],
    clothing_type: { type: String, required: true },
    quantity: { type: Number, required: true },
    seller: { type: String, required: true },
    product_info: {
        color: { type: String, required: true },
        available_size: [{
            type: String,
            required: false,
            enum: ["xs", "s", "m", "l", "xl"]
        }],
        description: { type: String, required: true },
        measures: { type: String, required: true },
    },
    isDeleted: { type: Boolean, default: false }
},
    { timestamps: true })
const Product = mongoose.model("Product", schema);
module.exports = Product;


