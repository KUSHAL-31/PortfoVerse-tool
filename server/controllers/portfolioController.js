const { default: axios } = require("axios");
const UserPortfolio = require("../models/PortfolioWebsite");
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