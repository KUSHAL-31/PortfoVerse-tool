const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userTestimonialsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "K31PortfolioUsers",
        required: true,
    },
    portfolio: {
        type: mongoose.Schema.ObjectId,
        ref: "K31PortfolioUsers",
        required: true,
    },
    testimonials: [
        {
            testimonialId: {
                type: String,
                default: uuidv4,
                unique: true
            },
            employerName: {
                type: String,
                required: true,
            },
            employerRole: {
                type: String,
            },
            companyName: {
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
            comment: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
                max: 5,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
});


module.exports = mongoose.model("UserPortfolioTestimonials", userTestimonialsSchema);