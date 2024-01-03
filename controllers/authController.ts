import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Activity from '../models/ActivityModel.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { comparePassword, hashPassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';

// Extend the Request interface to include the user property
interface CustomRequest extends Request {
  user: {
    name: string;
    id: string;
  };
  params: {
    id: string;
  };
}

// Register a new user
export const register = async (req: Request, res: Response) => {
  req.body.password = await hashPassword(req.body.password);
  req.body.role = 'moderator';

  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ message: 'User created.' });
};

// Get all users with the 'moderator' role
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({ role: 'moderator' });
  res.status(StatusCodes.OK).json({ users });
};

// Update a user's name and email
export const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  await User.findByIdAndUpdate(req.params.id, { name, email });
  res.status(StatusCodes.OK).json({ message: 'User updated.' });
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ message: 'User deleted.' });
};

// Log in a user
export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError('Invalid credentials.');

  const token = await createJWT({
    id: user.id,
    name: user.name,
    role: user.role,
  });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  });
  await Activity.create({
    userName: user.name,
    activity: 'Logged In',
    timeStamp: Date.now(),
  });
  res.status(StatusCodes.OK).json({ message: 'User logged in.' });
};

// Log out a user
export const logout = async (req: CustomRequest, res: Response) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  await Activity.create({
    userName: req.user.name,
    activity: 'Logged Out',
    timeStamp: Date.now(),
  });
  res.status(StatusCodes.OK).json({ message: 'User logged out.' });
};

// Get the current user's details
export const getCurrentUser = async (req: CustomRequest, res: Response) => {
  const user = await User.findById(req.user.id);
  const userWithoutPassword = user?.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

// Get all activities
export const getAllActivities = async (req: Request, res: Response) => {
  const activities = await Activity.find();
  res.status(StatusCodes.OK).json({ activities });
};
