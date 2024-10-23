const express = require("express");
const { addNewEducation, editEducationById, getAllEducationByUserId, getEducationById, deleteEducationById } = require("../controllers/expEduController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// SKills API
router.route("/create").post(authUser, addNewEducation);
router.route("/edit").patch(authUser, editEducationById);
router.route("/getAll").get(authUser, getAllEducationByUserId);
router.route("/get/:id").get(authUser, getEducationById);
router.route("/remove").post(authUser, deleteEducationById);



module.exports = router;