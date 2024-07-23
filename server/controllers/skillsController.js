const User = require("../models/Users");
const UserSkills = require("../models/UserSkills");
const asyncErrorHandler = require("../utility/asyncErrorHandler");
const HandleError = require("../utility/handleError");
const cloudinary = require("cloudinary");

exports.listNewSkillType = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    // const { heading, }
});