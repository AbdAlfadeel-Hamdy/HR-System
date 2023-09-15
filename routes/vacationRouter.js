import { Router } from "express";
import {
  getAllVacations,
  createVacation,
  getVacation,
  updateVacation,
  deleteVacation,
} from "../controllers/vacationController.js";
import {
  validateVacationInput,
  validateVacationUpdateInput,
} from "../middlewares/validationMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllVacations)
  .post(validateVacationInput, createVacation);

router
  .route("/:id")
  .get(getVacation)
  .patch(validateVacationUpdateInput, updateVacation)
  .delete(deleteVacation);

export default router;
