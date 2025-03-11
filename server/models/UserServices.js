const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const userServicesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
        required: true,
    },
    portfolio: {
        type: mongoose.Schema.ObjectId,
        ref: "WebsiteDetails",
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
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});


module.exports = mongoose.model("Services", userServicesSchema);