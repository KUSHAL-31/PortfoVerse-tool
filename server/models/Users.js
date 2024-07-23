const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your username"],
        minlength: [5, "Username should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    avatar: {
        type: String,
        default: "https://via.placeholder.com/150",
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password should be more than 6 characters"],
        select: false,
    },
    heroSection: {
        image: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        },
        title: {
            type: String,
            required: true,
        },
        roles: [
            {
                name: {
                    type: String,
                    required: true,
                }
            }
        ],
        description: {
            type: String,
            required: true,
        },

    },
    socials: [
        {
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    resume: {
        type: String,
    },
    services: [
        {
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
    projects: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            image: {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                }
            },
            url: {
                type: String,
                required: false,
            },
            sourceCode: {
                type: String,
                required: false,
            }
        }
    ],
    education: [
        {
            degree: {
                type: String,
                required: true,
            },
            school: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
            result: {
                type: String,
                required: true,
            },
            comments: {
                type: String,
                required: false,
            }
        }
    ],
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
            description: [
                {
                    point: {
                        type: String,
                        required: true,
                    }
                }
            ],
            certificate: {
                type: String,
                required: false,
            }
        }
    ],
    skills: {
        heading: {
            type: String,
            required: true,
        },
        list: [
            {
                name: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                    max: 100,
                }
            }
        ]
    },
    testimonials: [
        {
            name: {
                type: String,
                required: true,
            },
            role: {
                type: String,
                required: true,
            },
            image: {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                }
            },
            comment: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
                max: 5,
            },
            recivedAt: {
                type: Date,
                required: true,
            }
        }
    ],
    contactMeEnabled: {
        type: Boolean,
        default: false,
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

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.getJWTtoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

userSchema.methods.comparePassword = async function (GivenPassword) {
    return await bcrypt.compare(GivenPassword, this.password);
}

module.exports = mongoose.model("K31PortfolioUsers", userSchema);