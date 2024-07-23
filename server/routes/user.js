const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/userController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// User sign up routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

// User meta data routes



module.exports = router;