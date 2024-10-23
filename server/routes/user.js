const express = require("express");
const { registerUser, loginUser, logoutUser, getUserDetailsById, createUserMetaData, editUserMetaData, getMetaDataByUserId } = require("../controllers/userController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// User sign up routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/details").get(authUser, getUserDetailsById);

// User portfolio related APIs
router.route("/metadata/create").post(authUser, createUserMetaData);
router.route("/metadata/edit").patch(authUser, editUserMetaData);
router.route("/metadata/details").get(authUser, getMetaDataByUserId);

// User meta data routes



module.exports = router;