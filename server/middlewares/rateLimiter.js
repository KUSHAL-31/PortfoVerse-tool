const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: true, // include headers
    legacyHeaders: true, // include X-RateLimit headers
    keyGenerator: (req, res) => {
        return req.realIp;
    },
    handler: (req, res) => {
        return res.status(429).json({
            status: "error",
            message: "Too many requests, please try again later.",
        }
        )
    }
});

module.exports = limiter;