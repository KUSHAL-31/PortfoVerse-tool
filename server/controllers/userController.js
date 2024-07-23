const User = require("../models/Users");
const PortfolioWebsite = require("../models/PortfolioWebsite");
const asyncErrorHandler = require("../utility/asyncErrorHandler");
const sendToken = require("../utility/token");
const HandleError = require("../utility/handleError");
const cloudinary = require("cloudinary");

exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    let user;
    const { username, email, password } = req.body;
    user = await User.create({
        username, email, password
    })
    sendToken(user, 201, res);
})


exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new HandleError("Please enter both email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new HandleError("Invalid email or password", 400));
    }
    const isPasswordTrue = await user.comparePassword(password);
    if (!isPasswordTrue) {
        return next(new HandleError("Invalid email or password", 400));
    }
    return sendToken(user, 200, res);
})


exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Logout successfully" });
})


exports.getUserBasicDetails = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId).select("username email avatar createdAt");
    return res.status(200).json({ success: true, user, message: "User details fetched successfully" })
});


exports.getUserSpecificSectionDetails = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const section = req.params.section;
    const details = await PortfolioWebsite.find({ user: userId }).select(`${section}`);
    return res.status(200).json({ success: true, details, message: "Details fetched successfully" })
})

exports.getUserResumeLink = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const resume = await User.findById(userId).select("resume");
    return res.status(200).json({ success: true, resume, message: "Details fetched successfully" })
})

exports.isUserContactMeEnabled = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const isEnabled = await User.findById(userId).select("contactMeEnabled");
    return res.status(200).json({ success: true, isEnabled, message: "Details fetched successfully" })
})

exports.create


exports.editUserHeroSection = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { image, isImageEdited, title, roles, description } = req.body;
    if (image === undefined || isImageEdited === undefined || title === undefined || (roles === undefined || roles.length === 0) || description === undefined) {
        return next(new HandleError("Please fill all the fields", 400));
    }
    let result;
    if (isImageEdited) {
        result = await cloudinary.v2.uploader.upload(image, {
            folder: "k31portfolios",
        });
    }
    const heroSectionData = {
        title: title,
        roles: [...roles],
        description: description
    }
    const details = await PortfolioWebsite.findOneAndUpdate({ user: userId }, {
        $set: { heroSection: heroSectionData }
    }, { new: true, upsert: true, runValidators: true });

    if (details) {
        return res.status(200).json({ success: true, details, message: "Information updated successfully" })
    }
    return next(new HandleError("Something went wrong", 400));

});


exports.editUserSocialUrls = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { socials } = req.body;
    const socialDetails = await User.findByIdAndUpdate(userId, {
        $set: { socials }
    }, { new: true, upsert: true, runValidators: true });
    if (socialDetails) {
        return res.status(200).json({ success: true, socialDetails, message: "Information updated successfully" })
    }
    return next(new HandleError("Something went wrong", 400));
});


exports.changeUserResumeLink = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { resume } = req.body;
    const resumeLink = await User.findByIdAndUpdate(userId, {
        $set: { resume }
    }, { new: true, upsert: true, runValidators: true });
    if (resumeLink) {
        return res.status(200).json({ success: true, resumeLink, message: "Information updated successfully" })
    }
    return next(new HandleError("Something went wrong", 400));
});


exports.addNewUserService = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { title, description } = req.body;
    const details = await User.findByIdAndUpdate
});