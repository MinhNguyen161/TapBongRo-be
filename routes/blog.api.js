const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controllers")
const authMiddleware = require("../middlewares/authentication")
const validators = require("../middlewares/validators")
const reviewController = require("../controllers/review.controller")


/**
* @route /blogs/all
* @description get all blogs
* @access Public
*/

router.get('/all', blogController.getAllBlog); // 

/**
* @route /blogs/:id
* @description GET an blog with ID
* @access Public
*/

router.get('/:id', blogController.getSingleBlog); //
/**
 * @route /blogs
 * @description  create a Blog
 * @access Login required
 */
router.post('/', authMiddleware.loginRequired, blogController.createBlog) // 
/**
* @route /blogs/:id
* @description edit an blog
* @access Login required
*/
router.put('/:id', authMiddleware.loginRequired, authMiddleware.adminRequired, blogController.updateBlog)
/**
* @route blogs/:id
* @description delete an user
* @access Login required
*/
router.delete('/:id', authMiddleware.loginRequired, authMiddleware.adminRequired, blogController.deleteBlog)

/**
 * @route GET api/reviews/blogs/:id?page=1&limit=10
 * @description Get reviews of a blog with pagination
 * @access Public
 */
router.get(
    "/blogs/:id",
    reviewController.getReviewsOfBlog
);

/**
 * @route POST blog/reviews/blogs/:id
 * @description Create a new review for a blog
 * @access Login required
 */
router.post(
    "/reviews/:id",
    authMiddleware.loginRequired,
    reviewController.createNewReview
);

/**
 * @route PUT blog/reviews/:id
 * @description Update a review
 * @access Login required
 */
router.put(
    "/reviews/:id",
    authMiddleware.loginRequired,
    reviewController.updateSingleReview
);

/**
 * @route DELETE blogs/reviews/:id
 * @description Delete a review
 * @access Login required
 */
router.delete(
    "/reviews/:id",
    authMiddleware.loginRequired,

    reviewController.deleteSingleReview
);

module.exports = router;




