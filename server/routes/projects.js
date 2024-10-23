const express = require("express");
const { listNewProjectByUserId, editProjectByUserId, getAllProjectsByUserId, getProjectById, deleteProjectByUserId } = require("../controllers/projectController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// SKills API
router.route("/create").post(authUser, listNewProjectByUserId);
router.route("/edit").patch(authUser, editProjectByUserId);
router.route("/getAll").get(authUser, getAllProjectsByUserId);
router.route("/get/:id").get(authUser, getProjectById);
router.route("/remove").post(authUser, deleteProjectByUserId);



module.exports = router;