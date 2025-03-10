const express = require("express");
const {
  getAllEducationByUserId,
  getEducationById,
  deleteEducationsByIds,
  addNewEducations,
  editEducationsByIds,
} = require("../controllers/expEduController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// SKills API
router.route("/create").post(authUser, addNewEducations);
router.route("/edit").patch(authUser, editEducationsByIds);
router.route("/getAll/:id").get(authUser, getAllEducationByUserId);
router.route("/get").get(authUser, getEducationById);
router.route("/remove").post(authUser, deleteEducationsByIds);



module.exports = router;