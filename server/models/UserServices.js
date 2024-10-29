const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const userServicesSchema = new mongoose.Schema({
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
    services: [
        {
            serviceId: {
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
            }
        }
    ]
});


module.exports = mongoose.model("UserPortfolioServices", userServicesSchema);