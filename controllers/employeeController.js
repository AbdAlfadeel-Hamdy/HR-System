import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";
import { formatImage } from "../middlewares/multerMiddleware.js";
import Employee from "../models/EmployeeModel.js";
import Cancelled from "../models/CancelledModel.js";
import Activity from "../models/ActivityModel.js";
import APIFeatures from "../utils/apiFeatures.js";

export const getAllEmployees = async (req, res, next) => {
  const employeesCount = await Employee.countDocuments();
  // BUILD Query
  const features = new APIFeatures(Employee.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // EXECUTE Query
  const employees = await features.query;

  res.status(StatusCodes.OK).json({ employees, employeesCount });
};

export const createEmployee = async (req, res, next) => {
  const createdEmployee = await Employee.create(req.body);
  await Activity.create({
    userName: user.name,
    activity: "Created Employee",
    timeStamp: Date.now(),
  });

  res.status(StatusCodes.CREATED).json({ employee: createdEmployee });
};

export const getEmployee = async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).populate("vacations");
  res.status(StatusCodes.CREATED).json({ employee });
};

export const updateEmployee = async (req, res, next) => {
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    req.body[req.body.fieldName] = response.secure_url;
    req.body[`${req.body.fieldName}PublicId`] = response.public_id;
  }
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (req.file && updateEmployee[`${req.body.fieldName}PublicId`])
    await cloudinary.v2.uploader.destroy(
      updateEmployee[`${req.body.fieldName}PublicId`]
    );

  await Activity.create({
    userName: user.name,
    activity: "Updated Employee",
    timeStamp: Date.now(),
  });

  res
    .status(StatusCodes.OK)
    .json({ message: "Employee modified.", employee: updatedEmployee });
};

export const deleteEmployee = async (req, res, next) => {
  const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
  await Cancelled.create({
    name: deletedEmployee.name,
    idNumber: deletedEmployee.idNumber,
    cancellationDate: new Date(),
  });
  await Activity.create({
    userName: user.name,
    activity: "Deleted Employee",
    timeStamp: Date.now(),
  });
  res
    .status(StatusCodes.OK)
    .json({ message: "Employee deleted.", employee: deletedEmployee });
};

// Special Controllers
export const getExpiredIds = async (req, res, next) => {
  const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  const employees = await Employee.aggregate([
    {
      $match: {
        idExpirationDate: { $lt: expirationDate },
      },
    },
    {
      $project: {
        nationality: 0,
        idImage: 0,
        passportNumber: 0,
        passportImage: 0,
        agreementExpirationDate: 0,
        licenseExpirationDate: 0,
        licenseType: 0,
        cancellationDate: 0,
        vacations: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
    {
      $group: {
        _id: "$workIn",
        documents: { $push: "$$ROOT" },
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ employees });
};
export const getIdsRenewal = async (req, res, next) => {
  const employees = await Employee.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $month: "$idExpirationDate" }, req.body.month] },
            { $eq: [{ $year: "$idExpirationDate" }, req.body.year] },
          ],
        },
      },
    },
    {
      $project: {
        nationality: 0,
        idImage: 0,
        status: 0,
        passportNumber: 0,
        passportImage: 0,
        licenseExpirationDate: 0,
        licenseType: 0,
        cancellationDate: 0,
        vacations: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
    {
      $group: {
        _id: `$${req.body.groupBy}`,
        documents: { $push: "$$ROOT" },
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ employees });
};

export const getSponsor = async (req, res, next) => {
  const employees = await Employee.aggregate([
    {
      $match: {
        sponsor: req.body.sponsor,
      },
    },
    {
      $project: {
        idImage: 0,
        passportNumber: 0,
        passportImage: 0,
        passportExpirationDate: 0,
        licenseExpirationDate: 0,
        licenseType: 0,
        agreementExpirationDate: 0,
        cancellationDate: 0,
        vacations: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
    {
      $group: {
        _id: `$${req.body.groupBy}`,
        documents: { $push: "$$ROOT" },
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ employees });
};

export const getPassports = async (req, res, next) => {
  const expirationDate = new Date();
  const employees = await Employee.aggregate([
    {
      $match: {
        passportExpirationDate: { $lt: expirationDate },
      },
    },
    {
      $project: {
        idImage: 0,
        idExpirationDate: 0,
        passportImage: 0,
        agreementExpirationDate: 0,
        licenseExpirationDate: 0,
        licenseType: 0,
        cancellationDate: 0,
        vacations: 0,
        workIn: 0,
        status: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
    {
      $group: {
        _id: `$${req.body.groupBy}`,
        documents: { $push: "$$ROOT" },
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ employees });
};

export const getDrivers = async (req, res, next) => {
  const employees = await Employee.aggregate([
    {
      $project: {
        nationality: 0,
        status: 0,
        idExpirationDate: 0,
        idImage: 0,
        passportNumber: 0,
        passportImage: 0,
        passportExpirationDate: 0,
        agreementExpirationDate: 0,
        cancellationDate: 0,
        vacations: 0,
        note: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
    {
      $group: {
        _id: `$${req.body.groupBy}`,
        documents: { $push: "$$ROOT" },
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ employees });
};

export const getStatus = async (req, res, next) => {
  const { status, groupBy } = req.query;
  const employees = await Employee.aggregate([
    {
      $match: {
        status: status,
      },
    },
    {
      $project: {
        nationality: 0,
        idImage: 0,
        passportNumber: 0,
        passportImage: 0,
        agreementExpirationDate: 0,
        licenseExpirationDate: 0,
        licenseType: 0,
        cancellationDate: 0,
        vacations: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
    {
      $group: {
        _id: `$${groupBy}`,
        documents: { $push: "$$ROOT" },
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ employees });
};
