const UserProjects = require("../models/UserProjects");
const asyncErrorHandler = require("../utility/asyncErrorHandler");
const HandleError = require("../utility/handleError");
const cloudinary = require("cloudinary");
const { v4: uuidv4 } = require('uuid');

exports.listNewProjectByUserId = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { title, description, image, url, sourceCode } = req.body;
    if (title === undefined || description === undefined) {
        return next(new HandleError("Please fill the mandatory fields", 400));
    }
    let result;
    if (image) {
        result = await cloudinary.v2.uploader.upload(image, {
            folder: "k31portfolios",
        });
    }

    // Find the user's website document
    const projectDetails = await UserProjects.findOne({ user: userId });
    if (!projectDetails) {
        projectDetails = new UserProjects({ user: userId, projects: [] });
    }

    // Create a new project
    const newProject = {
        projectId: uuidv4(),
        title,
        description,
        image: result ? { public_id: result.public_id, url: result.secure_url } : "",
        url,
        sourceCode
    };

    // Push the new project into the projects array
    projectDetails.projects.push(newProject);

    // Save the updated document
    await projectDetails.save();

    return res.status(201).json({
        success: true,
        message: 'Project added successfully!',
        projects: projectDetails.projects
    });
});


exports.editProjectByUserId = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { projectId, title, description, image, url, sourceCode, isImageEdited } = req.body;

    if (!projectId || !title || !description) {
        return next(new HandleError("Please fill the mandatory fields", 400));
    }

    let result;
    if (image && isImageEdited) {
        result = await cloudinary.uploader.upload(image, {
            folder: "k31portfolios",
        });
    }

    // Find the user's project details document
    const projectDetails = await UserProjects.findOne({ user: userId });

    if (!projectDetails) {
        return next(new HandleError("User project details not found", 404));
    }

    // Find the project by projectId and update it
    const projectIndex = projectDetails.projects.findIndex(p => p.projectId === projectId);

    if (projectIndex === -1) {
        return next(new HandleError("Project not found", 404));
    }

    // Delete previous image from Cloudinary if new image is uploaded
    if (isImageEdited && projectDetails.projects[projectIndex].image.public_id) {
        await cloudinary.uploader.destroy(projectDetails.projects[projectIndex].image.public_id);
    }

    projectDetails.projects[projectIndex] = {
        ...projectDetails.projects[projectIndex],
        title,
        description,
        image: { public_id: result.public_id, url: result.secure_url },
        url,
        sourceCode
    };

    // Save the updated document
    await projectDetails.save();

    res.status(200).json({
        success: true,
        message: 'Project updated successfully!',
        projects: projectDetails.projects
    });
});


exports.deleteProjectByUserId = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { projectId } = req.body;

    if (!projectId) {
        return next(new HandleError("Something went wrong", 400));
    }

    // Find the user's project details document
    const projectDetails = await UserProjects.findOne({ user: userId });

    if (!projectDetails) {
        return next(new HandleError("Project not found", 404));
    }

    // Find the index of the project to delete
    const projectIndex = projectDetails.projects.findIndex(p => p.projectId === projectId);

    if (projectIndex === -1) {
        return next(new HandleError("Project not found", 404));
    }

    // Delete the previous image from Cloudinary if it exists
    if (projectDetails.projects[projectIndex].image && projectDetails.projects[projectIndex].image.public_id) {
        await cloudinary.uploader.destroy(projectDetails.projects[projectIndex].image.public_id);
    }

    // Remove the project from the array
    projectDetails.projects.splice(projectIndex, 1);

    // Save the updated document
    await projectDetails.save();

    res.status(200).json({
        success: true,
        message: 'Project deleted successfully!',
        projects: projectDetails.projects
    });
});


exports.getAllProjectsByUserId = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    // Find the user's project details document
    const projectDetails = await UserProjects.findOne({ user: userId });

    if (!projectDetails) {
        return next(new HandleError("No projects found", 404));
    }

    res.status(200).json({
        success: true,
        message: 'Projects retrieved successfully!',
        projects: projectDetails.projects
    });
});

exports.getProjectById = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { projectId } = req.params;

    if (!projectId) {
        return next(new HandleError("Something went wrong", 400));
    }

    // Find the user's project details document
    const projectDetails = await UserProjects.findOne({ user: userId });

    // Find the project by projectId
    const project = projectDetails.projects.find(p => p.projectId === projectId);

    if (!project) {
        return next(new HandleError("Something went wrong", 404));
    }

    res.status(200).json({
        success: true,
        message: 'Project retrieved successfully!',
        project
    });
});