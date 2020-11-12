const express = require('express');
const router = express.Router();
const userApi = require("./user.api")
const authApi = require("./auth.api");
const blogApi = require("./blog.api")
const productApi = require("./product.api")
const cartApi = require("./cart.api")

//=============================================
//// ANCHOR  userApi
router.use("/users", userApi)
//=============================================
//// ANCHOR authApi
router.use("/auth", authApi);
//=============================================
//// ANCHOR  userApi
router.use("/blogs", blogApi)
//=============================================
//// ANCHOR  Cart Api Calls
router.use("/cart", cartApi)
//=============================================
//// ANCHOR  Product Api Calls
router.use("/products", productApi)


module.exports = router;
