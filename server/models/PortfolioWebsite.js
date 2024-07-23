const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "K31PortfolioUsers",
        required: true,
    },
    logo: {
        type: String,
        default: "https://via.placeholder.com/150",
    },
    name: {
        type: String,
        required: [true, "Please enter your website name"],
        minlength: [5, "Website name should have more than 4 characters"],
        maxlength: [20, "Website name should have less than 21 characters"],
    },
    details: {
        url: {
            type: String,
            required: false,
            unique: true,
        },
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("K31PortfolioWebsite", websiteSchema);