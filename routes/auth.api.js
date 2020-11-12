const express = require("express");
const router = express.Router();
const passport = require("passport")
const authController = require("../controllers/auth.controller")
/**
 * @route POST /auth/login
 * @description Login
 * @access Public
 */

router.post("/login", authController.loginWithEmail); //

/**
 * @route POST auth/login/facebook
 * @description Login with facebook
 * @access Public
 */
router.post(
    "/login/facebook",
    passport.authenticate("facebook-token"),
    authController.loginWithFacebookOrGoogle
);

/**
 * @route POST /auth/login/google
 * @description Login with google
 * @access Public
 */
router.post(
    "/login/google",
    passport.authenticate("google-token"),
    authController.loginWithFacebookOrGoogle
);


module.exports = router;