const express = require("express");
const { registerUser, loginUser, logoutUser, getUserBasicDetails, getUserResumeLink, getUserSpecificSectionDetails, isUserContactMeEnabled, editUserHeroSection } = require("../controllers/userController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/details").get(authUser, getUserBasicDetails);
router.route("/section/details").get(authUser, getUserSpecificSectionDetails);
router.route("/resume").get(authUser, getUserResumeLink);
router.route("/contactme").get(authUser, isUserContactMeEnabled);

router.route("/herosection/edit/:id").post(authUser, editUserHeroSection);
module.exports = router;