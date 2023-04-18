const express = require("express");

const Product = require("../models/product");
const Category = require("../models/category");
const User = require("../models/User");
const Cart = require("../models/cart");

module.exports.fetchCartProducts = async (req, res) => {
  try {
    const cart = await Cart.find({user: req.user._id}).populate('user product');

    message =
      cart.length === 0
        ? "Cart is empty"
        : "Cart products fetched successfully";

    res.status(201).json({
      success: true,
      cart,
      message,
    });
  } catch (error) {
    return console.log(error);
  }
};
module.exports.addToCart = async (req, res) => {
  try {

    const { productId } = req.body;

    if (!productId) {
      console.log("Product Id can not be empty");
      return;
    }

    const productToBeAdded = await Product.findById(productId);
 //   console.log(productId, productToBeAdded);

    if (!productToBeAdded) {
      console.log("Invalid request");
      return;
    }

    const isExists = await Cart.find({
      $and: [{ _id: productId }, { user: req.user._id }],
    });

    console.log(isExists);

    if (isExists.length !== 0) {
      console.log("product already present");
      return;
    }

    const data = {
      product: productToBeAdded,
      user: req.user ,
      quantity: 1,
    };

    const item = await Cart.create(data);

    return res.status(201).json({
      success: true,
      item,
      message: "Product added to cart successfully..",
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
module.exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.params);
 
    if (!id) {
      console.log("Product Id can not be empty");
      return;
    }

    let item = await Cart.findByIdAndDelete(id);
    
    console.log(item);

    return res.status(201).json({
      success: true,
      item,
      message: "Product removed from cart successfully..",
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
module.exports.manageQuantity = async (req, res) => {
  try {
    const { id, type } = req.query;

    if (!productId) {
      console.log("Product Id can not be empty");
      return;
    }

    let product = await Cart.findOne({
      $and: [{ _id: id }, { user: req.user._id }],
    });

    if (!product) {
      console.log("Invalid request");
      return;
    }
    // .sort('createdAt')
    // .populate('from_user').populate('to_user');

    // type will be 'INC' and 'DEC' for managing the quantity
    product.quantity =
      type === "INC" ? product.quantity + 1 : product.quantity - 1;
    product.save();

    return res.status(201).json({
      success: true,
      product,
      message: "QTY increased by 1",
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
