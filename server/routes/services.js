const express = require("express");
const { listNewServiceByUserId, editserviceByUserId, getAllservicesByUserId, getServiceById, deleteserviceByUserId } = require("../controllers/serviceController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// SKills API
router.route("/create").post(authUser, listNewServiceByUserId);
router.route("/edit").patch(authUser, editserviceByUserId);
router.route("/getAll/:id").get(authUser, getAllservicesByUserId);
router.route("/get").get(authUser, getServiceById);
router.route("/remove").post(authUser, deleteserviceByUserId);



module.exports = router;