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
