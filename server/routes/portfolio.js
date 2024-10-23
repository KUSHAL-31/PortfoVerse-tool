const express = require("express");
const { changePortfolioDetails, doesPortfolioExists, getAllPortfolioDetails } = require("../controllers/portfolioController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// SKills API
router.route("/update").post(authUser, changePortfolioDetails);
router.route("/name/check").post(authUser, doesPortfolioExists);
router.route("/details").post(authUser, getAllPortfolioDetails);


module.exports = router;