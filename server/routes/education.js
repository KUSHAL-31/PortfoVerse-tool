const express = require("express");
const {
  getAllEducationByUserId,
  getEducationById,
  deleteEducationById,
  addNewEducation,
  editEducationById,
} = require("../controllers/expEduController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// SKills API
router.route("/create").post(authUser, addNewEducation);
router.route("/edit").patch(authUser, editEducationById);
router.route("/getAll/:id").get(authUser, getAllEducationByUserId);
router.route("/get").get(authUser, getEducationById);
router.route("/remove").post(authUser, deleteEducationById);



module.exports = router;