const express = require("express");
const { registerUser, loginUser, logoutUser, changePortfolioMetaDataByUserId, getUserDetailsById } = require("../controllers/userController");
const { authUser } = require("../middlewares/auth");
const { deployPortfolio } = require("../controllers/portfolioController");
const router = express.Router();

// User sign up routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/details/:id").get(getUserDetailsById);

// User portfolio related APIs
router.route("/metadata/edit").post(authUser, changePortfolioMetaDataByUserId);
router.route("/deploy").post(authUser, deployPortfolio);

// User meta data routes



module.exports = router;