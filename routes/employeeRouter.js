import { Router } from "express";
import {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { validateEmployeeInput } from "../middlewares/validationMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllEmployees)
  .post(validateEmployeeInput, createEmployee);

router
  .route("/:id")
  .get(getEmployee)
  .patch(updateEmployee)
  .delete(deleteEmployee);

export default router;
