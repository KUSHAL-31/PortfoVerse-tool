const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');


const websiteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "K31PortfolioUsers",
        required: true,
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
    ],
    projects: [
        {
            projectId: {
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
            educationId: {
                type: String,
                default: uuidv4,
                unique: true
            },
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
            experienceId: {
                type: String,
                default: uuidv4,
                unique: true
            },
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
    skills: [
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
    testimonials: [
        {
            testimonialId: {
                type: String,
                default: uuidv4,
                unique: true
            },
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
    logo: {
        type: String,
        default: "https://via.placeholder.com/150",
    },
    name: {
        type: String,
        required: [true, "Please enter your website name"],
        minlength: [5, "Website name should have more than 4 characters"],
        maxlength: [20, "Website name should have less than 21 characters"],
    },
    details: {
        url: {
            type: String,
            required: false,
            unique: true,
        },
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("K31PortfolioWebsite", websiteSchema);