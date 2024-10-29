const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const userWebsiteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "K31PortfolioUsers",
        required: true,
    },
    portfolio: {
        type: mongoose.Schema.ObjectId,
        ref: "K31PortfolioWebsite",
        required: true,
    },
    projects: [
        {
            projectId: {
                type: String,
                default: uuidv4,
            },
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            image: {
                public_id: {
                    type: String,
                },
                url: {
                    type: String,
                }
            },
            url: {
                type: String,
                required: false,
            },
            sourceCode: {
                type: String,
                required: false,
            }
        }
    ],
});


module.exports = mongoose.model("UserPortfolioProjects", userWebsiteSchema);