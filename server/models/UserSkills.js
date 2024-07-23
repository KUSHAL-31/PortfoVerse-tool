const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const userSkillsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "K31PortfolioUsers",
        required: true,
    },
    skillSection: [
        {
            skillId: {
                type: String,
                default: uuidv4,
                unique: true
            },
            heading: {
                type: String,
                required: false,
            },
            list: [
                {
                    name: {
                        type: String,
                        required: false,
                    },
                    rating: {
                        type: Number,
                        required: false,
                        max: 100,
                    }
                }
            ]
        }
    ],
});


module.exports = mongoose.model("UserPortfolioSkills", userSkillsSchema);