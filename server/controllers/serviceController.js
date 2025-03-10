const UserServices = require("../models/UserServices");
const asyncErrorHandler = require("../utility/asyncErrorHandler");
const HandleError = require("../utility/handleError");
const { v4: uuidv4 } = require("uuid");

exports.listNewServiceByUserId = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  if (title === undefined || description === undefined) {
    return next(new HandleError("Please fill the mandatory fields", 400));
  }
  // Find the user's website document
  var serviceDetails = await UserServices.findOne({ user: userId });
  if (!serviceDetails) {
    serviceDetails = new UserServices({ user: userId, services: [] });
  }

  // Create a new service
  const newService = {
    serviceId: uuidv4(),
    title,
    description,
  };

  // Push the new service into the services array
  serviceDetails.services.push(newService);

  // Save the updated document
  await serviceDetails.save();

  return res.status(201).json({
    success: true,
    message: "service added successfully!",
    services: serviceDetails.services,
  });
});

exports.editserviceByUserId = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { serviceId, title, description } = req.body;

  if (!serviceId || !title || !description) {
    return next(new HandleError("Please fill the mandatory fields", 400));
  }

  // Find the user's service details document
  const serviceDetails = await UserServices.findOne({ user: userId });

  if (!serviceDetails) {
    return next(new HandleError("Service not found", 404));
  }

  // Find the service by serviceId and update it
  const serviceIndex = serviceDetails.services.findIndex(
    (s) => s.serviceId === serviceId
  );

  if (serviceIndex === -1) {
    return next(new HandleError("Service not found", 404));
  }

  serviceDetails.services[serviceIndex] = {
    ...serviceDetails.services[serviceIndex],
    serviceId,
    title,
    description,
  };

  // Save the updated document
  await serviceDetails.save();

  res.status(200).json({
    success: true,
    message: "service updated successfully!",
    services: serviceDetails.services,
  });
});

exports.deleteserviceByUserId = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { serviceId } = req.body;

  if (!serviceId) {
    return next(new HandleError("Something went wrong", 400));
  }

  // Find the user's service details document
  const serviceDetails = await UserServices.findOne({ user: userId });

  if (!serviceDetails) {
    return next(new HandleError("service not found", 404));
  }

  // Find the index of the service to delete
  const serviceIndex = serviceDetails.services.findIndex(
    (s) => s.serviceId === serviceId
  );

  if (serviceIndex === -1) {
    return next(new HandleError("Service not found", 404));
  }

  // Remove the service from the array
  serviceDetails.services.splice(serviceIndex, 1);

  // Save the updated document
  await serviceDetails.save();

  res.status(200).json({
    success: true,
    message: "service deleted successfully!",
    services: serviceDetails.services,
  });
});

exports.getAllservicesByUserId = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const portfolioId = req.params.id;
  // Find the user's service details document
  const serviceDetails = await UserServices.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!serviceDetails) {
    return next(new HandleError("No services found", 404));
  }

  res.status(200).json({
    success: true,
    message: "services retrieved successfully!",
    services: serviceDetails.services,
  });
});

exports.getServiceById = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const serviceId = req.query.serviceId;
  const portfolioId = req.query.portfolioId;

  if (!serviceId) {
    return next(new HandleError("Something went wrong", 400));
  }

  // Find the user's service details document
  const serviceDetails = await UserServices.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  // Find the service by serviceId
  const service = serviceDetails.services.find(
    (s) => s.serviceId === serviceId
  );

  if (!service) {
    return next(new HandleError("Something went wrong", 404));
  }

  res.status(200).json({
    success: true,
    message: "Service retrieved successfully!",
    service,
  });
});
