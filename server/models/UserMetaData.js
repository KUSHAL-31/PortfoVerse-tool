const mongoose = require("mongoose");

const userMetaDataSchema = new mongoose.Schema({
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
  resume: {
    type: String,
    required: false,
    default: "",
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
  ],
  title: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  contactMeEnabled: {
    type: Boolean,
    default: false,
  },
  socials: [
    {
      name: {
        type: String,
      },
      url: {
        type: String,
      },
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

module.exports = mongoose.model("UserPortfolioMetaData", userMetaDataSchema);