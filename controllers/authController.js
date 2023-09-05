import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Activity from "../models/ActivityModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res, next) => {
  req.body.password = await hashPassword(req.body.password);
  req.body.role = "moderator";

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ message: "User created." });
};

export const login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("Invalid credentials.");

  const token = await createJWT({
    id: user.id,
    name: user.name,
    role: user.role,
  });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  await Activity.create({
    userName: user.name,
    activity: "Logged In",
    timeStamp: Date.now(),
  });
  res.status(StatusCodes.OK).json({ message: "User logged in." });
};

export const logout = async (req, res, next) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  await Activity.create({
    userName: req.user.name,
    activity: "Logged Out",
    timeStamp: Date.now(),
  });
  res.status(StatusCodes.OK).json({ message: "User logged out." });
};

export const getCurrentUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const userWithoutPassword = user?.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getAllActivities = async (req, res, next) => {
  const activities = await Activity.find();
  res.status(StatusCodes.OK).json({ activities });
};
