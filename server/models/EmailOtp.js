const mongoose = require("mongoose");

const emailOtpSchema = new mongoose.Schema({
    email: {
        type: String
    },
    otp: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiryAt: {
        type: Date
    },
});


module.exports = mongoose.model("EmailOtp", emailOtpSchema);