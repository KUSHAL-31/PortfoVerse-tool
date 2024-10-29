const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userExperienceEducationSchema = new mongoose.Schema({
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
    education: [
        {
            educationId: {
                type: String,
                default: () => uuidv4(),
            },
            degree: {
                type: String,
                required: true,
            },
            school: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
            result: {
                type: String,
                required: true,
            },
            comments: {
                type: String,
                required: false,
            }
        }
    ],
    experience: [
        {
            experienceId: {
                type: String,
                default: () => uuidv4(),
            },
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
            },
            isPresent: {
                type: Boolean,
                default: false,
            },
            description: [
                {
                    type: String,
                    required: true,
                }
            ],
            certificate: {
                type: String,
                required: false,
            }
        }
    ],
});

module.exports = mongoose.model("UserPortfolioExperienceEducation", userExperienceEducationSchema);