import { StatusCodes } from "http-status-codes";
import Cancelled from "../models/CancelledModel.js ";

export const getAllCancelled = async (req, res, next) => {
  const cancelled = await Cancelled.find();

  res.status(StatusCodes.OK).json({ cancelled });
};
