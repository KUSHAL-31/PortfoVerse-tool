const express = require("express");
const { registerUser, loginUser, logoutUser, getUserBasicDetails, getUserResumeLink, getUserSpecificSectionDetails, isUserContactMeEnabled } = require("../controllers/userController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/user/details").get(authUser, getUserBasicDetails);
router.route("/section/details").get(authUser, getUserSpecificSectionDetails);
router.route("/user/resume").get(authUser, getUserResumeLink);
router.route("/user/contactme").get(authUser, isUserContactMeEnabled);
module.exports = router;