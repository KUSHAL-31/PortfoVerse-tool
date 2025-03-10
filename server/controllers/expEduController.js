const UserExpEdu = require("../models/UserExperienceEducation");
const asyncErrorHandler = require("../utility/asyncErrorHandler");
const HandleError = require("../utility/handleError");
const { v4: uuidv4 } = require("uuid");

exports.addNewEducation = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { portfolioId, degree, school, startDate, endDate, result, comments } =
    req.body;

  if (!degree || !school || !startDate || !endDate || !result) {
    return next(new HandleError("Please fill the mandatory fields", 400));
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

  // Create a new education entry
  const newEducation = {
    educationId: uuidv4(),
    degree,
    school,
    startDate,
    endDate,
    result,
    comments,
  };

  // Push the new education into the education array
  expEduDetails.education.push(newEducation);

  // Save the updated document
  await expEduDetails.save();

  return res.status(201).json({
    success: true,
    message: "Education added successfully!",
    education: expEduDetails.education,
  });
});

exports.editEducationById = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const {
    portfolioId,
    id : educationId,
    degree,
    school,
    startDate,
    endDate,
    result,
    comments,
    } = req.body;
    
    console.log(req.body);

  // Find the user's education and experience document
  const expEduDetails = await UserExpEdu.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!expEduDetails) {
    return next(new HandleError("User education details not found", 404));
    }
    
    console.log(expEduDetails.education[4]);

  // Find the education entry by educationId and update it
  const educationIndex = expEduDetails.education.findIndex(
    (e) => e.educationId === educationId
  );

  if (educationIndex === -1) {
    return next(new HandleError("Education not found", 404));
  }

  expEduDetails.education[educationIndex] = {
    ...expEduDetails.education[educationIndex],
    educationId,
    degree,
    school,
    startDate,
    endDate,
    result,
    comments,
  };

  // Save the updated document
  await expEduDetails.save();

  res.status(200).json({
    success: true,
    message: "Education updated successfully!",
    education: expEduDetails.education,
  });
});

exports.deleteEducationById = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { portfolioId, educationIds } = req.body;

  if (educationIds.length === 0) {
    return next(new HandleError("Education ID is required", 400));
  }

  // Find the user's education and experience document
  const expEduDetails = await UserExpEdu.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!expEduDetails) {
    return next(new HandleError("User education details not found", 404));
  }

  // Remove the education from the array
  expEduDetails.education = expEduDetails.education.filter(
    (e) => !educationIds.includes(e.educationId)
  );

  // Save the updated document
  await expEduDetails.save();

  res.status(200).json({
    success: true,
    message: "Education deleted successfully!",
    education: expEduDetails.education,
  });
});

exports.getAllEducationByUserId = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const portfolioId = req.params.id;

  // Find the user's education details document
  const expEduDetails = await UserExpEdu.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!expEduDetails) {
    return next(new HandleError("No education found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Education retrieved successfully!",
    education: expEduDetails.education,
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
  const expEduDetails = await UserExpEdu.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!expEduDetails) {
    return next(new HandleError("User education details not found", 404));
  }

  // Find the education by educationId
  const education = expEduDetails.education.find(
    (e) => e.educationId === educationId
  );

  if (!education) {
    return next(new HandleError("Education not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Education retrieved successfully!",
    education,
  });
});

// Experience APIs

exports.addNewExperience = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const {
    portfolioId,
    title,
    company,
    startDate,
    endDate,
    description,
    certificate,
    isPresent,
  } = req.body;

  if (!title || !company || !startDate || !description) {
    return next(new HandleError("Please fill the mandatory fields", 400));
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
    message: "Experience added successfully!",
    experience: expEduDetails.experience,
  });
});

exports.editExperienceById = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const {
    portfolioId,
    id : experienceId,
    title,
    company,
    startDate,
    endDate,
    description,
    certificate,
    isPresent,
  } = req.body;

  if (!experienceId || !title || !company || !startDate || !description) {
    return next(new HandleError("Please fill the mandatory fields", 400));
  }

  // Find the user's education and experience document
  const expEduDetails = await UserExpEdu.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!expEduDetails) {
    return next(new HandleError("User experience details not found", 404));
  }

  // Find the experience entry by experienceId and update it
  const experienceIndex = expEduDetails.experience.findIndex(
    (e) => e.experienceId === experienceId
  );

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
    message: "Experience updated successfully!",
    experience: expEduDetails.experience,
  });
});

exports.deleteExperienceById = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { portfolioId, experienceId } = req.body;

  if (!experienceId) {
    return next(new HandleError("Experience ID is required", 400));
  }

  // Find the user's education and experience document
  const expEduDetails = await UserExpEdu.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!expEduDetails) {
    return next(new HandleError("User experience details not found", 404));
  }

  // Find the index of the experience to delete
  const experienceIndex = expEduDetails.experience.findIndex(
    (e) => e.experienceId === experienceId
  );

  if (experienceIndex === -1) {
    return next(new HandleError("Experience not found", 404));
  }

  // Remove the experience from the array
  expEduDetails.experience.splice(experienceIndex, 1);

  // Save the updated document
  await expEduDetails.save();

  res.status(200).json({
    success: true,
    message: "Experience deleted successfully!",
    experience: expEduDetails.experience,
  });
});

exports.getAllExperienceByUserId = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const portfolioId = req.params.id;

  // Find the user's experience details document
  const expEduDetails = await UserExpEdu.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!expEduDetails) {
    return next(new HandleError("No experience found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Experience retrieved successfully!",
    experience: expEduDetails.experience,
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
  const expEduDetails = await UserExpEdu.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!expEduDetails) {
    return next(new HandleError("User experience details not found", 404));
  }

  // Find the experience by experienceId
  const experience = expEduDetails.experience.find(
    (e) => e.experienceId === experienceId
  );

  if (!experience) {
    return next(new HandleError("Experience not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Experience retrieved successfully!",
    experience,
  });
});
