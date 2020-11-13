const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helper");
const Fav = require("../models/Favorites")
const favController = {};

favController.addItem = catchAsync(async (req, res) => {
    const itemId = req.params.id
    const userId = req.userId;
    let fav = await Fav.findOne({ userId }).populate("products.itemId")
    if (!fav) {
        cart = await Fav.create({
            userId,
            products: []
        })
    }
    const ind = fav.products.findIndex(product => product.itemId._id == itemId);
    console.log(itemId, " ", " ", ind);
    if (ind === -1) {
        fav.products.push({ itemId: itemId });
    } else {
        // fav.products[ind].isLiked = true
        fav.products.splice(ind, 1) // fix Thanh chuyen thanh isLiked
    }
    fav.save();
    return sendResponse(res, 200, true, fav, null, "add/remove item successful")
})
favController.getFavs = catchAsync(async (req, res) => {
    const userId = req.userId;
    let fav = await Fav.findOne({ userId }).populate("products.itemId")
    if (!fav) {
        return next(
            new AppError(
                400, "Favorites not found or User not authorized", "Get FavList Error"
            )
        );
    }
    return sendResponse(res, 200, true, fav, null, "Get FavsList success")
})

module.exports = favController