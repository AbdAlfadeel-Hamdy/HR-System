import { StatusCodes } from "http-status-codes";
import Vacation from "../models/VacationModel.js ";

export const getAllVacations = async (req, res, next) => {
  const vacations = await Vacation.find();

  res.status(StatusCodes.OK).json({ vacations });
};

export const createVacation = async (req, res, next) => {
  const createdVacation = await Vacation.create(req.body);

  res.status(StatusCodes.CREATED).json({ vacation: createdVacation });
};

export const getVacation = async (req, res, next) => {
  const vacation = await Vacation.findById(req.params.id);

  res.status(StatusCodes.CREATED).json({ vacation });
};

export const updateVacation = async (req, res, next) => {
  const updatedVacation = await Vacation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ message: "Vacation modified.", vacation: updatedVacation });
};

export const deleteVacation = async (req, res, next) => {
  const deletedVacation = await Vacation.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ message: "Vacation deleted.", vacation: deletedVacation });
};
