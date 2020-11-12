const express = require("express");
const router = express.Router();
const validators = require("../middlewares/validators");
const auth = require("../middlewares/authentication")
const { body } = require("express-validator");
const userController = require("../controllers/user.controller")
//...
/**
 * @route POST api/users
 * @description Register new user
 * @access Public
 */
router.post(
    "/",
    validators.validate([
        body("name", "Invalid name").exists().notEmpty(),
        body("email", "Invalid email").exists().isEmail(),
        body("password", "Invalid password").exists().notEmpty(),
    ]), userController.register);
/**
 * @route PUT api/users/
 * @description Update user profile
 * @access Login required
 */

/**
 * @route GET /users/me
 * @description Get current user info
 * @access Login required
 */
router.get("/me", auth.loginRequired, userController.getCurrentUser)


module.exports = router;