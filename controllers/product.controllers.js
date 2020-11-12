const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helper");
const Product = require("../models/Product")
const productController = {};

productController.createProduct = catchAsync(async (req, res) => {
    const { name, price, clothing_type, quantity, product_info, seller, pictureUrl } = req.body;
    const product = await Product.create({
        name,
        price,
        clothing_type,
        quantity,
        product_info,
        seller,
        pictureUrl
    })
    return sendResponse(res, 200, true, product, null, "Successfully created a product")
})
//==================================================================
productController.updateProduct = catchAsync(async (req, res, next) => {
    const itemId = req.params.id;
    const { name, price, clothing_type, quantity, product_info } = req.body;
    const product = await Product.findOneAndUpdate(
        { _id: itemId, },
        {
            name: name, price: price,
            clothing_type: clothing_type,
            quantity: quantity,
            product_info: product_info,
        },
        { new: true }
    );
    if (!product)
        return next(
            new AppError(
                400,
                "Product not found or User not authorized",
                "Update product Error"
            )
        );
    return sendResponse(res, 200, true, product, null, "Update Product successful");
});

productController.getSingleProduct = catchAsync(async (req, res) => {
    itemId = req.params.id;
    const product = await Product.findById(itemId)
    if (!product) {
        return next(new AppError(404, "Product not found", "Get Single Product Error"));
    }
    return sendResponse(res, 200, true, product, null, `Successfully get ${product.name} product`)
})


productController.getAllProducts = catchAsync(async (req, res, next) => {
    let { page, limit, minPrice, maxPrice, color, available_size, clothing_type, } = { ...req.query }
    filter = {
        $and: [{ isDeleted: false }],
    }

    //how to filter 
    if (minPrice) filter.$and.push({ price: { $gte: minPrice } })
    if (maxPrice) filter.$and.push({ price: { $lte: maxPrice } })
    if (color) filter.$and.push({ product_info: { color: color } })
    if (available_size) filter.$and.push({ product_info: { available_size: available_size } })
    if (clothing_type) filter.$and.push({ clothing_type: clothing_type })

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalProducts = await Product.find(filter).countDocuments()
    console.log("totalProducts", totalProducts)
    const totalPages = Math.ceil(totalProducts / limit);
    const offset = limit * (page - 1);
    const products = await Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)

    return sendResponse(res, 200, true, { products, totalPages }, null, "");
})

productController.deleteProduct = catchAsync(async (req, res, next) => {
    const itemId = req.params.id;
    const product = await Product.findOneAndUpdate(
        { _id: itemId },
        { isDeleted: true },
        { new: true }
    );
    if (!product)
        return next(
            new AppError(
                400,
                "Product not found or User not authorized",
                `Fail to delete ${product.name} product`)
        );
    return sendResponse(res, 200, true, null, null, "Delete product successful");

})


module.exports = productController