const mongoose = require("mongoose");
const Product = require("./Product");
const Schema = mongoose.Schema

//================================
//
//  Model for a product like a shirt
//
//
//================================
const schema = Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    products: [{
        itemId: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "Product",
        },
        quantity: { type: Number, required: false, default: 0 },
    }],
    status: {
        type: String,
        required: true,
        enum: ["delivered", "onCart", "paid"],
        default: "onCart",
    }
},
    { timestamps: true })

schema.post(/^findOneAndUpdate/, async function (doc) {
    try {
        const status = this._update.$set.status;
        if (status == "paid" && this._conditions.status == "onCart") {
            doc.products.forEach(async item => {
                const product = await Product.findOne({ _id: item.itemId });
                product.quantity -= item.quantity;
                product.save();
            })
        }
    } catch (err) {
    }
});


//================================================================================
//================================================================================
// Neither findByIdAndUpdate norfindByIdAndDelete have access to document middleware.
// They only get access to query middleware
// Inside this hook, this will point to the current query, not the current review.
// Therefore, to access the review, we’ll need to execute the query


const Cart = mongoose.model("Cart", schema);
module.exports = Cart;



/*


controllers
    - add one item to cart
        exisiting item
            ind = cart.products.findIndex(item => newItemId  ===  item._id)
            cart.products[ind].quantity++;
        new item
            cart.products.push

        cart.save()
    - checkout
    - remove item from cart

Cart.find(
    userId,
    status == onCart
)

When you should create cart?



products: [
    {
        item: egg,
        quantity: 2
    }
]

*/