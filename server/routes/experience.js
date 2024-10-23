const express = require("express");
const { addNewExperience, editExperienceById, getAllExperienceByUserId, getExperienceById, deleteExperienceById } = require("../controllers/expEduController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// SKills API
router.route("/create").post(authUser, addNewExperience);
router.route("/edit").patch(authUser, editExperienceById);
router.route("/getAll").get(authUser, getAllExperienceByUserId);
router.route("/get/:id").get(authUser, getExperienceById);
router.route("/remove").post(authUser, deleteExperienceById);



module.exports = router;