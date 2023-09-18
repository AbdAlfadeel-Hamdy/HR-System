import { Router } from "express";
import {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
  getExpiredIds,
  getPassports,
  getDrivers,
  getStatus,
  getIdsRenewal,
} from "../controllers/employeeController.js";
import { validateEmployeeInput } from "../middlewares/validationMiddleware.js";

const router = Router();

// Special Routes
router.route("/expired-id").get(getExpiredIds);
router.route("/id-renewal").post(getIdsRenewal);
router.route("/passport").get(getPassports);
router.route("/driver").get(getDrivers, getAllEmployees);
router.route("/status").get(getStatus);

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
