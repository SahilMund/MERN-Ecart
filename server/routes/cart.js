const express = require("express");
const router = express.Router();

const { cartController } = require("../controllers");
const { isAuthenticated } = require("../middleware/auth");

router.post("/add-to-cart", isAuthenticated, cartController.addToCart);

router.delete("/remove-from-cart/:id",isAuthenticated, cartController.removeFromCart);

router.patch("/manage-quantity",isAuthenticated, cartController.manageQuantity);

router.get("/fetch-cart-products",isAuthenticated, cartController.fetchCartProducts);

module.exports = router;
