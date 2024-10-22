const { default: axios } = require("axios");
const UserPortfolio = require("../models/PortfolioWebsite");
const UserExpEdu = require("../models/UserExperienceEducation");
const UserProjects = require("../models/UserProjects");
const UserSkills = require("../models/UserSkills");
const UserServices = require("../models/UserServices");
const userTestimonials = require("../models/UserTestimonials");
const UserMetaData = require("../models/UserMetaData");
const asyncErrorHandler = require("../utility/asyncErrorHandler");
const HandleError = require("../utility/handleError");
const cloudinary = require("cloudinary");
const { v4: uuidv4 } = require('uuid');


exports.changePortfolioDetails = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { logo, headerTitle, websiteName, isLogoEdited } = req.body;

    if (!headerTitle) {
        return next(new HandleError("Please fill all the fields", 400));
    }

    // Check if the user portfolio exists
    let portfolioData = await UserPortfolio.findOne({ user: userId });

    if (isLogoEdited) {
        if (!logo) {
            return next(new HandleError("Please provide a logo", 400));
        }
        if (portfolioData.logo) {
            await cloudinary.uploader.destroy(portfolioData.logo.public_id);
        }
        const result = await cloudinary.v2.uploader.upload(logo, {
            folder: "k31portfolios",
        });
        updateObject.logo = { public_id: result.public_id, url: result.secure_url };
    }

    if (!portfolioData) {
        // If the portfolio data doesn't exist, create a new document
        portfolioData = await UserPortfolio.create({
            user: userId,
            logo: { public_id: updateObject.image.public_id, url: updateObject.image.url },
            headerTitle,
            details: {
                websiteName,
            },
            isPublished: true, // Default value if not provided
        });
    } else {
        // If the portfolio data exists, update only the specified fields
        let updateObject = { headerTitle };

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
    const portfolio = await UserPortfolio.findOne({ "details.websiteName": websiteName });
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


// Get All Portfolio details ( for template website )

exports.getAllPortfolioDetails = asyncErrorHandler(async (req, res, next) => {
    const { portfolioId } = req.body;

    // Get the portfolio details based on portfolioId
    const portfolio = await UserPortfolio.findById(portfolioId);

    // Get the user experience and education details based on userId
    const userExpEdu = await UserExpEdu.findOne({ user: portfolio.user });

    // Get the user projects details based on userId
    const userProjects = await UserProjects.findOne({ user: portfolio.user });

    // Get the user skills details based on userId
    const userSkills = await UserSkills.findOne({ user: portfolio.user });

    // Get the user services details based on userId
    const userServices = await UserServices.findOne({ user: portfolio.user });

    // Get the user testimonials details based on userId
    const userTestimonials = await UserTestimonials.findOne({ user: portfolio.user });

    // Get the user meta data details based on userId
    const userMetaData = await UserMetaData.findOne({ user: portfolio.user });


    res.status(200).json({
        success: true,
        portfolio,
        userExpEdu,
        userProjects,
        userSkills,
        userServices,
        userTestimonials,
        userMetaData,
        message: 'Portfolio details fetched successfully',
    });
});