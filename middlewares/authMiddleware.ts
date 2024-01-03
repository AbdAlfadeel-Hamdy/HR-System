import { Request, Response, NextFunction } from 'express';
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

// Extend the Request interface to include the user property
interface CustomRequest extends Request {
  user: {
    id: string;
    role: string;
    name: string;
  };
}

export const authenticateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('Authentication failed.');

  try {
    const tokenPayload = verifyJWT(token);
    if (!tokenPayload) throw new UnauthenticatedError('Authentication failed.');

    const { id, role, name } = tokenPayload;
    req.user = { id, role, name };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Authentication failed.');
  }
};

export const authorizePermissions = (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError('Unauthorized to access this route.');
    next();
  };
};
