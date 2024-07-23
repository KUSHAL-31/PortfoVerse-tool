const mongoose = require("mongoose");

const userServicesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "K31PortfolioUsers",
        required: true,
    },
    services: [
        {
            serviceId: {
                type: String,
                default: uuidv4,
                unique: true
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