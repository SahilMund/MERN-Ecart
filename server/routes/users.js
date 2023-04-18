const express = require("express");
const router = express.Router();

const { upload } = require("../config/multer");

const { userController } = require("../controllers/");
const { isAuthenticated } = require("../middleware/auth");

// Creating a user on signup, enabling captcha validation
router.post("/create-user", upload.single("file"), userController.createUser);
router.post("/activation", userController.userActivation);
router.post("/login-user", userController.userLogin);
router.get("/get-loggedIn-user", isAuthenticated, userController.getUser);
router.post("/logout", isAuthenticated, userController.logout);

module.exports = router;