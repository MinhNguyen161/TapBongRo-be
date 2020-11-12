const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controllers")
const auth = require("../middlewares/authentication")

/**
 * @route /cart/
 * @description  add or remove based on the quantity
 * @access Login Required
 */
router.post('/', auth.loginRequired, cartController.addItem) //  Add later

// router.post('/new/:id', cartController.createCart) //  createCart

/**
* @route /cart/content/all
* @description get all Carts including everything
* @access Login Required
*/

router.get('/content/all', auth.loginRequired, cartController.getAllCarts); // 

/**
* @route /cart/content/:id
* @description get the content of the Oncart Cart
* @access Login Required
*/

router.get('/content/', auth.loginRequired, cartController.getCartContent); // 

/**
* @route /checkout/
* @description edit an blog checkout and swith the cart status to Paid
* @access Login Required
*/
router.put('/checkout', auth.loginRequired, cartController.checkOut)



module.exports = router;


