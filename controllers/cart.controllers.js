const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helper");
const Cart = require("../models/Cart")
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
*/
const cartController = {};


cartController.createCart = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const cart = await Cart.create({
        userId,
    })
    return sendResponse(res, 200, true, cart, null, "Successfully created a Cart")
})

cartController.addItem = catchAsync(async (req, res) => {
    const userId = req.userId;
    const { itemId, quantity } = req.body;
    let cart = await Cart.findOne({ userId, status: "onCart" }).populate("products.itemId")
    if (!cart) {
        cart = await Cart.create({
            userId,
            products: []
        })
    }
    const ind = cart.products.findIndex(product => product.itemId._id == itemId);
    console.log(itemId, " ", quantity, " ", ind);
    if (ind === -1) {
        cart.products.push({ itemId: itemId, quantity: quantity });
    } else {
        cart.products[ind].quantity += quantity
        if (cart.products[ind].quantity === 0) {
            cart.products.splice(ind, 1)
        }
    }

    cart.save();
    return sendResponse(res, 200, true, cart, null, "Cart item successfully added")
})
cartController.getAllCarts = catchAsync(async (req, res) => {
    const userId = req.userId;    // ti chuyen ve userId tren front-end
    const cart = await Cart.find({ userId: userId }).populate("products.itemId")
    return sendResponse(res, 200, true, cart, null, "Get all Cart success")
})


cartController.getCartContent = catchAsync(async (req, res) => {
    const userId = req.userId;    // ti chuyen ve userId tren front-end
    const cart = await Cart.findOne({ userId: userId, status: "onCart" }).populate("products.itemId")
    return sendResponse(res, 200, true, cart, null, "Get items success")
})
cartController.checkOut = catchAsync(async (req, res) => {
    const userId = req.userId;    // ti chuyen ve userId tren front-end
    let cart = await Cart.findOneAndUpdate(
        { userId: userId, status: "onCart" }, // this._conditions
        { $set: { status: "paid" } }, //this._update.status
        { new: true }
    )
    if (!cart) return sendResponse(res, 404, false, null, null, "Checkout unsuccessful, Cart not found")
    return sendResponse(res, 200, true, cart, null, "CheckOut successful")
})


module.exports = cartController