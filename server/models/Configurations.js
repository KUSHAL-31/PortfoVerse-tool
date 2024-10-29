const mongoose = require("mongoose");

const Configurations = new mongoose.Schema({
    ckvp: [
        {
            category: {
                type: String,
                // required: true,
            },
            key: {
                type: String,
                // required: true,
            },
            value: {
                type: String,
                // required: true,
            }
        }
    ],
    referral: [
        {
            type: {
                type: String,
                // required: true,
            },
            code: {
                type: String,
                // required: true,
            },
            value: {
                type: String,
                // required: true,
            }
        }
    ]
});

module.exports = mongoose.model("K31PortfolioConfigurations", Configurations);