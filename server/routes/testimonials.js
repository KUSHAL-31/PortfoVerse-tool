const express = require("express");
const { listNewTestimonialByUserId, editTestimonialByUserId, getAlltestimonialsByUserId, getTestimonialById, deletetestimonialByUserId } = require("../controllers/testimonalController");
const { authUser } = require("../middlewares/auth");
const router = express.Router();

// SKills API
router.route("/create").post(authUser, listNewTestimonialByUserId);
router.route("/edit").patch(authUser, editTestimonialByUserId);
router.route("/getAll").get(authUser, getAlltestimonialsByUserId);
router.route("/get/:id").get(authUser, getTestimonialById);
router.route("/remove").post(authUser, deletetestimonialByUserId);



module.exports = router;