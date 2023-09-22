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
  getSponsor,
} from "../controllers/employeeController.js";
import { validateEmployeeInput } from "../middlewares/validationMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

// Special Routes
router.route("/expired-id").get(getExpiredIds);
router.route("/id-renewal").post(getIdsRenewal);
router.route("/sponsor").post(getSponsor);
router.route("/passport").get(getPassports);
router.route("/driver").post(getDrivers);
router.route("/status").get(getStatus);

router
  .route("/")
  .get(getAllEmployees)
  .post(validateEmployeeInput, createEmployee);

router
  .route("/:id")
  .get(getEmployee)
  .patch(upload.single("uploadedFile"), updateEmployee)
  .delete(deleteEmployee);

export default router;
