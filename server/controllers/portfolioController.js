const { default: axios } = require("axios");
const Users = require("../models/Users");
const UserPortfolio = require("../models/PortfolioWebsite");
const UserExpEdu = require("../models/UserExperienceEducation");
const UserProjects = require("../models/UserProjects");
const UserSkills = require("../models/UserSkills");
const UserServices = require("../models/UserServices");
const UserTestimonials = require("../models/UserTestimonials");
const UserMetaData = require("../models/UserMetaData");
const asyncErrorHandler = require("../utility/asyncErrorHandler");
const HandleError = require("../utility/handleError");
const cloudinary = require("cloudinary");


exports.createNewPortfolio = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { logo, headerTitle, websiteName, isPublished, isLogoEdited } = req.body;

    if (!headerTitle || !websiteName || !websiteUrl) {
        return next(new HandleError("Please fill all the fields", 400));
    }
    // if (isLogoEdited) {
    //     if (!logo) {
    //         return next(new HandleError("Please provide a logo", 400));
    //     }
    //     if (portfolioData.logo) {
    //         await cloudinary.uploader.destroy(portfolioData.logo.public_id);
    //     }
    //     const result = await cloudinary.v2.uploader.upload(logo, {
    //         folder: "k31portfolios",
    //     });
    //     updateObject.logo = { public_id: result.public_id, url: result.secure_url };
    // }
    // If the portfolio data doesn't exist, create a new document
    await UserPortfolio.create({
        user: userId,
        // logo: { public_id: updateObject.image.public_id, url: updateObject.image.url },
        headerTitle,
        details: {
            websiteName,
        },
        isPublished, // Default value if not provided
    });

    res.status(200).json({
        success: true,
        message: 'New portfolio created successfully!',
    });
});


exports.changePortfolioDetails = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { portfolioId, logo, headerTitle, websiteName, isPublished, isLogoEdited } = req.body;

    if (!headerTitle) {
        return next(new HandleError("Please fill all the fields", 400));
    }

    // Check if the user portfolio exists
    let portfolioData = await UserPortfolio.findOne({ user: userId, _id: portfolioId });

    // if (isLogoEdited) {
    //     if (!logo) {
    //         return next(new HandleError("Please provide a logo", 400));
    //     }
    //     if (portfolioData.logo) {
    //         await cloudinary.uploader.destroy(portfolioData.logo.public_id);
    //     }
    //     const result = await cloudinary.v2.uploader.upload(logo, {
    //         folder: "k31portfolios",
    //     });
    //     updateObject.logo = { public_id: result.public_id, url: result.secure_url };
    // }

    if (!portfolioData) {
        // If the portfolio data doesn't exist, create a new document
        portfolioData = await UserPortfolio.create({
            logo,
            user: userId,
            // logo: { public_id: updateObject.image.public_id, url: updateObject.image.url },
            headerTitle,
            details: {
                websiteName,
            },
            isPublished, // Default value if not provided
        });
    } else {
        // If the portfolio data exists, update only the specified fields
        let updateObject = { headerTitle, isPublished, logo, details: { websiteName } };

        portfolioData = await UserPortfolio.findByIdAndUpdate(
            portfolioData._id,
            { $set: updateObject },
            { new: true, runValidators: true }
        );
    }

    res.status(200).json({
        success: true,
        message: 'Information updated successfully!',
        portfolioData,
    });
});



// API for deploying the portfolio on vercel

exports.deployPortfolio = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { username } = req.body;
    const response = await axios.post("https://api.vercel.com/v10/projects?slug=kushals-projects-d029e2c1&teamId=team_DSq1hxxsUEmeLwFsf0vl4G7d", {
        "name": `${username}-portfolio`,
        "environmentVariables": [
            {
                "key": "REACT_APP_PORTFOLIO_USER_ID",
                "target": ["production"],
                "value": `${userId}`
            },
            {
                "key": "REACT_APP_BACKEND_HOSTED_URL",
                "target": ["production"],
                "value": "https://k31-portfolio-maker-backend-service.onrender.com"
            }
        ],
        "gitRepository": {
            "repo": "https://github.com/KUSHAL-31/k31-portfolio-template",
            "type": "github"
        },
        "headers": {
            "Authorization": `Bearer ${process.env.VERCEL_TOKEN}`,
        },
    });
    // const response = await fetch(process.env.VERCEL_CREATE_NEW_PROJECT_API, {
    //     "body": {
    //         "name": `${username}-portfolio`,
    //     },
    //     "headers": {
    //         "Authorization": `Bearer ${process.env.VERCEL_TOKEN}`,
    //     },
    //     "method": "post"
    // });
    // console.log(response);
    res.status(200).json({
        success: true,
        message: 'Website deployed successfully!',
    });
});

