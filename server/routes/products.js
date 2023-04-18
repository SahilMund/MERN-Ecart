const express = require("express");
const router = express.Router();

const { postController } = require("../controllers");
const { isAuthenticated } = require("../middleware/auth");


router.get("/get-all-products", postController.getAllProduct);
router.get("/get-categories", postController.getAllCategories);


module.exports = router;