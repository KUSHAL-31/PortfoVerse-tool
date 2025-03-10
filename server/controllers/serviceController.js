const User = require("../models/Users");
const UserServices = require("../models/UserServices");
const asyncErrorHandler = require("../utility/asyncErrorHandler");
const HandleError = require("../utility/handleError");
const cloudinary = require("cloudinary");
const { v4: uuidv4 } = require("uuid");

exports.listNewServiceByUserId = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { portfolioId, services } = req.body;
  // Find the user's website document
  var serviceDetails = await UserServices.findOne({
    user: userId,
    portfolio: portfolioId,
  });
  if (!serviceDetails) {
    serviceDetails = new UserServices({
      user: userId,
      portfolio: portfolioId,
      services: [],
    });
  }

  for (var service of services) {
    const { title, description } = service;

    if (title === undefined || description === undefined) {
      return next(new HandleError("Please fill the mandatory fields", 400));
    }

    const serviceId = uuidv4();
    if (!title || !description) {
      return next(new HandleError("Please fill the mandatory fields", 400));
    }
    serviceDetails.services.push({ serviceId, title, description });
  }

  // Save the updated document
  await serviceDetails.save();

  return res.status(201).json({
    success: true,
    message: "service added successfully!",
    services: serviceDetails.services,
  });
});

exports.editServicesByUserId = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { portfolioId, services } = req.body;

  if (!portfolioId || !services || !Array.isArray(services)) {
    return next(
      new HandleError("Please provide portfolioId and services array", 400)
    );
  }

  // Validate services array - each entry should have serviceId, title and description
  const isValidServicesArray = services.every(
    (service) => service.serviceId && service.title && service.description
  );

  if (!isValidServicesArray) {
    return next(
      new HandleError(
        "Each service must contain serviceId, title and description",
        400
      )
    );
  }

  // Find the user's service details document
  const serviceDetails = await UserServices.findOne({
    user: userId,
    portfolio: portfolioId,
  });
  if (!serviceDetails) {
    return next(
      new HandleError("Service details not found for this portfolio", 404)
    );
  }

  // Update each service in the array
  for (const updatedService of services) {
    const serviceIndex = serviceDetails.services.findIndex(
      (s) => s.serviceId === updatedService.serviceId
    );

    if (serviceIndex === -1) {
      return next(
        new HandleError(
          `Service with id ${updatedService.serviceId} not found`,
          404
        )
      );
    }

    // Update the service while preserving other fields
    serviceDetails.services[serviceIndex] = {
      ...serviceDetails.services[serviceIndex],
      title: updatedService.title,
      description: updatedService.description,
    };
  }

  // Save the updated document
  await serviceDetails.save();

  res.status(200).json({
    success: true,
    message: "Services updated successfully!",
    services: serviceDetails.services,
  });
});

exports.deleteServicesByUserId = asyncErrorHandler(async (req, res, next) => { 
  const userId = req.user.id;
  const { portfolioId, serviceIds } = req.body;

  if (!serviceIds || !Array.isArray(serviceIds) || serviceIds.length === 0) {
    return next(
      new HandleError("Please provide an array of serviceIds to delete", 400)
    );
  }

  // Find the user's service details document
  const serviceDetails = await UserServices.findOne({
    user: userId,
    portfolio: portfolioId,
  });

  if (!serviceDetails) {
    return next(new HandleError("Services not found for this portfolio", 404));
  }

  // Check if all serviceIds exist
  const nonExistentServiceIds = serviceIds.filter(
    (id) => !serviceDetails.services.some((s) => s.serviceId === id)
  );

  if (nonExistentServiceIds.length > 0) {
    return next(
      new HandleError(
        `Some services not found: ${nonExistentServiceIds.join(", ")}`,
        404
      )
    );
  }

  // Filter out the services that need to be deleted
  serviceDetails.services = serviceDetails.services.filter(
    (service) => !serviceIds.includes(service.serviceId)
  );

  // Save the updated document
  await serviceDetails.save();

  res.status(200).json({
    success: true,
    message: "Services deleted successfully!",
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
