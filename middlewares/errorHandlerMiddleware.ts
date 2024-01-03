import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/customErrors.js';

const errorHandlerMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || StatusCodes.BAD_REQUEST;
  const message = err.message || 'Something went wrong, please try again.';
  res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
