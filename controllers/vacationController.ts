import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Vacation from '../models/VacationModel.js';
import Activity from '../models/ActivityModel.js';

// Extend the Request interface to include the user property
// interface CustomRequest extends Request {
//   user: {
//     name: string;
//   };
//   params: {
//     id: string;
//   };
// }

// Get all vacations
export const getAllVacations: RequestHandler = async (req, res) => {
  const vacations = await Vacation.find();
  res.status(StatusCodes.OK).json({ vacations });
};

// Create a new vacation
export const createVacation: RequestHandler = async (req: any, res) => {
  const createdVacation = await Vacation.create(req.body);

  await Activity.create({
    userName: req.user.name,
    activity: 'Created Vacation',
    timeStamp: Date.now(),
  });

  res.status(StatusCodes.CREATED).json({ vacation: createdVacation });
};

// Get a specific vacation by ID
export const getVacation: RequestHandler = async (req: any, res) => {
  const vacation = await Vacation.findById(req.params.id);
  res.status(StatusCodes.OK).json({ vacation });
};

// Update a vacation by ID
export const updateVacation: RequestHandler = async (req: any, res) => {
  const updatedVacation = await Vacation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  await Activity.create({
    userName: req.user.name,
    activity: 'Updated Vacation',
    timeStamp: Date.now(),
  });

  res
    .status(StatusCodes.OK)
    .json({ message: 'Vacation modified.', vacation: updatedVacation });
};

// Delete a vacation by ID
export const deleteVacation: RequestHandler = async (req: any, res) => {
  const deletedVacation = await Vacation.findByIdAndDelete(req.params.id);

  await Activity.create({
    userName: req.user.name,
    activity: 'Deleted Vacation',
    timeStamp: Date.now(),
  });

  res
    .status(StatusCodes.OK)
    .json({ message: 'Vacation deleted.', vacation: deletedVacation });
};
