const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const websiteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "K31PortfolioUsers",
        required: true,
    },
    logo: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    headerTitle: {
        type: String,
        required: false,
    },
    details: {
        websiteName: {
            type: String,
            required: [true, "Please enter your website name"],
            minlength: [5, "Website name should have more than 4 characters"],
            maxlength: [20, "Website name should have less than 21 characters"],
        },
        websiteUrl: {
            type: String,
            required: false,
            unique: true,
        },

    },
    isPublished: {
        type: Boolean,
        default: false,
        required: false,
    },
});

module.exports = mongoose.model("K31PortfolioWebsite", websiteSchema);