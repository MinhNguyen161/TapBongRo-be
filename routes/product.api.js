const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controllers")
const authMiddleware = require("../middlewares/authentication")
const reviewController = require("../controllers/review.controller")


/**
 * @route /products
 * @description  create a Product
 * @access Login + Admin required
 */
router.post('/', authMiddleware.loginRequired, authMiddleware.adminRequired, productController.createProduct) // admin required

/**
* @route /products/all
* @description get all blogs
* @access Public
*/

router.get('/all', productController.getAllProducts); //  

/**
* @route /products/:id
* @description GET an blog with ID
* @access Public
*/
router.get('/:id', productController.getSingleProduct); //
/**
* @route /products/:id
* @description edit an blog
* @access Login + Admin required
*/
router.put('/:id', authMiddleware.loginRequired, authMiddleware.adminRequired, productController.updateProduct) // Admin required
/**
* @route products/:id
* @description delete an user
* @access Login + Admin required
*/
router.delete('/:id', authMiddleware.loginRequired, authMiddleware.adminRequired, productController.deleteProduct) //Admin required
/**
* @route /products/reviews/:id
* @description get all blogs
* @access Public
*/

router.post('/review/:id', reviewController.createNewReviewOfProduct); //  

/**
* @route /products/reviews/all
* @description GET an blog with ID
* @access Public
*/
router.get('/reviews/all', reviewController.getReviewsOfProduct); //


module.exports = router;


