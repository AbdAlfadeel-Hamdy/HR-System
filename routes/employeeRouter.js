import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
} from "../controllers/employeeController.js";
import { validateEmployeeInput } from "../middlewares/validationMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllEmployees)
  .post(validateEmployeeInput, createEmployee);

export default router;
