const express = require("express");
const { changePortfolioDetails, doesPortfolioExists, getAllPortfolioDetails, checkPortfolioName, getAllUserPortfolios, createNewPortfolio } = require("../controllers/portfolioController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// SKills API
router.route("/create").post(authUser, createNewPortfolio);
router.route("/update").post(authUser, changePortfolioDetails);
router.route("/check").post(doesPortfolioExists);
router.route("/details").post(getAllPortfolioDetails);
router.route("/name/available").get(authUser, checkPortfolioName);
router.route("/getAll").get(authUser, getAllUserPortfolios);


module.exports = router;