import { StatusCodes } from "http-status-codes";
import Employee from "../models/EmployeeModel.js";

export const getAllEmployees = async (req, res, next) => {
  const employees = await Employee.find();

  res.status(StatusCodes.OK).json({ employees, result: employees.length });
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
