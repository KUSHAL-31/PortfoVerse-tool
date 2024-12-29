const User = require("../models/Users");
// const PortfolioWebsite = require("../models/PortfolioWebsite");
const UserMetaData = require("../models/UserMetaData");
const EmailOtp = require("../models/EmailOtp");
const asyncErrorHandler = require("../utility/asyncErrorHandler");
const sendToken = require("../utility/token");
const HandleError = require("../utility/handleError");
const cloudinary = require("cloudinary");
const { sendOtpMail } = require("../middlewares/sendEmail");

// API to register a user
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    let user;
    const { username, email, password, phoneNumber } = req.body;
    user = await User.create({
        username, email, password, phoneNumber
    })
    sendToken(user, 201, res);
})


// API to login a user
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


// API to logout a user
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    console.log("Logout user");
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Logout successfully" });
})

// Generate OTP for email verification

exports.generateOtp = asyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new HandleError("Please provide an email", 400));
    }
    //find if there's already one otp present for the email
    const checkIfOtpExists = await EmailOtp.findOne({ email: email });
    if (checkIfOtpExists) {
        await EmailOtp.deleteOne({ email: email })
    }

    // Generate a random 5 digit OTP
    const otp = Math.floor(10000 + Math.random() * 90000);

    // Create a new OTP
    await EmailOtp.create({
        email: email,
        otp: otp,
        // OTP expires in 2 minutes
        expiryAt: new Date(Date.now() + 2 * 60 * 1000)
    })

    sendOtpMail(email, otp)
    return res.status(200).json({
        success: true,
        message: "OTP sent to your email",
    });
})

// Verify OTP for email verification

exports.verifyOtp = asyncErrorHandler(async (req, res, next) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return next(new HandleError("Please provide an email and otp", 400));
    }
    const otpDetails = await EmailOtp.findOne({ email: email });
    if (!otpDetails) {
        return next(new HandleError("OTP not found", 400));
    }
    if (otpDetails.expiryAt < new Date()) {
        return next(new HandleError("OTP expired", 400));
    }
    if (otpDetails.otp !== otp) {
        return next(new HandleError("Invalid OTP", 400));
    }
    await EmailOtp.deleteMany({ email: email });
    return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
    });

})


// API to edit username by user id
exports.changeUsernameByUserId = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { username } = req.body;
    if (username === undefined) {
        return next(new HandleError("Please provide a username", 400));
    }
    const user = await User.findByIdAndUpdate(userId, {
        $set: { username }
    }, { new: true, runValidators: true });
    res.status(200).json({
        success: true,
        message: 'Username updated successfully!',
        user,
    });
});


exports.getUserDetailsById = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    console.log(userId);
    const user = await User.findById(userId).select("username email avatar createdAt");
    if (!user) {
        return next(new HandleError("User does not exist", 400));
    }
    res.status(200).json({
        success: true,
        message: 'User details fetched successfully',
        user,
    });
});

exports.createUserMetaData = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { portfolioId, title, description, resume, image, roles, socials } = req.body;
    if (title === undefined || description === undefined || roles === undefined) {
        return next(new HandleError("Please fill all the fields", 400));
    }
    let objectToCreate = { title, description, resume, roles, socials, images: [image] };
    // if (image) {
    //     const result = await cloudinary.v2.uploader.upload(image, {
    //         folder: "k31portfolios",
    //     });
    //     objectToCreate.image = { public_id: result.public_id, url: result.secure_url, type: "image" };
    // }
    const userMetaData = await UserMetaData.create({
        user: userId,
        portfolio: portfolioId,
        ...objectToCreate,
    });
    if (!userMetaData) {
        return next(new HandleError("Something went wrong", 400));
    }
    res.status(200).json({
        success: true,
        message: 'Details updated successfully',
        userMetaData,
    });
});

// API to change meta data by user id
exports.editUserMetaData = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { portfolioId, title, description, resume, image, roles, socials, isImageEdited, contactMeEnabled } = req.body;
    if (title === undefined || description === undefined || roles === undefined) {
        return next(new HandleError("Please fill all the fields", 400));
    }
    let updateObject = { title, description, resume, roles, socials, contactMeEnabled };
    if (isImageEdited) {
        if (image === undefined) {
            return next(new HandleError("Please provide an image", 400));
        }
        const result = await cloudinary.v2.uploader.upload(image, {
            folder: "k31portfolios",
        });
        updateObject.image = { public_id: result.public_id, url: result.secure_url, type: "image" };
    }

    const userMetaData = await UserMetaData.findOneAndUpdate({ user: userId, portfolio: portfolioId }, {
        $set: updateObject
    }, { new: true, runValidators: true });
    if (!userMetaData) {
        return next(new HandleError("Something went wrong", 400));
    }

    res.status(200).json({
        success: true,
        message: 'Information updated successfully',
        userMetaData,
    });
});


// API to get meta data by user id
exports.getMetaDataByUserId = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const portfolioId = req.params.id;
    const userMetaData = await UserMetaData.findOne({ user: userId, portfolio: portfolioId });
    res.status(200).json({
        success: true,
        userMetaData,
    });
});


exports.toggleContactMeForm = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const portfolioId = req.params.id;
    const { isEnabled } = req.body;
    await UserMetaData.findByIdAndUpdate(portfolioId, {
        $set: { contactMeEnabled: isEnabled }
    }, { new: true, runValidators: true })
    res.status(200).json({
        success: true,
        message: "Contact Me section updated successfully",
    });
});