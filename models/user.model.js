const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const chalk = require("chalk");

require("dotenv").config();

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: [true, 'this email already exist'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is Invalid");
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [7, "Password Must be minimum lenght of 7 Characters"],
        trim: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject._id
    delete userObject.__v

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SCRETE, { expiresIn: process.env.JWT_EXPIREIN });

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error(chalk.red("Unable to login"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error(chalk.red("Unable to login"));
    }

    return user;
};

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    return next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
