const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  logo: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  headerTitle: {
    type: String,
    required: false,
  },
  details: {
    websiteName: {
      type: String,
      // required: [true, "Please enter your website name"],
      minlength: [5, "Website name should have more than 4 characters"],
      maxlength: [30, "Website name should have less than 21 characters"],
    },
  },
  isPublished: {
    type: Boolean,
    default: false,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("WebsiteDetails", websiteSchema);