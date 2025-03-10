const UserExpEdu = require("../models/UserExperienceEducation");
const asyncErrorHandler = require("../utility/asyncErrorHandler");
const HandleError = require("../utility/handleError");
const { v4: uuidv4 } = require('uuid');

exports.addNewEducations = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { portfolioId, educations } = req.body;

  if (
    !portfolioId ||
    !educations ||
    !Array.isArray(educations) ||
    educations.length === 0
  ) {
    return next(
      new HandleError(
        "Please provide portfolioId and at least one education entry",
        400
      )
    );
  }

  // Validate each education entry
  for (const education of educations) {
    const { degree, school, startDate, endDate, result } = education;
    if (!degree || !school || !startDate || !endDate || !result) {
      return next(
        new HandleError(
          "Each education entry must include degree, school, startDate, endDate, and result",
          400
        )
      );
    }
  }

  // Find the user's education and experience document
  let expEduDetails = await UserExpEdu.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!expEduDetails) {
    expEduDetails = new UserExpEdu({
      user: userId,
      portfolio: portfolioId,
      education: [],
      experience: [],
    });
  }

  // Create and add new education entries
  const newEducations = educations.map((education) => ({
    educationId: uuidv4(),
    degree: education.degree,
    school: education.school,
    startDate: education.startDate,
    endDate: education.endDate,
    result: education.result,
    comments: education.comments || "",
  }));

  // Add all new education entries to the existing array
  expEduDetails.education = [...expEduDetails.education, ...newEducations];

  // Save the updated document
  await expEduDetails.save();

  return res.status(201).json({
    success: true,
    message: `${newEducations.length} education entries added successfully!`,
    education: expEduDetails.education,
  });
});

exports.editEducationsByIds = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { portfolioId, educations } = req.body;

  if (
    !portfolioId ||
    !educations ||
    !Array.isArray(educations) ||
    educations.length === 0
  ) {
    return next(
      new HandleError(
        "Please provide portfolioId and at least one education entry to update",
        400
      )
    );
  }

  // Validate each education entry
  for (const education of educations) {
    const { educationId, degree, school, startDate, endDate, result } =
      education;
    if (
      !educationId ||
      !degree ||
      !school ||
      !startDate ||
      !endDate ||
      !result
    ) {
      return next(
        new HandleError(
          "Each education entry must include educationId, degree, school, startDate, endDate, and result",
          400
        )
      );
    }
  }

  // Find the user's education and experience document
  const expEduDetails = await UserExpEdu.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!expEduDetails) {
    return next(new HandleError("User education details not found", 404));
  }

  // Update each education entry
  const updatedIds = [];
  const notFoundIds = [];

  for (const education of educations) {
    const { educationId } = education;
    const educationIndex = expEduDetails.education.findIndex(
      (e) => e.educationId === educationId
    );

    if (educationIndex === -1) {
      notFoundIds.push(educationId);
      continue;
    }

    expEduDetails.education[educationIndex] = {
      ...expEduDetails.education[educationIndex],
      ...education,
    };
    updatedIds.push(educationId);
  }

  // If no valid education entries were found, return an error
  if (updatedIds.length === 0) {
    return next(
      new HandleError("None of the specified education entries were found", 404)
    );
  }

  // Save the updated document
  await expEduDetails.save();

  const response = {
    success: true,
    message: `${updatedIds.length} education entries updated successfully!`,
    education: expEduDetails.education,
  };

  // Include information about any not found education entries
  if (notFoundIds.length > 0) {
    response.warning = `${
      notFoundIds.length
    } education entries not found: ${notFoundIds.join(", ")}`;
  }

  res.status(200).json(response);
});

exports.deleteEducationsByIds = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { portfolioId, educationIds } = req.body;

  if (
    !portfolioId ||
    !educationIds ||
    !Array.isArray(educationIds) ||
    educationIds.length === 0
  ) {
    return next(
      new HandleError(
        "Please provide portfolioId and at least one educationId",
        400
      )
    );
  }

  // Find the user's education and experience document
  const expEduDetails = await UserExpEdu.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!expEduDetails) {
    return next(new HandleError("User education details not found", 404));
  }

  // Track successful deletions and not found IDs
  const deletedIds = [];
  const notFoundIds = [];

  // Filter out the educations to delete
  const originalLength = expEduDetails.education.length;
  expEduDetails.education = expEduDetails.education.filter((education) => {
    if (educationIds.includes(education.educationId)) {
      deletedIds.push(education.educationId);
      return false; // Remove this education
    }
    return true; // Keep this education
  });

  // Check if any education entries were not found
  educationIds.forEach((id) => {
    if (!deletedIds.includes(id)) {
      notFoundIds.push(id);
    }
  });

  // If no valid education entries were found, return an error
  if (deletedIds.length === 0) {
    return next(
      new HandleError("None of the specified education entries were found", 404)
    );
  }

  // Save the updated document
  await expEduDetails.save();

  const response = {
    success: true,
    message: `${deletedIds.length} education entries deleted successfully!`,
    education: expEduDetails.education,
  };

  // Include information about any not found education entries
  if (notFoundIds.length > 0) {
    response.warning = `${
      notFoundIds.length
    } education entries not found: ${notFoundIds.join(", ")}`;
  }

  res.status(200).json(response);
});

