import Router from "express";
import {
  login,
  logout,
  register,
  getCurrentUser,
  getAllActivities,
} from "../controllers/authController.js";
import {
  validateLoginInput,
  validateUserInput,
} from "../middlewares/validationMiddleware.js";
import {
  authenticateUser,
  authorizePermissions,
} from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/register",
  validateUserInput,
  authenticateUser,
  authorizePermissions("admin"),
  register
);
router.post("/login", validateLoginInput, login);
router.get("/logout", authenticateUser, logout);

router.get("/current-user", authenticateUser, getCurrentUser);

router.get("/activities", authenticateUser, getAllActivities);

export default router;
