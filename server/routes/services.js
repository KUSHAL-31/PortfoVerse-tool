const express = require("express");
const {
  listNewServiceByUserId,
  getAllservicesByUserId,
  getServiceById,
  deleteServicesByUserId,
  editServicesByUserId,
} = require("../controllers/serviceController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// SKills API
router.route("/create").post(authUser, listNewServiceByUserId);
router.route("/edit").patch(authUser, editServicesByUserId);
router.route("/getAll/:id").get(authUser, getAllservicesByUserId);
router.route("/get").get(authUser, getServiceById);
router.route("/remove").post(authUser, deleteServicesByUserId);



module.exports = router;