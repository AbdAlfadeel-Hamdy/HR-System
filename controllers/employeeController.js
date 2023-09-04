import { StatusCodes } from "http-status-codes";
import Employee from "../models/EmployeeModel.js";
import APIFeatures from "../utils/apiFeatures.js";

export const getAllEmployees = async (req, res, next) => {
  const employeesCount = await Employee.countDocuments();
  console.log(req.query);
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
  const employees = await Employee.find(
    {
      idExpirationDate: { $lt: expirationDate },
    },
    {
      name: 1,
      idNumber: 1,
      idExpirationDate: 1,
      passportExpirationDate: 1,
      sponsor: 1,
      workIn: 1,
      status: 1,
    }
  );
  res.status(StatusCodes.OK).json({ employees });
};

export const getPassports = async (req, res, next) => {
  req.query.fields =
    "name,idNumber,nationality,passportNumber,passportExpirationDate";
  next();
};
