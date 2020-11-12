const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { AppError, catchAsync } = require("../helpers/utils.helper");
const User = require("../models/User");
const authMiddleware = {};

authMiddleware.loginRequired = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        if (!tokenString)
            return next(new AppError(401, "Login required", "Validation Error"));
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return next(new AppError(401, "Token expired", "Validation Error"));
                } else {
                    return next(
                        new AppError(401, "Token is invalid", "Validation Error")
                    );
                }
            }
            // console.log(payload);
            req.userId = payload._id;
        });
        next();
    } catch (error) {
        next(error);
    }
};
authMiddleware.adminRequired = catchAsync(async (req, res, next) => {
    const userId = req.userId
    const user = await User.findById(userId)
    if (!user) {
        return next(
            new AppError(404, "User not found please try again", " Error")
        );
    }
    if (user.userType !== "admin") {
        return next(
            new AppError(404, "User does not have admin", " Error")
        );
    }
    next();
})


module.exports = authMiddleware;