// Check if Portoflio exists with the portfolio name or not 
exports.doesPortfolioExists = asyncErrorHandler(async (req, res, next) => {
    const { websiteName } = req.body;
    const portfolio = await UserPortfolio.findOne({ "details.websiteName": websiteName, isPublished: true });
    if (!portfolio) {
        return res.status(200).json({
            success: true,
            doesExists: false,
            message: 'No Portfolio exists with this name',
        });
    }
    res.status(200).json({
        success: true,
        doesExists: true,
        portfolioId: portfolio._id,
        message: 'Portfolio exists with this name',
    });
});


// Get All Portfolio details

exports.getAllPortfolioDetails = asyncErrorHandler(async (req, res, next) => {
    const { portfolioId } = req.body;

    // Get the portfolio details based on portfolioId
    const portfolio = await UserPortfolio.findById(portfolioId);

    // Get user details based on userId

    const user = await Users.findById(portfolio.user);

    res.status(200).json({
        success: true,
        portfolio,
        user,
        message: 'Portfolio details fetched successfully',
    });
});

// Get All Portfolio details ( for template website )

exports.getAllPortfolioDetails = asyncErrorHandler(async (req, res, next) => {
  const { portfolioId } = req.body;

  // Get the portfolio details based on portfolioId
  const portfolio = await UserPortfolio.findById(portfolioId);

  // Get user details based on userId

  const user = await Users.findById(portfolio.user);

  // Get the user experience and education details based on userId
  const userExpEdu = await UserExpEdu.findOne({
    user: portfolio.user,
    portfolio: portfolioId,
  });

  // Get the user projects details based on userId
  const userProjects = await UserProjects.findOne({
    user: portfolio.user,
    portfolio: portfolioId,
  });

  // Get the user skills details based on userId
  const userSkills = await UserSkills.findOne({
    user: portfolio.user,
    portfolio: portfolioId,
  });

  // Get the user services details based on userId
  const userServices = await UserServices.findOne({
    user: portfolio.user,
    portfolio: portfolioId,
  });

  // Get the user testimonials details based on userId
  const userTestimonials = await UserTestimonials.findOne({
    user: portfolio.user,
    portfolio: portfolioId,
  });

  // Get the user meta data details based on userId
  const userMetaData = await UserMetaData.findOne({
    user: portfolio.user,
    portfolio: portfolioId,
  });

  res.status(200).json({
    success: true,
    portfolio,
    user,
    userExpEdu,
    userProjects,
    userSkills,
    userServices,
    userTestimonials,
    userMetaData,
    message: "Portfolio details fetched successfully",
  });
});



// Check if portfolio name is available for not

exports.checkPortfolioName = asyncErrorHandler(async (req, res, next) => {
    const { websiteName } = req.query;

    const portfolio = await UserPortfolio.findOne({ "details.websiteName": websiteName, isPublished: true });

    const isAvailable = !portfolio;

    res.status(200).json({
        success: true,
        isAvailable,
        message: isAvailable ? 'Website name is available' : 'Website name is already taken',
    });
});

exports.getAllUserPortfolios = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const portfolios = await UserPortfolio.find({ user: userId });
    res.status(200).json({
        success: true,
        portfolios,
        message: "User Portfolios fetched successfully",
    });
});


// Delete portfolio image by ID
exports.deletePortfolioImage = asyncErrorHandler(async (req, res, next) => {
    const { imageId } = req.params;
    const userId = req.user.id;

    let userMetaData = await UserPortfolioMetaData.findOne({ user: userId });

    if (!userMetaData) {
        return next(new HandleError("Portfolio metadata not found", 404));
    }

    const imageIndex = userMetaData.images.findIndex(img => img.public_id === imageId);

    if (imageIndex === -1) {
        return next(new HandleError("Image not found", 404));
    }

    // Remove from Cloudinary
    await cloudinary.v2.uploader.destroy(imageId);

    // Remove from the array
    userMetaData.images.splice(imageIndex, 1);
    await userMetaData.save();

    res.status(200).json({
        success: true,
        message: "Image deleted successfully",
    });
});


// Add a new portfolio image
exports.addPortfolioImage = asyncErrorHandler(async (req, res, next) => {
    const { image } = req.body;
    const userId = req.user.id;

    if (!image ) {
        return next(new HandleError("Image is required", 400));
    }

    let userMetaData = await UserPortfolioMetaData.findOne({ user: userId });

    if (!userMetaData) {
        return next(new HandleError("Portfolio metadata not found", 404));
    }

    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(image, {
        folder: "k31portfolios",
    });

    // Add new image to the array
    userMetaData.images.push({
        public_id: result.public_id,
        url: result.secure_url,
    });

    await userMetaData.save();

    res.status(200).json({
        success: true,
        message: "Image added successfully",
    });
});