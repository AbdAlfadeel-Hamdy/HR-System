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

router.post("/login", validateLoginInput, login);
router.use(authenticateUser);
router.post(
  "/register",
  validateUserInput,
  authorizePermissions("admin"),
  register
);
router.get("/logout", logout);
router.get("/current-user", getCurrentUser);
router.get("/activities", getAllActivities);

export default router;
