import { StatusCodes } from "http-status-codes";
import Employee from "../models/EmployeeModel.js";
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

  res.status(StatusCodes.CREATED).json({ employee: createdEmployee });
};

export const getEmployee = async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  res.status(StatusCodes.CREATED).json({ employee });
};

export const updateEmployee = async (req, res, next) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ message: "Employee modified.", employee: updatedEmployee });
};

export const deleteEmployee = async (req, res, next) => {
  const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
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

export const getPassports = async (req, res, next) => {
  const employees = await Employee.aggregate([
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
        sponsor: 0,
        workIn: 0,
        status: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    },
    {
      $group: {
        _id: "$nationality",
        documents: { $push: "$$ROOT" },
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ employees });
};

export const getDrivers = async (req, res, next) => {
  req.query.fields = "name,idNumber,licenseType,licenseExpirationDate";
  next();
};

export const getStatus = async (req, res, next) => {
  const { status } = req.query;
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
        _id: "$workIn",
        documents: { $push: "$$ROOT" },
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ employees });
};