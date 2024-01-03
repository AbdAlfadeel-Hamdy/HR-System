import Router, { RequestHandler, RequestParamHandler } from 'express';
import {
  login,
  logout,
  register,
  getCurrentUser,
  getAllActivities,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/authController.js';
import {
  validateLoginInput,
  validateUserInput,
} from '../middlewares/validationMiddleware.js';
import {
  authenticateUser,
  authorizePermissions,
} from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/login', validateLoginInput as any, login);
router.use(authenticateUser);
router.get('/logout', logout);
router.get('/current-user', getCurrentUser);
router.get('/activities', getAllActivities);
router.use(authorizePermissions('admin'));
router.post('/register', validateUserInput as any, register);
router.get('/users', getAllUsers);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
