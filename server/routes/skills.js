const express = require("express");
const { listNewSkillSection, editSkillSection, getAllSkillSections, getSkillsById, deleteSkillSection } = require("../controllers/skillsController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// SKills API
router.route("/create").post(authUser, listNewSkillSection);
router.route("/edit").patch(authUser, editSkillSection);
router.route("/getAll").get(authUser, getAllSkillSections);
router.route("/get/:id").get(authUser, getSkillsById);
router.route("/remove").post(authUser, deleteSkillSection);



module.exports = router;