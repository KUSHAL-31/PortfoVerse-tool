const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const userSkillsSchema = new mongoose.Schema({
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
  skillSection: [
    {
      skillId: {
        type: String,
        default: uuidv4,
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
          },
        },
      ],
    },
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


module.exports = mongoose.model("UserPortfolioSkills", userSkillsSchema);