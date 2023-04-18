
const Product = require("../models/product");
const Category = require("../models/category");

module.exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.status(201).json({
      success: true,
      total_product: products.length,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};
module.exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});

   return res.status(201).json({
      success: true,

      categories,
    });
  } catch (error) {
     console.log(error);
     return;
  }
};