exports.getAllEducationByUserId = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const portfolioId = req.params.id;

    // Find the user's education details document
    const expEduDetails = await UserExpEdu.findOne({ user: userId, portfolio: portfolioId });

    if (!expEduDetails) {
        return next(new HandleError("No education found", 404));
    }

    res.status(200).json({
        success: true,
        message: 'Education retrieved successfully!',
        education: expEduDetails.education
    });
});


exports.getEducationById = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const educationId = req.query.educationId;
    const portfolioId = req.query.portfolioId;

    if (!educationId) {
        return next(new HandleError("Education ID is required", 400));
    }

    // Find the user's education details document
    const expEduDetails = await UserExpEdu.findOne({ user: userId, portfolio: portfolioId });

    if (!expEduDetails) {
        return next(new HandleError("User education details not found", 404));
    }

    // Find the education by educationId
    const education = expEduDetails.education.find(e => e.educationId === educationId);

    if (!education) {
        return next(new HandleError("Education not found", 404));
    }

    res.status(200).json({
        success: true,
        message: 'Education retrieved successfully!',
        education
    });
});



// Experience APIs


exports.addNewExperience = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { portfolioId, title, company, startDate, endDate, description, certificate, isPresent } = req.body;

    if (!title || !company || !startDate || !description) {
        return next(new HandleError("Please fill the mandatory fields", 400));
    }

    // Find the user's education and experience document
    let expEduDetails = await UserExpEdu.findOne({ user: userId, portfolio: portfolioId });

    if (!expEduDetails) {
        expEduDetails = new UserExpEdu({ user: userId, portfolio: portfolioId, education: [], experience: [] });
    }

    // Create a new experience entry
    const newExperience = {
        experienceId: uuidv4(),
        title,
        company,
        startDate,
        endDate,
        description,
        certificate,
        isPresent,
    };

    // Push the new experience into the experience array
    expEduDetails.experience.push(newExperience);

    // Save the updated document
    await expEduDetails.save();

    return res.status(201).json({
        success: true,
        message: 'Experience added successfully!',
        experience: expEduDetails.experience
    });
});



exports.editExperienceById = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { portfolioId, experienceId, title, company, startDate, endDate, description, certificate, isPresent } = req.body;

    if (!experienceId || !title || !company || !startDate || !description) {
        return next(new HandleError("Please fill the mandatory fields", 400));
    }

    // Find the user's education and experience document
    const expEduDetails = await UserExpEdu.findOne({ user: userId, portfolio: portfolioId });

    if (!expEduDetails) {
        return next(new HandleError("User experience details not found", 404));
    }

    // Find the experience entry by experienceId and update it
    const experienceIndex = expEduDetails.experience.findIndex(e => e.experienceId === experienceId);

    if (experienceIndex === -1) {
        return next(new HandleError("Experience not found", 404));
    }

    expEduDetails.experience[experienceIndex] = {
        ...expEduDetails.experience[experienceIndex],
        experienceId,
        title,
        company,
        startDate,
        endDate,
        description,
        certificate,
        isPresent,
    };

    // Save the updated document
    await expEduDetails.save();

    res.status(200).json({
        success: true,
        message: 'Experience updated successfully!',
        experience: expEduDetails.experience
    });
});



exports.deleteExperienceById = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { portfolioId, experienceId } = req.body;

    if (!experienceId) {
        return next(new HandleError("Experience ID is required", 400));
    }

    // Find the user's education and experience document
    const expEduDetails = await UserExpEdu.findOne({ user: userId, portfolio: portfolioId });

    if (!expEduDetails) {
        return next(new HandleError("User experience details not found", 404));
    }

    // Find the index of the experience to delete
    const experienceIndex = expEduDetails.experience.findIndex(e => e.experienceId === experienceId);

    if (experienceIndex === -1) {
        return next(new HandleError("Experience not found", 404));
    }

    // Remove the experience from the array
    expEduDetails.experience.splice(experienceIndex, 1);

    // Save the updated document
    await expEduDetails.save();

    res.status(200).json({
        success: true,
        message: 'Experience deleted successfully!',
        experience: expEduDetails.experience
    });
});


exports.getAllExperienceByUserId = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const portfolioId = req.params.id;

    // Find the user's experience details document
    const expEduDetails = await UserExpEdu.findOne({ user: userId, portfolio: portfolioId });

    if (!expEduDetails) {
        return next(new HandleError("No experience found", 404));
    }

    res.status(200).json({
        success: true,
        message: 'Experience retrieved successfully!',
        experience: expEduDetails.experience
    });
});


exports.getExperienceById = asyncErrorHandler(async (req, res, next) => {
    const userId = req.user.id;
    const experienceId = req.query.experienceId;
    const portfolioId = req.query.portfolioId;

    if (!experienceId) {
        return next(new HandleError("Experience ID is required", 400));
    }

    // Find the user's experience details document
    const expEduDetails = await UserExpEdu.findOne({ user: userId, portfolio: portfolioId });

    if (!expEduDetails) {
        return next(new HandleError("User experience details not found", 404));
    }

    // Find the experience by experienceId
    const experience = expEduDetails.experience.find(e => e.experienceId === experienceId);

    if (!experience) {
        return next(new HandleError("Experience not found", 404));
    }

    res.status(200).json({
        success: true,
        message: 'Experience retrieved successfully!',
        experience
    });
});