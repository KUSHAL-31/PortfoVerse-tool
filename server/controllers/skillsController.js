const UserSkills = require("../models/UserSkills");
const asyncErrorHandler = require("../utility/asyncErrorHandler");
const HandleError = require("../utility/handleError");
const { v4: uuidv4 } = require('uuid');


exports.listNewSkillSection = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { portfolioId, heading, skills } = req.body;
    if (!heading || (!skills && skills.length !== 0)) {
        return next(new HandleError("Please fill the mandatory fields", 400));
    }

    // Find the user's website document
    var skillDetails = await UserSkills.findOne({ user: userId, portfolio: portfolioId });
    if (!skillDetails) {
        skillDetails = new UserSkills({ user: userId, portfolio: portfolioId, skillSection: [] });
    }

    // Create a new skill section
    const newSkill = { skillId: uuidv4(), heading, list: [...skills] }

    // Push the new skill into the skills array

    skillDetails.skillSection.push(newSkill);

    // Save the updated document
    await skillDetails.save();

    res.status(200).json({ success: true, skills: skillDetails.skillSection, message: "New skill section added successfully" });
});

exports.editSkillSection = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { portfolioId, skillId, heading, skills } = req.body;
    if (!skillId || !heading || (!skills && skills.length !== 0)) {
        return next(new HandleError("Please fill the mandatory fields", 400));
    }

    // Find the user's skill document
    const skillDetails = await UserSkills.findOne({ user: userId, portfolio: portfolioId });

    if (!skillDetails) {
        return next(new HandleError("Skill section not found", 404));
    }
    // Find the skill by skillId and update it
    const skillIndex = skillDetails.skillSection.findIndex(s => s.skillId === skillId);

    if (skillIndex === -1) {
        return next(new HandleError("Skill section not found", 404));
    }

    skillDetails.skillSection[skillIndex] = {
        ...skillDetails.skillSection[skillIndex],
        skillId: skillId,
        heading,
        list: skills,
    };

    // Save the updated document
    await skillDetails.save();

    res.status(200).json({
        success: true,
        message: 'skill updated successfully!',
        skill: skillDetails.skillSection
    });

});


exports.deleteSkillSection = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { portfolioId, skillId } = req.body;
    if (!skillId) {
        return next(new HandleError("Something went wrong", 400));
    }

    const skillDetails = await UserSkills.findOne({ user: userId, portfolio: portfolioId });

    if (!skillDetails) {
        return next(new HandleError("Something went wrong", 404));
    }

    // Find the index of the skill to delete
    const skillIndex = skillDetails.skillSection.findIndex(s => s.skillId === skillId);

    if (skillIndex === -1) {
        return next(new HandleError("Something went wrong", 404));
    }

    // Remove the skill from the array
    skillDetails.skillSection.splice(skillIndex, 1);

    // Save the updated document
    await skillDetails.save();

    res.status(200).json({
        success: true,
        message: 'skill deleted successfully!',
        skills: skillDetails.skillSection
    });
});


exports.getAllSkillSections = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const portfolioId = req.params.id;
    // Find the the skill sections of the user
    const skills = await UserSkills.findOne({ user: userId, portfolio: portfolioId });

    if (!skills) {
        return next(new HandleError("No skills found", 404));
    }
    res.status(200).json({
        success: true,
        message: 'testimonials retrieved successfully!',
        skills: skills,
    });
});


exports.getSkillsById = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const skillId = req.query.skillId;
    const portfolioId = req.query.portfolioId;

    if (!skillId) {
        return next(new HandleError("Something went wrong", 400));
    }

    // Find the user's skill details document
    const skillDetails = await UserSkills.findOne({ user: userId, portfolio: portfolioId });

    // Find the skill by skillId
    const skill = skillDetails.skillSection.find(s => s.skillId === skillId);

    if (!skill) {
        return next(new HandleError("Something went wrong", 404));
    }

    res.status(200).json({
        success: true,
        message: 'Service retrieved successfully!',
        skill
    });
});