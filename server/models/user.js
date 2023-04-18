const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Creating a User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
     
    },
    email: {
      type: String,
      required: [true, "Please enter your email address"],
      unique: [true , 'Email Already Exists'],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [2, "Password should be greater than 2 characters"],
      select: false,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      required: true,
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  {
    timestamps: true,
  }
);

// To Hash/encrypt password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  // jwt token
  userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };
  
  // comapre password
  userSchema.methods.compareEncryptedPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model("User", userSchema);

module.exports = User;
