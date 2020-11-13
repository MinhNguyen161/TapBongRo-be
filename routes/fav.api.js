const express = require("express");
const router = express.Router();
const favController = require("../controllers/fav.controller")
const authMiddleware = require("../middlewares/authentication")

/**
 * @route POST /favs/:id
 * @description Login
 * @access Login Required
 */

router.post("/:id",
    authMiddleware.loginRequired,
    favController.addItem
);

/**
 * @route GET /favs/content
 * @description Login
 * @access Login Required
 */

router.get("/content",
    authMiddleware.loginRequired,
    favController.getFavs
);


module.exports = router;