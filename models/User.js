const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const userSchema = Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: [true, "email is requried"], unique: true },
        password: { type: String, required: true, select: false },
        info: {
            age: { type: Number, require: false },
            height: { type: Number, require: false },
            weight: { type: Number, require: false },
            basketballSkill: {
                type: String,
                required: false,
                enum: ["beginner", "intermediate", "advanced", "professional"]
            }
        },
        reasons: { type: Array, required: false },
        classOwned: { type: String, required: false },
        userType: {
            type: String,
            required: true,
            enum: ["admin", "customer"],
            default: "customer",
        }
    },
    { timestamps: true }
);

userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;
    delete obj.isDeleted;
    return obj;
};


userSchema.methods.generateToken = async function () {
    const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
    return accessToken;
};


const User = mongoose.model("User", userSchema);
module.exports = User;